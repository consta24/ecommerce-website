package com.constams.inventoryservice.service;

import com.constams.inventoryservice.dto.InventoryResponse;
import com.constams.inventoryservice.model.Inventory;
import com.constams.inventoryservice.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    public Inventory addInventory(String skuCode) {
        Inventory inventory = Inventory.builder().skuCode(skuCode).quantity(0).build();
        return inventoryRepository.save(inventory);
    }

    public Inventory deleteInventory(String skuCode) {
        Inventory inventory = inventoryRepository.findBySkuCode(skuCode).orElseThrow(() -> new NoSuchElementException("Could not find skuCode to delete"));
        inventoryRepository.deleteBySkuCode(skuCode);
        return inventory;
    }

    public Inventory editQuantity(String skuCode, Integer quantity) {
        Inventory inventory = inventoryRepository.findBySkuCode(skuCode).orElseThrow(() -> new NoSuchElementException("Could not find skuCode to edit quantity"));
        inventory.setQuantity(quantity);
        inventoryRepository.save(inventory);
        return inventory;
    }

    public List<Inventory> getInventory() {
        return inventoryRepository.findAll();
    }
}
