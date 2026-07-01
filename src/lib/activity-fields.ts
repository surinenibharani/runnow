/** Activity fields for analysis — excludes heavy `polyline`. */
export const activitySummarySelect = {
  id: true,
  stravaId: true,
  userId: true,
  name: true,
  type: true,
  distance: true,
  movingTime: true,
  elapsedTime: true,
  averageHeartrate: true,
  maxHeartrate: true,
  elevationGain: true,
  averageCadence: true,
  sufferScore: true,
  workoutType: true,
  startDate: true,
  routeKey: true,
} as const;

export type ActivitySummary = {
  id: string;
  stravaId: string;
  userId: string;
  name: string;
  type: string;
  distance: number;
  movingTime: number;
  elapsedTime: number;
  averageHeartrate: number | null;
  maxHeartrate: number | null;
  elevationGain: number | null;
  averageCadence: number | null;
  sufferScore: number | null;
  workoutType: number | null;
  startDate: Date;
  routeKey: string | null;
};

export function groupActivitiesByUser<T extends { userId: string }>(
  activities: T[],
  userIds: string[],
  limitPerUser: number
): Map<string, T[]> {
  const grouped = new Map<string, T[]>();
  for (const id of userIds) grouped.set(id, []);

  for (const activity of activities) {
    const list = grouped.get(activity.userId);
    if (list && list.length < limitPerUser) list.push(activity);
  }

  return grouped;
}
