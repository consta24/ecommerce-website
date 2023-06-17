package com.constams.cartservice.controller;

import com.constams.cartservice.dto.AddToCartRequest;
import com.constams.cartservice.dto.CartRequest;
import com.constams.cartservice.dto.CartResponse;
import com.constams.cartservice.model.Cart;
import com.constams.cartservice.service.CartService;
import jakarta.ws.rs.Path;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping("/{username}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CartResponse> retrieveCart(@PathVariable String username) {
        return ResponseEntity.ok(cartService.retrieveCart(username));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<CartResponse> addToCart(@RequestBody AddToCartRequest addToCartRequest) {
        return ResponseEntity.ok(cartService.addToCart(addToCartRequest.getUsername(), addToCartRequest.getProduct()));
    }

    @PostMapping("/remove/{username}/{skuCode}")
    public ResponseEntity<CartResponse> removeFromCart(@PathVariable String username, @PathVariable String skuCode) {
        return ResponseEntity.ok(cartService.removeFromCart(username, skuCode));
    }
}
