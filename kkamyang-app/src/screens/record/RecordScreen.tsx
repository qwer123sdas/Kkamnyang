import { Button, StyleSheet, Text, View } from "react-native";

import { RunningMap } from "../../components/map/RunningMap";
import { useActivity } from "../../hooks/useActivity";
import { useGPSRecorder } from "../../hooks/useGPSRecorder";

export default function RecordScreen() {
  const {
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
    points,
    start: startGPS,
    stop: stopGPS,
  } = useGPSRecorder();

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
      <Button
        disabled={isStarting || status === "STARTED"}
        onPress={handleStart}
        title={isStarting ? "Starting" : "Start Record"}
      />
      <Button
        disabled={status !== "STARTED" || isFinishing}
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
});
