import React, { useState } from "react";
import { View, Text, TextInput, Pressable, ActivityIndicator, Alert } from "react-native";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../api/client";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Min 6 characters"),
  confirm: z.string().min(6, "Min 6 characters"),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"],
});

type FormData = z.infer<typeof schema>;

export default function RegistrationScreen({ navigation }: any) {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      await api.post("/auth/register", { email: data.email, password: data.password });
      Alert.alert("Success", "Account created. Please log in.");
      navigation.navigate("Login");
    } catch (e: any) {
      const msg = e?.response?.data?.detail || "Registration failed";
      Alert.alert("Error", String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, gap: 10, justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "700", marginBottom: 12 }}>Create Account</Text>

      <Text>Email</Text>
      <TextInput
        style={inputStyle}
        autoCapitalize="none"
        keyboardType="email-address"
        onChangeText={(t) => setValue("email", t, { shouldValidate: true })}
        {...register("email")}
        placeholder="you@school.edu"
      />
      {errors.email && <Text style={errorStyle}>{errors.email.message}</Text>}

      <Text>Password</Text>
      <TextInput
        style={inputStyle}
        secureTextEntry
        onChangeText={(t) => setValue("password", t, { shouldValidate: true })}
        {...register("password")}
        placeholder="••••••••"
      />
      {errors.password && <Text style={errorStyle}>{errors.password.message}</Text>}

      <Text>Confirm Password</Text>
      <TextInput
        style={inputStyle}
        secureTextEntry
        onChangeText={(t) => setValue("confirm", t, { shouldValidate: true })}
        {...register("confirm")}
        placeholder="••••••••"
      />
      {errors.confirm && <Text style={errorStyle}>{errors.confirm.message}</Text>}

      <Pressable onPress={handleSubmit(onSubmit)} style={buttonStyle} disabled={loading}>
        {loading ? <ActivityIndicator /> : <Text style={{ color: "white", fontWeight: "700" }}>Sign Up</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Login")}>
        <Text style={{ textAlign: "center", marginTop: 8 }}>
          Already have an account? <Text style={{ fontWeight: "700" }}>Log in</Text>
        </Text>
      </Pressable>
    </View>
  );
}

const inputStyle = {
  borderWidth: 1,
  borderColor: "#ccc",
  borderRadius: 8,
  padding: 12,
} as const;

const errorStyle = { color: "crimson", marginTop: -6, marginBottom: 6 } as const;

const buttonStyle = {
  backgroundColor: "#0ea5e9",
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
  marginTop: 6,
} as const;
