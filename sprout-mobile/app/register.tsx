// app/register.tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { useRouter } from "expo-router";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
});

type FormValues = z.infer<typeof schema>;

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function Register() {
  const router = useRouter();
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/auth/register`, data, { timeout: 10000 });
      Alert.alert("Success", "Account created. Please log in.");
      router.replace("/"); // back to home; later we’ll push to /login
    } catch (e: any) {
      const msg = e?.response?.data?.detail || "Registration failed";
      Alert.alert("Error", String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 24, gap: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 8 }}>Create Account</Text>

      <Text>Email</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 }}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(t) => setValue("email", t)}
      />
      {errors.email && <Text style={{ color: "red" }}>{errors.email.message}</Text>}

      <Text>Password</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 }}
        secureTextEntry
        onChangeText={(t) => setValue("password", t)}
      />
      {errors.password && <Text style={{ color: "red" }}>{errors.password.message}</Text>}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        style={{
          marginTop: 12,
          paddingVertical: 12,
          alignItems: "center",
          borderRadius: 10,
          backgroundColor: loading ? "#87cefa" : "#1e90ff",
        }}
      >
        <Text style={{ color: "white", fontWeight: "700" }}>
          {loading ? "Creating..." : "Create Account"}
        </Text>
      </Pressable>
    </View>
  );
}
