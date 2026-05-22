import { StyleSheet, View } from "react-native";
import MapView, {
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
  type Region,
} from "react-native-maps";

import {
  DEFAULT_MAP_REGION,
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
});
