import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDB } from "@/src/services/db/transactions";

export default function RootLayout() {
  useEffect(() => {
    const setup = async () => {
      await initDB();
    };

    setup();
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="add-transaction"
        options={{ title: "Add Transaction" }}
      />
    </Stack>
  );
}
