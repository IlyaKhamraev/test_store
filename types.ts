export interface TypeProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export type TypeProducts = Record<TypeProduct["id"], number>;

export interface OrderInfoType {
  leaveAtDoor: boolean;
  callOfBeforeDelivery: boolean;
  amount: number;
  products: TypeProducts;
}

export type MessageProps = { type: "success" | "error" | "info"; text: string };
