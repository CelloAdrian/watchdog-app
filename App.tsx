import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/pages/Register";
import WifiSetup from "./src/pages/WifiSetup";
import Homescreen from "./src/pages/Homescreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="WifiSetup" component={WifiSetup} />
        <Stack.Screen name="Homescreen" component={Homescreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
