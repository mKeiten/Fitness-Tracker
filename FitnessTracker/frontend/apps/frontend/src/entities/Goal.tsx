export interface Goal {
  id?: number;
  exercise: string;
  targetWeight: number;
  targetRepeats: number;
  targetDuration: number;
  targetSets: number;
  deadline: Date;
  achieved: Boolean;
}
