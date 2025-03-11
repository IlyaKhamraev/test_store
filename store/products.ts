import { makeAutoObservable } from "mobx";

import { TypeProduct, TypeProducts } from "@/Types/types";
import {
  getRandomWithProbability,
  generagteRandomProducts,
} from "@/utils/helpers";

class Products {
  goods: TypeProduct[] = [];
  isLoading: boolean = false;
  error: string = "";
  basket: TypeProducts = {};

  constructor() {
    makeAutoObservable(this);
  }

  fetchProducts() {
    return new Promise((resolve, reject) => {
      this.isLoading = true;
      this.error = "";

      setTimeout(() => {
        const isSuccess = Boolean(getRandomWithProbability());

        if (isSuccess) {
          resolve(true);
        } else {
          reject("Ошибка подгрузки товаров");
        }
      }, 2000);
    })
      .then(() => {
        const newProducts = generagteRandomProducts();
        this.goods = [...this.goods, ...newProducts];
      })
      .catch((err) => {
        this.error = err.message;
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  addProduct(id: TypeProduct["id"]) {
    const quantity = this.goods.find((product) => product.id === id)?.quantity;
    const productsInBasket = this.basket[id] || 0;

    if (quantity && productsInBasket < quantity) {
      this.basket[id] = (this.basket[id] || 0) + 1;
    } else {
      this.error = "Недостаточно товаров для покупки";
    }
  }

  removeProduct(id: TypeProduct["id"]) {
    if (this.basket[id]) {
      delete this.basket[id];
    }
  }

  decerementProducts(id: TypeProduct["id"]) {
    if (this.basket[id]) {
      this.basket[id]--;
    }
  }

  clearProducts(): void {
    this.basket = {};
  }

  get getProductsBasket() {
    const productsIds = Object.keys(this.basket);

    const basketData = this.goods.filter(({ id }) => productsIds.includes(id));

    return basketData;
  }

  get getBasket() {
    return this.basket;
  }
}

export default new Products();
