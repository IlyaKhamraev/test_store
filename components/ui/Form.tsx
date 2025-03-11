import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import ProductsStore from "@/store/products";
import OrderStore from "@/store/order";
import { Checkbox } from "@/components/ui/Checkbox";
import { ScrollableModal } from "@/components/ui/ScrollableModal";
import { ProductsList } from "@/components/ui/ProductsList";
import { TypeProducts, TypeProduct } from "@/types";
import { Button } from "@/components/ui/Button";
import { PurchaseCondition } from "@/components/ui/PurchaseCondition";
import { minAmount } from "@/utils/helpers";

interface FormProps {
  isHasProducts: boolean;
  leaveAtDoor: boolean;
  callOfBeforeDelivery: boolean;
  isPurchaseCondition: boolean;
  foramttedAmount: string;
  totalAmount: number;
  productsStore: TypeProducts;
  basketData: TypeProduct[];
}

export const Form = ({
  isHasProducts,
  leaveAtDoor,
  callOfBeforeDelivery,
  isPurchaseCondition,
  foramttedAmount,
  totalAmount,
  productsStore,
  basketData,
}: FormProps) => {
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    OrderStore.updateAmount(totalAmount);
    OrderStore.updateProducts(productsStore);
  }, [totalAmount]);

  const handleClaerProducts = () => ProductsStore.clearProducts();

  const toggleLeaveAtDoor = () => {
    OrderStore.toggleLeaveAtDoor();
  };

  const toggleCallOfBeforeDelivery = () => {
    OrderStore.toggleCallOfBeforeDelivery();
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const buy = () => {
    OrderStore.buy();
  };

  return (
    <>
      {isHasProducts ? (
        <>
          <View style={styles.mb10}>
            <Checkbox
              label="Оставить товар у двери"
              isChecked={leaveAtDoor}
              onToggle={toggleLeaveAtDoor}
            />
          </View>
          <View style={styles.mb10}>
            <Checkbox
              label="Позвонить за час до доставки"
              isChecked={callOfBeforeDelivery}
              onToggle={toggleCallOfBeforeDelivery}
            />
          </View>
        </>
      ) : null}

      {isHasProducts ? (
        <View style={styles.mb10}>
          <Button
            text={`Оплатить ${foramttedAmount}`}
            onClick={() => toggleModal()}
            type="secondary"
            disabled={isPurchaseCondition}
          />
        </View>
      ) : (
        <Text style={styles.text}>Ваша корзина пуста...</Text>
      )}

      {isHasProducts ? (
        <View style={styles.mb10}>
          <Button
            text="Удалить товары"
            onClick={handleClaerProducts}
            type="danger"
          />
        </View>
      ) : null}

      <ScrollableModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      >
        <>
          <Text style={styles.modalTitle}>Подтверждение заказа</Text>
          <ScrollView style={styles.mb10}>
            <ProductsList isBasket products={basketData} />
          </ScrollView>

          {callOfBeforeDelivery ? (
            <Text style={styles.text}>Вам позвонят за час до доставки.</Text>
          ) : null}
          {leaveAtDoor ? (
            <Text style={styles.text}>Вам оставят заказ около двери.</Text>
          ) : null}
          <Text style={styles.text}>Общая сумма заказа {totalAmount} руб.</Text>
          {isPurchaseCondition ? (
            <View style={styles.mb10}>
              <PurchaseCondition minAmount={minAmount} />
            </View>
          ) : null}
          <View style={styles.mb10}>
            <Button
              disabled={isPurchaseCondition}
              text="Опалтить"
              onClick={() => {
                OrderStore.buy();
                toggleModal();
              }}
              type="secondary"
            />
          </View>
          <View style={styles.mb10}>
            <Button text="Закрыть" onClick={toggleModal} type="danger" />
          </View>
        </>
      </ScrollableModal>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  mb10: {
    marginBottom: 10,
  },
});

export default Form;
