import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import ProductsStore from "@/store/products";
import OrderStore from "@/store/order";
import { Checkbox } from "@/components/ui/Checkbox";
import { ScrollableModal } from "@/components/ui/ScrollableModal";
import { ProductsList } from "@/components/ui/ProductsList";
import { TypeProducts, TypeProduct } from "@/Types/types";

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

  return (
    <>
      {isHasProducts ? (
        <>
          <View style={{ marginBottom: 10 }}>
            <Checkbox
              label="Оставить товар у двери"
              isChecked={leaveAtDoor}
              onToggle={toggleLeaveAtDoor}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Checkbox
              label="Позвонить за час до доставки"
              isChecked={callOfBeforeDelivery}
              onToggle={toggleCallOfBeforeDelivery}
            />
          </View>
        </>
      ) : null}

      {isHasProducts ? (
        <TouchableOpacity
          style={
            isPurchaseCondition ? styles.addButtonDisabled : styles.addButton
          }
          onPress={() => toggleModal()}
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
      ) : null}

      <ScrollableModal
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
      >
        <>
          <Text style={styles.modalTitle}>Подтверждение заказа</Text>
          <ScrollView style={{ marginBottom: 10 }}>
            <ProductsList isBasket products={basketData} />
          </ScrollView>

          {callOfBeforeDelivery ? (
            <Text style={styles.text}>Вам позвонят за час до доставки.</Text>
          ) : null}
          {leaveAtDoor ? (
            <Text style={styles.text}>Вам оставят заказ около двери.</Text>
          ) : null}
          <Text style={styles.text}>Общая сумма заказа {totalAmount} руб.</Text>
          <TouchableOpacity onPress={toggleModal} style={styles.approveButton}>
            <Text style={styles.buttonText}>Опалтить</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
            <Text style={styles.buttonText}>Закрыть</Text>
          </TouchableOpacity>
        </>
      </ScrollableModal>
    </>
  );
};

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
    opacity: 0.3,
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
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  approveButton: {
    backgroundColor: "#098003",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
});

export default Form;
