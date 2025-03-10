import { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { observer } from "mobx-react-lite";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import ProductsStore from "@/store/products";
import OrderStore from "@/store/order";
import { products } from "@/constants/data";
import { ProductsList } from "@/components/ui/ProductsList";
import { Form } from "@/components/ui/Form";

const minAmount = 1000;

const ProfileScreen = observer(() => {
  const getProductsStore = ProductsStore.getProductsStore;
  const getOrderStore = OrderStore.getOrderInfo;

  const productsIds = Object.keys(getProductsStore);

  const isHasProducts = Boolean(productsIds.length);

  const basketData = products.filter(({ id }) =>
    productsIds.includes(String(id))
  );

  const totalAmount = basketData.reduce((acc, { id, price }) => {
    acc += getProductsStore[id] * price;
    return acc;
  }, 0);

  const isPurchaseCondition =
    minAmount >= totalAmount && Boolean(basketData.length);

  const foramttedAmount = `${totalAmount} руб.`;

  // const handleClaerProducts = () => ProductsStore.clearProducts();

  // const toggleLeaveAtDoor = () => {
  //   OrderStore.toggleLeaveAtDoor();
  // };

  // const toggleCallOfBeforeDelivery = () => {
  //   OrderStore.toggleCallOfBeforeDelivery();
  // };

  // const handleSubmit = () => {

  // }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <View style={styles.container}>
        <ThemedText style={styles.titleContainer} type="title">
          Корзина
        </ThemedText>

        {isHasProducts ? (
          <Text style={styles.text}>Товаров на сумму: {foramttedAmount}</Text>
        ) : null}

        <ProductsList isBasket products={basketData} />

        {isHasProducts ? (
          <Text style={styles.text}>К оплате: {foramttedAmount}</Text>
        ) : null}

        {isPurchaseCondition ? (
          <Text style={styles.purchaseConditionText}>
            Для того чтобы совершить покупку, необходимо набрать товаров на
            сумму не менее {minAmount} руб.
          </Text>
        ) : null}

        <Form
          isHasProducts={isHasProducts}
          foramttedAmount={foramttedAmount}
          leaveAtDoor={getOrderStore.leaveAtDoor}
          callOfBeforeDelivery={getOrderStore.callOfBeforeDelivery}
          isPurchaseCondition={isPurchaseCondition}
          totalAmount={totalAmount}
          productsStore={getProductsStore}
        />

        {/* <View style={{ marginBottom: 10 }}>
          <Checkbox
            label="Оставить товар у двери"
            isChecked={getOrderStore.leaveAtDoor}
            onToggle={toggleLeaveAtDoor}
          />
        </View>
        <View style={{ marginBottom: 10 }}>
          <Checkbox
            label="Позвонить за час до доставки"
            isChecked={getOrderStore.callOfBeforeDelivery}
            onToggle={toggleCallOfBeforeDelivery}
          />
        </View>

        {isHasProducts ? (
          <TouchableOpacity
            style={
              isPurchaseCondition ? styles.addButtonDisabled : styles.addButton
            }
            onPress={() => console.log}
            disabled={isPurchaseCondition}
          >
            <Text
              style={styles.addButtonText}
            >{`Опалтить ${foramttedAmount}`}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.text}>Ваша корзина пуста...</Text>
        )}

        {isHasProducts ? (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClaerProducts}
          >
            <Text style={styles.addButtonText}>Удалить товары</Text>
          </TouchableOpacity>
        ) : null} */}
      </View>
    </ParallaxScrollView>
  );
});

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  container: {
    padding: 30,
  },
  titleContainer: {
    fontSize: 26,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  purchaseConditionText: {
    marginBottom: 20,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#098003",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonDisabled: {
    backgroundColor: "#098003",
    opacity: 0.7,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  clearButton: {
    backgroundColor: "#d10617",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
