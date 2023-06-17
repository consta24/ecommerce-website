export class Inventory {
  skuCode: string;
  quantity: number;

  constructor(skuCode: string, quantity: number) {
    this.skuCode = skuCode;
    this.quantity = quantity;
  }
}
