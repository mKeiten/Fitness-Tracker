import {Session} from "./Session";

export interface ExerciseRecord {
  id: number;
  exercise: string;
  weight: number;
  repeats: number;
  sets: number;
  sessionId: number;
}
