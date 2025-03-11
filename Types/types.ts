export interface TypeProduct {
  id: string;
  name: string;
  price: number;
  quantity?: number;
}

export type TypeProducts = Record<TypeProduct["id"], number>;
