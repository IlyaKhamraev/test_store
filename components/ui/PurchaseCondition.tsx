import React from "react";
import { StyleSheet, Text } from "react-native";

import { Colors } from "@/constants/Colors";

interface PurchaseConditionProps {
  minAmount: number;
}

export const PurchaseCondition = ({ minAmount }: PurchaseConditionProps) => {
  return (
    <Text style={styles.purchaseConditionText}>
      Для того чтобы совершить покупку, необходимо набрать товаров на сумму не
      менее {minAmount} руб.
    </Text>
  );
};

const styles = StyleSheet.create({
  purchaseConditionText: {
    marginBottom: 20,
    fontSize: 16,
    color: Colors.red,
  },
});
