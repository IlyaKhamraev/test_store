import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { observer } from "mobx-react-lite";

import { TypeProduct } from "@/Types/types";
import ProductsStore from "@/store/products";

interface ProductCardProps {
  product: TypeProduct;
  isBasket?: boolean;
}

export const ProductCard = observer(
  ({ product, isBasket }: ProductCardProps) => {
    const { name, price, id } = product;

    const getProductsBasket = ProductsStore.getBasket;

    const productsIds = getProductsBasket[id];

    const handleAddProduct = (id: TypeProduct["id"]) => {
      ProductsStore.addProduct(id);
    };

    const handleDecProduct = (id: TypeProduct["id"]) => {
      ProductsStore.decerementProducts(id);
    };

    const handleRemoveProduct = (id: TypeProduct["id"]) => {
      ProductsStore.removeProduct(id);
    };

    const isShowToggle = Boolean(productsIds);

    const handleСonditionClick = (id: TypeProduct["id"]) => {
      if (isBasket) {
        if (productsIds !== 1) {
          handleDecProduct(product.id);
        }
        return;
      }
      if (productsIds === 1) {
        handleRemoveProduct(id);
      } else {
        handleDecProduct(product.id);
      }
    };

    return (
      <View style={styles.card}>
        <View style={styles.imageBox}>
          <Image
            source={{
              uri: `https://loremflickr.com/200/200?random=${Math.random()}`,
            }}
            style={styles.image}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.price}>{price} руб.</Text>
          </View>

          {isShowToggle ? (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleСonditionClick(id)}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{productsIds}</Text>
              <TouchableOpacity
                onPress={() => handleAddProduct(id)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleAddProduct(id)}
            >
              <Text style={styles.addButtonText}>Добавить</Text>
            </TouchableOpacity>
          )}

          {isBasket ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleRemoveProduct(id)}
            >
              <Text style={styles.addButtonText}>Удалить товар</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageBox: {
    flex: 1,
    paddingRight: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
  },
  infoContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  quantityButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
