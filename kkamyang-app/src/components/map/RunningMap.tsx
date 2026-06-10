import { StyleSheet, Text, View } from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  type Region,
} from "react-native-maps";

import {
  DEFAULT_MAP_REGION,
  MAP_CONFIG,
  RUNNING_ROUTE_POLYLINE,
} from "../../constants/map";
import type { GeoPoint } from "../../types/geo";

type RunningMapProps = {
  points: GeoPoint[];
};

function createRegion(point: GeoPoint | undefined): Region {
  if (!point) {
    return DEFAULT_MAP_REGION;
  }

  return {
    ...DEFAULT_MAP_REGION,
    latitude: point.latitude,
    longitude: point.longitude,
  };
}

export function RunningMap({ points }: RunningMapProps) {
  const currentPoint = points[points.length - 1];
  const region = createRegion(currentPoint);

  if (!MAP_CONFIG.googleMapsApiKey) {
    return (
      <View style={[styles.container, styles.unavailableContainer]}>
        <Text>Map is unavailable.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        region={region}
        style={styles.map}
      >
        {currentPoint ? <Marker coordinate={currentPoint} /> : null}
        {points.length > 1 ? (
          <Polyline
            coordinates={points}
            strokeColor={RUNNING_ROUTE_POLYLINE.strokeColor}
            strokeWidth={RUNNING_ROUTE_POLYLINE.strokeWidth}
          />
        ) : null}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280,
    width: "100%",
  },
  map: {
    flex: 1,
  },
  unavailableContainer: {
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
  },
});
