import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import LoginScreen from "./src/screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={RegistrationScreen} options={{ title: "Create Account" }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Log In" }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
