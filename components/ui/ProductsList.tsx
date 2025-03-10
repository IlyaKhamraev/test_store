import React from "react";
import { View } from "react-native";

import { ProductCard } from "@/components/ui/ProductCard";
import { TypeProduct } from "@/Types/types";

interface ProductsListProps {
  products: TypeProduct[];
  isBasket?: boolean;
}

export const ProductsList = ({ products, isBasket }: ProductsListProps) => {
  return (
    <View style={styles.container}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isBasket={isBasket} />
      ))}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
};
export default ProductsList;
