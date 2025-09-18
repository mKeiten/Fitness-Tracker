import React, { useEffect, useState } from "react";
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";

type ExerciseInputProps = {
  onChange: (exercise: string) => void;
};

/*function Menuitem(props: { value: string, children: ReactNode }) {
  return null;
}*/

export default function ExerciseInput({onChange}: ExerciseInputProps) {
  const [exerciseOptions, setExerciseOptions] = useState<string[]>([]);
  const [exercise, setExercise] = useState<string>("");
  const [customExercise, setCustomExercise] = useState<string>("");
  const [isCustom, setIsCustom] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem("exerciseOptions");
    if(stored) {
      setExerciseOptions(JSON.parse(stored));
    } else {
      setExerciseOptions([
        "Pull Ups",
        "Assisted Pull Ups",
        "Bench Press",
        "Biceps Curls",
        "Hip Thrusts",
        "Deep Squats",
        "Planks",
        "Push Ups",
        "Finger Max Hangs",
        "Finger Sub-max Hangs",
        "Ab Rollout",
        "Weighted oblique Twist",
        "Crunch",
        "Reverse Crunch"
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exerciseOptions", JSON.stringify(exerciseOptions));
  }, [exerciseOptions]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustom(true);
      setExercise("");
      onChange("");
    } else {
      setIsCustom(false);
      setExercise(value);
      onChange(value);
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomExercise(e.target.value);
  };

  const handleBlurCustom = () => {
    if (customExercise && !exerciseOptions.includes(customExercise)) {
      setExerciseOptions(prev => [...prev, customExercise]);
    }
    setExercise(customExercise);
    onChange(customExercise);
  };

  return (
    <div className="exercise-input">
      {!isCustom ? (
        <FormControl sx={{m: 1, minWidth: 223}} size="small">
          <InputLabel id="select-small-label">Exercise</InputLabel>
          <Select
            labelId="select-small-label"
            value={exercise}
            onChange={handleChange}
            label="Exercise"
          >
            <MenuItem value="">Chose an Exercise</MenuItem>
            {exerciseOptions.map(opt => (
              <MenuItem key={opt} value={opt}>{opt}</MenuItem>
            ))}
            <MenuItem style={{backgroundColor: "rgba(3, 255, 3, 0.35)"}} value="custom">New ...</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <TextField
          label="New..."
          variant="outlined"
          size="small"
          value={customExercise}
          onChange={handleCustomChange}
          onBlur={handleBlurCustom}
          placeholder="Insert new Exercise"
        />
      )}
    </div>
  );
}
