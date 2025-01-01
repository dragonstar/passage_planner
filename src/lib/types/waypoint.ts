export interface Waypoint {
  id?: string;
  name: string;
  lat: number;
  lng: number;
  notes?: string;
  order?: number;
  day?: string; // Add day field
}

export interface WaypointWithDay extends Waypoint {
  day: string;
  order: number;
}

export type WaypointUpdate = Partial<Waypoint>;

export interface DailyWaypoints {
  date: string;
  waypoints: Waypoint[];
}