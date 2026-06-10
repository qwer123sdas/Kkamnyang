# TASK-025-health-metrics-roadmap

## Goal

Record activity can eventually use health platform or smart watch data for richer metrics.

Target metrics:

```text
1. Heart rate
2. Cadence
3. Calories
4. Elevation gain
```

## Current Decision

```text
1. MVP Record UI shows GPS-based Distance, Duration, and Pace first.
2. Heart rate and cadence are not implemented in TASK-020.
3. Smart watch and health platform integration must be a separate task.
4. No DB schema change is included in this roadmap document.
```

## Recommended Integration Order

```text
1. Apple HealthKit for iOS health samples.
2. Android Health Connect for Android health samples.
3. BLE heart-rate sensor support only if real-time device streaming is required.
4. Smart watch direct SDKs only if HealthKit/Health Connect cannot provide the needed data.
```

## Metric Feasibility

### Heart Rate

```text
Possible: yes
Best source: Apple HealthKit / Android Health Connect
Real-time source: BLE heart-rate monitor or watch-specific APIs
MVP risk: medium to high because permissions, native modules, and device availability are required.
```

### Cadence

```text
Possible: yes
Best source: HealthKit / Health Connect running cadence samples when available
Fallback source: phone motion sensor estimation
MVP risk: high because GPS-only cadence is not reliable.
```

### Calories

```text
Possible: yes
Best source: Health platform active energy samples
Fallback source: estimate from distance, duration, weight, and activity type
MVP risk: medium because user body profile fields are needed for useful estimates.
```

### Elevation Gain

```text
Possible: partial
Best source: GPS altitude plus smoothing, barometer, or map elevation API
Current source: expo-location altitude can exist but can be noisy or null.
MVP risk: medium because raw altitude needs filtering.
```

## Future Data Model Direction

Do not apply this without a separate schema task.

```text
activity_metrics
- activity_metric_id BIGSERIAL
- activity_id BIGINT
- recorded_at TIMESTAMPTZ
- heart_rate_bpm INTEGER
- cadence_spm INTEGER
- altitude_m NUMERIC
- elevation_gain_m NUMERIC
- calories_kcal NUMERIC
- source TEXT
- created_at
- created_by
- updated_at
- updated_by
- deleted_yn
- deleted_at
```

## Implementation Notes

```text
1. Expo Go is not enough for HealthKit / Health Connect native integration.
2. A development build is required after adding native health modules.
3. Health permission prompts must be explicit and separate from GPS permission.
4. API responses should not change until backend and frontend are planned together.
5. Watch or platform data can arrive after the activity ends, so sync should support delayed samples.
```

## Suggested Next Task

```text
TASK-026-health-platform-spike
```

Scope:

```text
1. Choose HealthKit / Health Connect library candidates.
2. Verify Expo SDK 54 compatibility.
3. Verify development build requirements.
4. Define permission UX.
5. Define backend schema and API changes in a separate design document.
```
