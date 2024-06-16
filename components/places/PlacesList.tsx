import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Place } from "../../models/place";
import { Colors } from "../../constants/colors";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

interface PlacesListProps {
  places: Place[]; // TODO
}

const PlacesList = ({ places }: PlacesListProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const selectPlaceHandler = (id: string) => {
    navigation.navigate("PlaceDetails", {
      placeId: id,
    });
  };

  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places found. Maybe start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onPress={selectPlaceHandler} />
      )}
    />
  );
};

export default PlacesList;

const styles = StyleSheet.create({
  list: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fallbackText: {
    fontSize: 18,
    color: Colors.primary200,
  },
});
