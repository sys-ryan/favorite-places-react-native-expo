import React from "react";
import PlacesList from "../components/places/PlacesList";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { usePlaces } from "../hooks/usePlaces";

interface AllPlacesProps {
  route: RouteProp<RootStackParamList, "AllPlaces">;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const AllPlaces = ({ route, navigation }: AllPlacesProps) => {
  const loadedPlaces = usePlaces(route);

  return <PlacesList places={loadedPlaces} />;
};

export default AllPlaces;
