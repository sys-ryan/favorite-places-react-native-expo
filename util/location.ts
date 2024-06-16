import { GOOGLE_API_KEY } from "@env";

export function getMapPreview(lat: number, lng: number) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAddress(lat: number, lng: number) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch address");
    }

    const data = await response.json();
    if (!data.results) {
      throw new Error("Failed to fetch address");
    }

    return data.results[0].formatted_address;
  } catch (error) {
    throw error;
  }
}
