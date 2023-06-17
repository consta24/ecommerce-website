export class Product {
  name: string;
  description: string;
  price: number;
  skuCode: string;

  constructor(
    name: string,
    description: string,
    price: number,
    skuCode: string
  ) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.skuCode = skuCode;
  }
}
