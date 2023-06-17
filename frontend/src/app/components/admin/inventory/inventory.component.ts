import { Component } from '@angular/core';
import { Inventory } from 'src/app/model/Inventory';
import { InventoryService } from 'src/app/service/inventory.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  inventoryList: Inventory[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit() {
    this.getInventory();
  }

  getInventory() {
    this.inventoryService.getInventory().subscribe(
      (data) => {
        console.log(data);
        this.inventoryList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  editQuantity(skuCode: string, quantity: number) {
    this.inventoryService.editQuantity(skuCode, quantity).subscribe(
      () => {
        this.getInventory();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
