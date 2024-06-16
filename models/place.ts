import uuid from "react-native-uuid";

export class Place {
  public id: string;
  public title: string;
  public imageUri: string;
  public address: string;
  public location: GeoLocation;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: GeoLocation,
    id?: string,
  ) {
    this.id = id || (uuid.v4() as string);
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
  }
}

export class GeoLocation {
  public lat: number;
  public lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }
}
