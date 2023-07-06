import styled from "styled-components/native";

import MapView, { Marker } from "react-native-maps";
export default function MapScreen({ route }) {
  const { latitude, longitude } = route.params.item?.location || {};

  const date = Date(route.params.item.location.timestamp);
  const { name } = route.params.item.title;

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
        title={`${name}, ${date}`}
        coordinate={{ latitude: latitude, longitude: longitude }}
      />
    </MapView>
  );
}
