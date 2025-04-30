import { Stack } from "expo-router";
import './globals.css';
import React from "react";
import { View, StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
    <StatusBar hidden={true} />
    <Stack>
      
    <Stack.Screen
      name="(tabs)"
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="movies/[id]"
      options={{
        title: "Search",
        headerShown: false,
      }}
    />
    
  </Stack>;
  </>
  )
   
}
