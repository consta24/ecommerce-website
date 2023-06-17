package com.constams.inventoryservice.controller;

import com.constams.inventoryservice.dto.InventoryRequest;
import com.constams.inventoryservice.dto.InventoryResponse;
import com.constams.inventoryservice.model.Inventory;
import com.constams.inventoryservice.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<InventoryResponse>> getInventory() {
        List<InventoryResponse> inventoryResponseList = inventoryService.getInventory()
                .stream()
                .map(this::mapToInventoryResponse)
                .toList();
        return ResponseEntity.ok(inventoryResponseList);
    }

    @DeleteMapping("/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<InventoryResponse> deleteInventory(@PathVariable String skuCode) {
        return ResponseEntity.ok(mapToInventoryResponse(inventoryService.deleteInventory(skuCode)));
    }

    @PostMapping("/{skuCode}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<InventoryResponse> editQuantity(@PathVariable String skuCode, @RequestBody Integer quantity) {
        return ResponseEntity.ok(mapToInventoryResponse(inventoryService.editQuantity(skuCode, quantity)));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<InventoryResponse> addInventory(@RequestBody InventoryRequest inventoryRequest) {
        return ResponseEntity.ok(mapToInventoryResponse(inventoryService.addInventory(inventoryRequest.getSkuCode())));
    }

    private InventoryResponse mapToInventoryResponse(Inventory inventory) {
        return new InventoryResponse(inventory.getSkuCode(), inventory.getQuantity());
    }
}
