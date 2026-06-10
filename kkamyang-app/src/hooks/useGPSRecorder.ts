import { useCallback, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";

import { GPS_COLLECTION_INTERVAL_MS } from "../constants/gps";
import type { RecordedGeoPoint } from "../types/geo";
import { filterGPSNoise } from "../utils/gps";

type GPSPermissionStatus = "undetermined" | "granted" | "denied";

const LOCATION_OPTIONS = {
  accuracy: Location.Accuracy.High,
} satisfies Location.LocationOptions;

function toRecordedGeoPoint(location: Location.LocationObject): RecordedGeoPoint {
  return {
    accuracy: location.coords.accuracy,
    altitude: location.coords.altitude,
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    recorded_at: new Date(location.timestamp).toISOString(),
    speed_mps: location.coords.speed,
  };
}

export function useGPSRecorder() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isCollectingRef = useRef(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCollecting, setIsCollecting] = useState(false);
  const [permissionStatus, setPermissionStatus] =
    useState<GPSPermissionStatus>("undetermined");
  const [points, setPoints] = useState<RecordedGeoPoint[]>([]);

  const requestLocationPermission = useCallback(async () => {
    const permission = await Location.requestForegroundPermissionsAsync();
    const nextPermissionStatus =
      permission.status === Location.PermissionStatus.GRANTED
        ? "granted"
        : "denied";

    setPermissionStatus(nextPermissionStatus);

    if (nextPermissionStatus !== "granted") {
      setErrorMessage("Location permission is required.");
      return false;
    }

    return true;
  }, []);

  const collectCurrentLocation = useCallback(async () => {
    try {
      const location = await Location.getCurrentPositionAsync(LOCATION_OPTIONS);

      setPoints((currentPoints) =>
        filterGPSNoise([...currentPoints, toRecordedGeoPoint(location)]),
      );
    } catch {
      setErrorMessage("GPS coordinate collection failed.");
    }
  }, []);

  const locateCurrentPosition = useCallback(async () => {
    setErrorMessage(null);

    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return;
    }

    await collectCurrentLocation();
  }, [collectCurrentLocation, requestLocationPermission]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    isCollectingRef.current = false;
    setIsCollecting(false);
  }, []);

  const start = useCallback(async () => {
    if (isCollectingRef.current) {
      return;
    }

    setErrorMessage(null);

    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      return;
    }

    isCollectingRef.current = true;
    setIsCollecting(true);
    setPoints([]);
    await collectCurrentLocation();

    intervalRef.current = setInterval(
      collectCurrentLocation,
      GPS_COLLECTION_INTERVAL_MS.RUN,
    );
  }, [collectCurrentLocation, requestLocationPermission]);

  useEffect(() => {
    return stop;
  }, [stop]);

  return {
    errorMessage,
    isCollecting,
    locateCurrentPosition,
    permissionStatus,
    points,
    start,
    stop,
  };
}
