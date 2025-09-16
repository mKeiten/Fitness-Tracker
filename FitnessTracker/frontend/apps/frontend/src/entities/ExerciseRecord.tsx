export interface ExerciseRecord {
  id: number;
  exercise: string;
  weight?: number;
  repeats?: number;
  duration?: number;
  sets?: number;
  type?: string;
  sessionId: number;
}
