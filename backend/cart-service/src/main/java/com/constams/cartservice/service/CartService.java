package com.constams.cartservice.service;

import com.constams.cartservice.dto.CartResponse;
import com.constams.cartservice.model.Cart;
import com.constams.cartservice.model.CartItem;
import com.constams.cartservice.model.Product;
import com.constams.cartservice.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    public CartResponse retrieveCart(String username) {
        Cart cart = cartRepository.findByUsername(username);
        if (cart == null) {
            cart = cartRepository.save(new Cart(username, new ArrayList<>()));
        }
        return new CartResponse(cart.getCartItems());
    }

    public CartResponse addToCart(String username, Product product) {
        CartResponse cartResponse = retrieveCart(username);
        List<CartItem> cartItems = cartResponse.getCartItems();

        Optional<CartItem> existingCartItem = cartItems.stream()
                .filter(cartItem -> cartItem.getProduct().equals(product))
                .findFirst();

        if (existingCartItem.isPresent()) {
            CartItem itemToUpdate = existingCartItem.get();
            itemToUpdate.setQuantity(itemToUpdate.getQuantity() + 1);
        } else {
            cartItems.add(new CartItem(product, 1));
        }

        return updateCart(username, cartItems);
    }


    public CartResponse removeFromCart(String username, String skuCode) {
        CartResponse cartResponse = retrieveCart(username);
        List<CartItem> cartItems = cartResponse.getCartItems();

        Optional<CartItem> itemToRemove = cartItems.stream()
                .filter(cartItem -> cartItem.getProduct().getSkuCode().equals(skuCode))
                .findFirst();

        if (itemToRemove.isPresent()) {
            CartItem item = itemToRemove.get();
            if (item.getQuantity() > 1) {
                item.setQuantity(item.getQuantity() - 1);
            } else {
                cartItems.remove(item);
            }
        }

        return updateCart(username, cartItems);
    }

    private CartResponse updateCart(String username, List<CartItem> cartItems) {
        Cart cart = cartRepository.save(Cart.builder().username(username).cartItems(cartItems).build());

        return CartResponse.builder()
                .cartItems(cart.getCartItems())
                .build();
    }
}
