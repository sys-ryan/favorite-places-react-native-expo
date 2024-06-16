import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Place } from "../models/place";

interface PlaceItemProps {
  place: Place;
  onPress: () => void;
}

const PlaceItem = ({ place, onPress }: PlaceItemProps) => {
  return (
    <Pressable onPress={onPress}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
};

export default PlaceItem;

const styles = StyleSheet.create({});
