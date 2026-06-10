import { useEffect, useMemo, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

import { RunningMap } from "../../components/map/RunningMap";
import { useActivity } from "../../hooks/useActivity";
import { useGPSRecorder } from "../../hooks/useGPSRecorder";
import { calculateTotalDistanceKm } from "../../utils/distance";

const METRIC_TICK_MS = 1000;

function formatDistance(distanceKm: number) {
  return `${distanceKm.toFixed(2)} km`;
}

function formatDuration(durationSec: number) {
  const safeDurationSec = Math.max(0, durationSec);
  const hours = Math.floor(safeDurationSec / 3600);
  const minutes = Math.floor((safeDurationSec % 3600) / 60);
  const seconds = safeDurationSec % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function formatPace(durationSec: number, distanceKm: number) {
  if (distanceKm <= 0) {
    return "-- /km";
  }

  const paceSecPerKm = Math.round(durationSec / distanceKm);
  return `${formatDuration(paceSecPerKm)} /km`;
}

function calculateElapsedSec(
  startedAt: string | null,
  endedAt: string | null | undefined,
  nowMs: number,
) {
  if (!startedAt) {
    return 0;
  }

  const startedAtMs = new Date(startedAt).getTime();
  const endedAtMs = endedAt ? new Date(endedAt).getTime() : nowMs;

  if (Number.isNaN(startedAtMs) || Number.isNaN(endedAtMs)) {
    return 0;
  }

  return Math.max(0, Math.round((endedAtMs - startedAtMs) / 1000));
}

export default function RecordScreen() {
  const {
    activity,
    activityId,
    errorMessage,
    finish,
    isFinishing,
    isStarting,
    start,
    status,
  } = useActivity();
  const {
    errorMessage: gpsErrorMessage,
    isCollecting,
    locateCurrentPosition,
    points,
    start: startGPS,
    stop: stopGPS,
  } = useGPSRecorder();
  const [nowMs, setNowMs] = useState(Date.now());

  useEffect(() => {
    if (status !== "STARTED") {
      return;
    }

    setNowMs(Date.now());

    const intervalId = setInterval(() => {
      setNowMs(Date.now());
    }, METRIC_TICK_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [status]);

  const distanceKm = useMemo(() => calculateTotalDistanceKm(points), [points]);
  const durationSec = calculateElapsedSec(
    activity?.started_at ?? null,
    activity?.ended_at,
    nowMs,
  );

  async function handleStart() {
    const startedActivity = await start();

    if (startedActivity) {
      await startGPS();
    }
  }

  async function handleFinish() {
    stopGPS();
    await finish(points);
  }

  return (
    <View style={styles.container}>
      <Text>Record Screen</Text>
      <RunningMap points={points} />
      <View style={styles.metrics}>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Distance</Text>
          <Text style={styles.metricValue}>{formatDistance(distanceKm)}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Duration</Text>
          <Text style={styles.metricValue}>{formatDuration(durationSec)}</Text>
        </View>
        <View style={styles.metricItem}>
          <Text style={styles.metricLabel}>Pace</Text>
          <Text style={styles.metricValue}>
            {formatPace(durationSec, distanceKm)}
          </Text>
        </View>
      </View>
      <Button onPress={locateCurrentPosition} title="Find Current Location" />
      <Button
        disabled={isStarting || status === "STARTED"}
        onPress={handleStart}
        title={isStarting ? "Starting" : "Start Record"}
      />
      <Button
        disabled={status !== "STARTED" || isFinishing || points.length < 1}
        onPress={handleFinish}
        title={isFinishing ? "Finishing" : "Finish Record"}
      />
      {activityId ? <Text>Activity ID: {activityId}</Text> : null}
      {status ? <Text>Status: {status}</Text> : null}
      <Text>GPS: {isCollecting ? "Collecting" : "Stopped"}</Text>
      <Text>GPS Points: {points.length}</Text>
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {gpsErrorMessage ? <Text>{gpsErrorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  metrics: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    color: "#555555",
    fontSize: 12,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "600",
  },
});
