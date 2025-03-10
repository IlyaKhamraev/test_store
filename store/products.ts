import { makeAutoObservable } from "mobx";
import { TypeProduct, TypeProducts } from "@/Types/types";

class Products {
  products: TypeProducts = {};

  constructor() {
    makeAutoObservable(this);
  }

  addProduct(id: TypeProduct["id"]) {
    this.products[id] = (this.products[id] || 0) + 1;

    console.log(this.products);
  }

  removeProduct(id: TypeProduct["id"]) {
    if (this.products[id]) {
      delete this.products[id];
    }
  }

  decerementProducts(id: TypeProduct["id"]) {
    if (this.products[id]) {
      this.products[id]--;
    }
  }

  clearProducts(): void {
    this.products = {};
  }

  get getProductsStore() {
    return this.products;
  }
}

export default new Products();
