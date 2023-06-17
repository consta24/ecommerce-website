package com.constams.orderservice.service;

import com.constams.orderservice.dto.InventoryResponse;
import com.constams.orderservice.dto.OrderRequest;
import com.constams.orderservice.dto.OrderResponse;
import com.constams.orderservice.model.Order;
import com.constams.orderservice.model.OrderItem;
import com.constams.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final WebClient.Builder webClientBuilder;

    public Mono<OrderResponse> placeOrder(OrderRequest orderRequest) {
        Map<String, Integer> orderedProductQuantities = orderRequest.getOrderedProducts()
                .stream()
                .collect(Collectors.toMap(
                        orderItem -> orderItem.getProduct().getSkuCode(),
                        OrderItem::getQuantity));

        return webClientBuilder.build().get()
                .uri("http://inventory-service/api/inventory")
                .retrieve()
                .bodyToFlux(InventoryResponse.class)
                .collectMap(InventoryResponse::getSkuCode)
                .flatMap(inventory -> {
                    for (Map.Entry<String, Integer> entry : orderedProductQuantities.entrySet()) {
                        InventoryResponse productInventory = inventory.get(entry.getKey());
                        if (productInventory == null || productInventory.getQuantity() < entry.getValue()) {
                            return Mono.error(new RuntimeException("Not enough stock for product with SKU " + entry.getKey()));
                        }
                    }

                    String pattern = "yyyy-MM-dd HH:mm:ss";
                    SimpleDateFormat dateFormat = new SimpleDateFormat(pattern);
                    String formattedDate = dateFormat.format(new Date());

                    Order order = Order.builder()
                            .username(orderRequest.getUsername())
                            .orderedProducts(orderRequest.getOrderedProducts())
                            .date(formattedDate)
                            .build();

                    return Mono.fromCallable(() -> orderRepository.save(order))
                            .flatMap(savedOrder -> Flux.fromIterable(orderedProductQuantities.entrySet())
                                    .flatMap(entry -> webClientBuilder.build().post()
                                            .uri("http://inventory-service/api/inventory/" + entry.getKey())
                                            .body(BodyInserters.fromValue(inventory.get(entry.getKey()).getQuantity() - entry.getValue()))
                                            .retrieve()
                                            .bodyToMono(InventoryResponse.class)
                                            .thenReturn(savedOrder))
                                    .then(Mono.just(mapToOrderResponse(savedOrder))));
                });
    }


    public OrderResponse getOrder(String orderNumber) {
        ObjectId objectId = new ObjectId(orderNumber);
        return mapToOrderResponse(orderRepository.findById(objectId).orElseThrow(() -> new NoSuchElementException("Could not find order with order number: " + orderNumber)));
    }

    public List<OrderResponse> getOrders(String username) {
        return orderRepository.findByUsername(username).stream().map(this::mapToOrderResponse).toList();
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream().map(this::mapToOrderResponse).toList();
    }

    public OrderResponse mapToOrderResponse(Order order) {
        return new OrderResponse(order.getOrderNumber().toHexString(), order.getDate(), order.getUsername(), order.getOrderedProducts());
    }
}
