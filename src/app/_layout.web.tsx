import { Stack, router } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function WebRootLayout() {
  return (
    <View style={{ flex: 1 }}>
      {/* Custom Web Navbar */}
      <View
        style={{
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderColor: "#ddd",
        }}
      >
        <Pressable onPress={() => router.push("/")}>
          <Text>Home</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(tabs)/stats")}>
          <Text>Stats</Text>
        </Pressable>

        <Pressable onPress={() => router.push("/(tabs)/settings")}>
          <Text>Settings</Text>
        </Pressable>
      </View>

      {/* Screens */}
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}
