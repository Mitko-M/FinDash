import { View, Text, TextInput, StyleSheet } from "react-native";

type InputFieldProps = {
  placeHolder: string;
  label: string;
  onChangeText: (text: string) => void;
  value: string;
};

export function InputField({
  placeHolder,
  label,
  value,
  onChangeText,
}: InputFieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeHolder}
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderColor: "gray",
    height: 40,
    borderWidth: 0.5,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: "black",
  },
});
