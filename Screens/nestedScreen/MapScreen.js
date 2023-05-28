import styled from "styled-components/native";

import MapView, { Marker } from "react-native-maps";
export default function MapScreen({ route }) {
  const { latitude, longitude } = route.params.item.location.coords;
  console.log("latitude: ", latitude);
  console.log("longitude: ", longitude);
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      <Marker
        title="Photo location"
        coordinate={{ latitude: latitude, longitude: longitude }}
      />
    </MapView>
  );
}
