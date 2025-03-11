import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

interface ButtonProps {
  type: "primary" | "secondary" | "danger";
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export const Button = ({ type, onClick, text, disabled }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[type], disabled && styles.disabled]}
      onPress={onClick}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
  },
  primary: {
    backgroundColor: Colors.blue,
  },
  secondary: {
    backgroundColor: Colors.green,
  },
  danger: {
    backgroundColor: Colors.red,
  },
  disabled: {
    opacity: 0.5,
  },
});
