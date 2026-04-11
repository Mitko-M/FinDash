import { View, Text, TextInput, StyleSheet } from "react-native";

type InputFieldProps = {
  placeHolder: string;
  label: string;
};

export function InputField({ placeHolder, label }: InputFieldProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput placeholder={placeHolder} style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: "black",
  },
});
