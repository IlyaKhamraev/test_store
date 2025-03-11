import React from "react";
import { View } from "react-native";

import { ProductCard } from "@/components/ui/ProductCard";
import { TypeProduct } from "@/types";
import { Colors } from "@/constants/Colors";

interface ProductsListProps {
  products: TypeProduct[];
  isBasket?: boolean;
}

export const ProductsList = ({ products, isBasket }: ProductsListProps) => (
  <View style={styles.container}>
    {products.map((product) => (
      <ProductCard key={product.id} product={product} isBasket={isBasket} />
    ))}
  </View>
);

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
};

export default ProductsList;
