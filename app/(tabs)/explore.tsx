import { StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react-lite";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import ProductsStore from "@/store/products";
import OrderStore from "@/store/order";
import { ProductsList } from "@/components/ui/ProductsList";
import { Form } from "@/components/ui/Form";
import { minAmount } from "@/utils/helpers";
import { Colors } from "@/constants/Colors";
import { PurchaseCondition } from "@/components/ui/PurchaseCondition";

const TabTwoScreen = observer(() => {
  const getProductsBasket = ProductsStore.getProductsBasket;
  const getBasket = ProductsStore.getBasket;
  const getOrderStore = OrderStore.getOrderInfo;

  const isHasProducts = Boolean(getProductsBasket.length);

  const totalAmount = getProductsBasket.reduce((acc, { id, price }) => {
    acc += getBasket[id] * price;
    return acc;
  }, 0);

  const isPurchaseCondition =
    minAmount >= totalAmount && Boolean(getProductsBasket.length);

  const foramttedAmount = `${totalAmount} руб.`;

  return (
    <ParallaxScrollView>
      <View style={styles.container}>
        <ThemedText style={styles.titleContainer} type="title">
          Корзина
        </ThemedText>

        {isHasProducts ? (
          <Text style={styles.text}>Товаров на сумму: {foramttedAmount}</Text>
        ) : null}

        <ProductsList isBasket products={getProductsBasket} />

        {isHasProducts ? (
          <Text style={styles.text}>К оплате: {foramttedAmount}</Text>
        ) : null}

        {isPurchaseCondition ? (
          <PurchaseCondition minAmount={minAmount} />
        ) : null}

        <Form
          isHasProducts={isHasProducts}
          foramttedAmount={foramttedAmount}
          leaveAtDoor={getOrderStore.leaveAtDoor}
          callOfBeforeDelivery={getOrderStore.callOfBeforeDelivery}
          isPurchaseCondition={isPurchaseCondition}
          totalAmount={totalAmount}
          productsStore={getBasket}
          basketData={getProductsBasket}
        />
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
    paddingTop: 80,
  },
  titleContainer: {
    fontSize: 26,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
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
    color: Colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TabTwoScreen;
