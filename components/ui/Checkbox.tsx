import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { Colors } from "@/constants/Colors";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

export const Checkbox = ({ label, isChecked, onToggle }: CheckboxProps) => (
  <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
    <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
      {isChecked && <Text style={styles.checkmark}>✓</Text>}
    </View>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  checkmark: {
    color: Colors.white,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
});
