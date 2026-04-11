import { useState } from "react";
import { Platform, Pressable, Text, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface Props {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

export default function DateInputField({ label, value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      {/* Web version */}
      {Platform.OS === "web" ? (
        <input
          type="date"
          value={value.toISOString().split("T")[0]}
          onKeyDown={(e) => {
            e.preventDefault();
          }} //blocks typing
          onChange={(e) => onChange(new Date(e.target.value))}
          style={styles.webInput}
        />
      ) : (
        <>
          {/* Mobile version */}
          <Pressable onPress={() => setShowPicker(true)} style={styles.input}>
            <Text style={styles.inputText}>
              {value.toISOString().split("T")[0]}
            </Text>
          </Pressable>

          {showPicker && (
            <DateTimePicker
              value={value}
              mode="date"
              display="default"
              onDismiss={() => setShowPicker(false)}
              onValueChange={(event, selectedDate) => {
                if (selectedDate) {
                  onChange(selectedDate);
                }
              }}
            />
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    backgroundColor: "white",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  webInput: {
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ccc",
    fontSize: 16,
    backgroundColor: "white",
  },
});
