import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getMapPreview } from "../../util/location";
import { GeoLocation } from "../../models/place";
import { useLocation } from "../../hooks/useLocation";

interface LocationPickerProps {
  onPickLocation: (location: GeoLocation, adderss: string) => void;
}

const LocationPicker = ({ onPickLocation }: LocationPickerProps) => {
  const { getLocationHandler, address, pickOnMapHandler, pickedLocation } =
    useLocation();

  useEffect(() => {
    if (pickedLocation && address) {
      onPickLocation(pickedLocation, address);
    }
  }, [pickedLocation, address]);

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(pickedLocation?.lat, pickedLocation?.lng),
        }}
        style={styles.mapPreviewImage}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon={"location"} onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"location"} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mapPreviewImage: {
    width: "100%",
    height: "100%",
  },
});
