package com.constams.productservice.service;

import com.constams.productservice.dto.InventoryRequest;
import com.constams.productservice.dto.InventoryResponse;
import com.constams.productservice.dto.ProductRequest;
import com.constams.productservice.dto.ProductResponse;
import com.constams.productservice.model.Product;
import com.constams.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ProductService {

    private final ProductRepository productRepository;
    private final WebClient.Builder webClientBuilder;

    public ProductResponse createProduct(ProductRequest productRequest, String bearerToken) {
        if(productRepository.findBySkuCode(productRequest.getSkuCode()).isPresent()) {
            throw new IllegalArgumentException("Sku code already exists.");
        }
        Product product = Product.builder()
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .price(productRequest.getPrice())
                .skuCode(productRequest.getSkuCode())
                .build();
        addInventory(new InventoryRequest(productRequest.getSkuCode()), bearerToken);
        productRepository.save(product);
        log.info("Product {}-{} has been created", product.getSkuCode(), product.getName());

        return mapToProductResponse(product);
    }

    public ProductResponse modifyProduct(String skuCode, ProductRequest productRequest, String bearerToken) {
        if(productRepository.findBySkuCode(productRequest.getSkuCode()).isPresent() && !skuCode.equals(productRequest.getSkuCode())) {
            throw new IllegalArgumentException("Sku code already exists.");
        }
        Product product = Product.builder()
                .name(productRequest.getName())
                .description(productRequest.getDescription())
                .price(productRequest.getPrice())
                .skuCode(productRequest.getSkuCode())
                .build();
        if(!skuCode.equals(product.getSkuCode())) {
            removeInventory(skuCode, bearerToken);
            addInventory(new InventoryRequest(product.getSkuCode()), bearerToken);
        }
        productRepository.delete(
                productRepository.findBySkuCode(skuCode)
                        .orElseThrow(() -> new IllegalArgumentException("Error trying to delete old product when modifying product skucode.")));
        productRepository.save(product);
        return mapToProductResponse(product);
    }

    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream().map(this::mapToProductResponse).toList();
    }

    public ProductResponse getProduct(String skuCode) {
        return productRepository.findBySkuCode(skuCode)
                .map(this::mapToProductResponse)
                .orElseThrow(() -> new NoSuchElementException("No product with SKU code " + skuCode));
    }


    private ProductResponse mapToProductResponse(Product product) {
        return ProductResponse.builder()
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .skuCode(product.getSkuCode())
                .build();
    }

    private void removeInventory(String skuCode, String bearerToken) {
        webClientBuilder.build()
                .delete()
                .uri("http://inventory-service/api/inventory/" + skuCode)
                .header("Authorization", "Bearer " + bearerToken)
                .retrieve()
                .bodyToMono(Void.class)
                .switchIfEmpty(Mono.error(new IllegalArgumentException("Could not remove from inventory.")));
    }


    private void addInventory(InventoryRequest inventoryRequest, String bearerToken) {
        InventoryResponse response = webClientBuilder.build()
                .post()
                .uri("http://inventory-service/api/inventory")
                .contentType(MediaType.APPLICATION_JSON)
                .header("Authorization", "Bearer " + bearerToken)
                .body(Mono.just(inventoryRequest), InventoryRequest.class)
                .retrieve()
                .bodyToMono(InventoryResponse.class)
                .block();

        if (response == null) {
            throw new IllegalArgumentException("Could not add to inventory.");
        }
    }
}
