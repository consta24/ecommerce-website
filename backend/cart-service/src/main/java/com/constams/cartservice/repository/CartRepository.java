package com.constams.cartservice.repository;

import com.constams.cartservice.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepository extends MongoRepository<Cart, String> {
    Cart findByUsername(String username);
}
