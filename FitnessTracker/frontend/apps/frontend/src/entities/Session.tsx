import {ExerciseRecord} from "./ExerciseRecord";

export interface Session {
  id: number;
  date: Date;
  exercises: ExerciseRecord[];
}
