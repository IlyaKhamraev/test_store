import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ProductCard } from "@/components/ui/ProductCard";
import ProductsStore from "@/store/products";

const HomeScreen = observer(() => {
  useEffect(() => {
    ProductsStore.fetchProducts();
  }, []);

  const isLoading = ProductsStore.isLoading;
  const products = ProductsStore.goods;

  const handleLoadMore = () => {
    if (!isLoading) {
      ProductsStore.fetchProducts();
    }
  };

  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.titleContainer} type="title">
        Товары
      </ThemedText>

      {isLoading ? <Text>Загрузка товаров...</Text> : null}

      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={({ id }) => id}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 150,
  },
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    fontSize: 26,
    marginBottom: 20,
  },
  footer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
