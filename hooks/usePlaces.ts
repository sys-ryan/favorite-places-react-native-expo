import {
  RouteProp,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { useEffect, useState } from "react";
import { Place } from "../models/place";
import { fetchPlaces } from "../util/database";

export const usePlaces = (
  route: RouteProp<RootStackParamList, "AllPlaces">,
) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadPlaces = async () => {
      const fetchedPlaces = await fetchPlaces();
      console.log("fetching places...", fetchedPlaces);
      setLoadedPlaces(fetchedPlaces);
    };

    if (isFocused) {
      loadPlaces();
      // const newPlace = route.params.newPlace;
      // setLoadedPlaces((prevPlaces) => [...prevPlaces, newPlace]);
      // navigation.setParams({ newPlace: null });
    }
  }, [isFocused]);

  return loadedPlaces;
};
