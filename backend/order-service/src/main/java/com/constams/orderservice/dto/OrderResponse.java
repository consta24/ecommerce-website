package com.constams.orderservice.dto;

import com.constams.orderservice.model.OrderItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private String orderNumber;
    private String date;
    private String username;
    private List<OrderItem> orderItems;
}
