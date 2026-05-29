import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import { StyleSheet, View, Text } from "react-native";

type DropdownElement = {
  label: string;
  value: string;
};

type DropdownInputProps = {
  data: DropdownElement[];
  defaultValue: string;
  label: string;
  search?: boolean; // If it's not explicitly set to false it will display a search bar in the dropdown
  value: string | null;
  onChange: (item: DropdownElement) => void;
  disabled?: boolean;
};

export function DropdownInputField({
  data,
  defaultValue,
  label,
  search = true,
  value,
  onChange,
  disabled = false,
}: DropdownInputProps) {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={{ marginBottom: 16, opacity: disabled ? 0.5 : 1 }}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <Dropdown
        style={[
          styles.dropdown,
          isFocus && { borderColor: "blue" },
          disabled && styles.disabledDropdown,
        ]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={styles.containerStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? defaultValue : "..."}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => !disabled && setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item);
          setIsFocus(false);
        }}
        disable={disabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownLabel: {
    marginBottom: 6,
    fontSize: 16,
    color: "black",
  },
  dropdown: {
    height: 40,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  disabledDropdown: {
    backgroundColor: "lightgray",
    borderColor: "#ccc",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  containerStyle: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: "hidden",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 8,
  },
});
