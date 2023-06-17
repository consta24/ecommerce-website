package com.constams.orderservice.repository;

import com.constams.orderservice.model.Order;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, ObjectId> {
    List<Order> findByUsername(String username);
    Optional<Order> findByOrderNumber(String orderNumber);
}
