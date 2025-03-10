import { makeAutoObservable } from "mobx";
import { TypeProduct, TypeProducts } from "@/Types/types";

class OrderInfo {
  order = {
    products: {},
    leaveAtDoor: false,
    callOfBeforeDelivery: false,
    amount: 0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  toggleLeaveAtDoor() {
    this.order.leaveAtDoor = !this.order.leaveAtDoor;
  }
  toggleCallOfBeforeDelivery() {
    this.order.callOfBeforeDelivery = !this.order.callOfBeforeDelivery;
  }

  updateAmount(amount: number) {
    this.order.amount = amount;
  }

  updateProducts(products: TypeProducts) {
    this.order.products = products;
  }

  get getOrderInfo() {
    return this.order;
  }
}

export default new OrderInfo();
