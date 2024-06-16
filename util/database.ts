import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabaseSync("places.db");

interface PlaceTable {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
}

export async function init() {
  try {
    await database.withTransactionAsync(async () => {
      await database.execAsync(`
      CREATE TABLE IF NOT EXISTS places (
          id TEXT PRIMARY KEY NOT NULL,
          title TEXT NOT NULL,
          imageUri TEXT NOT NULL,
          address TEXT NOT NULL,
          lat REAL NOT NULL,
          lng REAL NOT NULL
          );`);

      console.log("[SQLite]\tTable 'places' created.");

      // 테이블 존재 여부 확인 쿼리 실행
      const result = await database.getAllAsync<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='places';",
      );

      // 결과에 따라 콘솔에 메시지를 출력합니다
      if (result.length > 0) {
        console.log("[SQLite]\tTable 'places' exists.");
      } else {
        console.log("[SQLite]\tTable 'places' does not exist.");
      }
    });
  } catch (e) {
    console.warn(e);
  }
}

export async function insertPlace(place: Place) {
  try {
    await database.withTransactionAsync(async () => {
      const result = await database.runAsync(
        `
            INSERT INTO places (id, title, imageUri, address, lat, lng)
            VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          place.id,
          place.title,
          place.imageUri,
          place.address,
          place.location.lat,
          place.location.lng,
        ],
      );

      console.log("[SQLite]\tPlace inserted.");
      console.log("[SQLite]\tresult: ", result);
    });
  } catch (e) {
    console.warn(e);
  }
}

export async function fetchPlaces(): Promise<Place[]> {
  try {
    const results = await database.getAllAsync<PlaceTable>(
      "SELECT * FROM places;",
    );

    return results.map(
      (result) =>
        new Place(
          result.title,
          result.imageUri,
          result.address,
          {
            lat: result.lat,
            lng: result.lng,
          },
          result.id,
        ),
    );
  } catch (e) {
    console.warn(e);
    return [];
  }
}

export async function fetchPlaceDetails(id: string) {
  try {
    const result = await database.getFirstAsync<PlaceTable>(
      "SELECT * FROM places WHERE id = ?;",
      [id],
    );

    console.log("id", id);
    console.log("result", result);

    if (result) {
      return new Place(
        result.title,
        result.imageUri,
        result.address,
        {
          lat: result.lat,
          lng: result.lng,
        },
        result.id,
      );
    } else {
      throw new Error("Place not found.");
    }
  } catch (e) {
    console.error(`[SQLite]\tError fetching place details. (id: ${id})`);
    console.error(e);
    return null;
  }
}
