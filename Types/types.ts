export interface TypeProduct {
  id: number;
  name: string;
  price: number;
}

export type TypeProducts = Record<TypeProduct["id"], number>;
