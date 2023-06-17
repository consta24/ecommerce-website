package com.constams.productservice.controller;

import com.constams.productservice.dto.ProductRequest;
import com.constams.productservice.dto.ProductResponse;
import com.constams.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse createProduct(@RequestBody ProductRequest productRequest, @RequestHeader(value = "Authorization") String bearerToken) {
        return productService.createProduct(productRequest, bearerToken);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ProductResponse> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ProductResponse> getProduct(@PathVariable String skuCode) {
        return ResponseEntity.ok(productService.getProduct(skuCode));
    }

    @PostMapping("/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<ProductResponse> modifyProduct(@PathVariable String skuCode, @RequestBody ProductRequest product, @RequestHeader(value = "Authorization") String bearerToken) {
        return ResponseEntity.ok(productService.modifyProduct(skuCode, product, bearerToken));
    }
}
