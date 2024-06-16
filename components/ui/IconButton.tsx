import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color: string | undefined;
  onPress: () => void;
}

const IconButton = ({ icon, size, color, onPress }: IconButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 4,
    // margin: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.8,
  },
});
