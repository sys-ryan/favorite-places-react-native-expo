import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { fetchPlaceDetails } from "../util/database";
import { Place } from "../models/place";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface PlaceDetailsProps {
  route: RouteProp<RootStackParamList, "PlaceDetails">;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const PlaceDetails = ({ route, navigation }: PlaceDetailsProps) => {
  const [fetchedPlace, setFetchedPlace] = useState<Place | null>(null);

  const showOnMapHandler = () => {
    console.log("fetchedPlcae", fetchedPlace);
    navigation.navigate("Map", {
      readOnly: true,
      lat: fetchedPlace?.location.lat,
      lng: fetchedPlace?.location.lng,
    });
  };

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place?.title,
      });
    }

    loadPlaceData();

    // use selectedPlaceId to fetch the place data
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{
          uri: fetchedPlace?.imageUri,
        }}
      />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{fetchedPlace?.address}</Text>
        </View>
        <OutlinedButton icon={"map"} onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
