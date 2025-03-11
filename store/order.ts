import { makeAutoObservable } from "mobx";
import { TypeProducts, OrderInfoType } from "@/types";
import { fetchStatistic } from "@/utils/helpers";

class OrderInfo {
  order: OrderInfoType = {
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

    const dataStatistic = this.getDataStatistic();

    fetchStatistic(dataStatistic);
  }

  toggleCallOfBeforeDelivery() {
    this.order.callOfBeforeDelivery = !this.order.callOfBeforeDelivery;

    const dataStatistic = this.getDataStatistic();

    fetchStatistic(dataStatistic);
  }

  updateAmount(amount: number) {
    this.order.amount = amount;

    const dataStatistic = this.getDataStatistic();

    fetchStatistic(dataStatistic);
  }

  updateProducts(products: TypeProducts) {
    this.order.products = products;
  }

  getDataStatistic() {
    const dataStatistic: OrderInfoType = {
      products: this.getOrderInfo.products,
      leaveAtDoor: this.getOrderInfo.leaveAtDoor,
      callOfBeforeDelivery: this.getOrderInfo.callOfBeforeDelivery,
      amount: this.getOrderInfo.amount,
    };

    return dataStatistic;
  }

  get getOrderInfo() {
    return this.order;
  }
}

export default new OrderInfo();
