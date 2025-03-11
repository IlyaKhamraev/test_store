import { TypeProduct, OrderInfoType } from "@/types";

export const randomId = () => Math.random().toString(16).slice(2);

export const getRandomWithProbability = () => {
  const randomValue = Math.random();
  return randomValue < 0.7 ? 1 : 0;
};

export const randomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generagteRandomProducts = () => {
  const randomProducts: TypeProduct[] = [];

  for (let i = 0; i < 10; i++) {
    const id = randomId();
    const product = {
      id,
      name: `Product ${id}`,
      price: randomValue(100, 500),
      quantity: randomValue(1, 10),
    };

    randomProducts.push(product);
  }

  return randomProducts;
};

export const minAmount = 1000;

export const fetchStatistic = (data: OrderInfoType) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(data);
    });
  });
};
