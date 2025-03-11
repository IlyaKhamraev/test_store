import { makeAutoObservable } from "mobx";
import { TypeProducts, OrderInfoType } from "@/types";
import { fetchStatistic } from "@/utils/helpers";
import { Message, getRandomWithProbability } from "@/utils/helpers";
import ProductsStore from "@/store/products";

const initialStateOrder = {
  products: {},
  leaveAtDoor: false,
  callOfBeforeDelivery: false,
  amount: 0,
};

class OrderInfo {
  isLoading: boolean = false;
  error: string = "";
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

  async buy() {
    return new Promise((res, rej) => {
      const isSuccess = Boolean(getRandomWithProbability());

      this.isLoading = true;

      setTimeout(() => {
        if (isSuccess) {
          res(this.order);
        } else {
          rej("Ошибка при оформлении заказа");
        }
      }, 1000);
    })
      .then(() => {
        this.clearOrder();

        Message({ type: "success", text: "Заказ оформлен!" });
      })
      .catch((err) => Message({ type: "error", text: err }))
      .finally(() => {
        this.isLoading = false;
      });
  }

  clearOrder() {
    this.order = initialStateOrder;
    this.isLoading = false;
    this.error = "";
    ProductsStore.clearProducts();
  }

  get getOrderInfo() {
    return this.order;
  }
}

export default new OrderInfo();
