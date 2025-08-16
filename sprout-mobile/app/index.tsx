// app/index.tsx
import { Link } from "expo-router";
import { View, Text, Pressable } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 16 }}>Welcome to Sprout</Text>
      <Text style={{ textAlign: "center", marginBottom: 24 }}>
        Learn, practice, and trade—built to boost financial literacy for students.
      </Text>
      <Link href="/register" asChild>
        <Pressable style={{ paddingVertical: 12, paddingHorizontal: 20, borderRadius: 10, backgroundColor: "#1e90ff" }}>
          <Text style={{ color: "white", fontWeight: "600" }}>Create your account</Text>
        </Pressable>
      </Link>
    </View>
  );
}
