import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../../models/place";
import { Colors } from "../../constants/colors";

interface PlaceItemProps {
  place: Place;
  onPress: (id: string) => void;
}

const PlaceItem = ({ place, onPress }: PlaceItemProps) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={onPress.bind(null, place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 6,
    overflow: "hidden",
    marginVertical: 12,
    backgroundColor: Colors.primary500,

    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.9,
  },
  image: { flex: 1, height: 100 },
  infoContainer: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 14,
    color: Colors.gray700,
  },
});
