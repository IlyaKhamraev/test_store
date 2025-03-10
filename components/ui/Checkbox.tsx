import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
}

export const Checkbox = ({ label, isChecked, onToggle }: CheckboxProps) => {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
        {isChecked && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

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
    borderColor: "#000",
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
    color: "#FFF",
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
});

export default Checkbox;
