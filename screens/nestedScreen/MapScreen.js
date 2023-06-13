import styled from "styled-components/native";

import MapView, { Marker } from "react-native-maps";
export default function MapScreen({ route }) {
  const { latitude, longitude } = route.params.item?.location?.coords || {};

  const { locationName, name } = route.params.item?.state;

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
        title={name}
        coordinate={{ latitude: latitude, longitude: longitude }}
      />
    </MapView>
  );
}
