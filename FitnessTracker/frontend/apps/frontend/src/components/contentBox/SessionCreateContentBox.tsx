import React, {useState} from 'react'
import {ExerciseRecord} from "../../entities/ExerciseRecord";
import {Session} from "../../entities/Session"
import ExerciseInput from "../Components/ExerciseInputComponent";
import {FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface SessionContentBoxProps {
  onSubmit: (session: Session) => void;
}

const SessionCreateContentBox: React.FC<SessionContentBoxProps> = ({onSubmit}) => {
  const [exercises, setExercises] = React.useState<Omit<ExerciseRecord, "id" | "sessionId">[]>([]);
  const [isCreating, setIsCreating] = React.useState(false);
  const [date, setDate] = useState<Dayjs | null>(dayjs());

  const handleExercise = () => {
    setExercises(prev => [
      ...prev,
      {exercise: "", weight: 0, repeats: 0, duration: 0, sets: 0}
    ]);
    setIsCreating(true);
  };

  const handleRemoveExercise = () => {
    console.log (exercises.length)
    setExercises(prev => prev.slice(0, -1));
    console.log (exercises.length)
    if(exercises.length === 1) {
      setIsCreating(false);
    }
  };

  const handleChange = (index: number, field: keyof Omit<ExerciseRecord, "id" | "sessionId">, value: string | number) => {
    setExercises(prev => {
      const updated = [...prev];
      updated[index] = {...updated[index], [field]: value};
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!date) {
      alert("Please choose a date!");
      return;
    }
    const newSession: Session = {
      id: 0,
      date: date.toDate(),
      exercises: exercises.map((ex) => ({
        id: 0,
        exercise: ex.exercise,
        weight: ex.weight,
        repeats: ex.repeats,
        duration: ex.duration,
        sets: ex.sets,
        type: ex.type,
        sessionId: 0
      })),
    };

    onSubmit(newSession);
    setExercises([]);
    setDate(dayjs());
    setIsCreating(false);
  };

  return (

    <div className="contentBox">
      <form onSubmit={handleSubmit}>
        <div className="contentRow">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              disableFuture
              value={date}
              onChange={(newValue: Dayjs | null) => setDate(newValue)}
              slotProps={{
                textField: {
                  size: "small",
                  required: true,
                  fullWidth: true,
                },
              }}
              sx={{ m: 1, width: 223 }}
            />
          </LocalizationProvider>
        </div>

        <div className="inputFields">

          {exercises.map((ex, i) => (

            <div key={i}>
              <span className="headlineContainer"><h3 id="subHeadline">Exercise {i + 1}</h3></span>

              <div className="contentRow">
                <FormControl sx={{m: 1, minWidth: 223}} size="small">
                  <InputLabel id="select-small-label" htmlFor={`exerciseType-${i}`}>Exercise Type </InputLabel>
                  <Select
                    labelId="select-small-label"
                    id={`exerciseType-${i}`}
                    onChange={e => handleChange(i, "type", e.target.value)}
                    value={exercises[i]?.type || ""}
                    label="Exercise Type"
                    required
                    variant="standard"
                  >
                    <MenuItem value="">Select Type</MenuItem>
                    <MenuItem value="repeats">Repeats</MenuItem>
                    <MenuItem value="duration">Duration</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="contentRow">
                <ExerciseInput
                  onChange={(value) => handleChange(i, "exercise", value)}
                />
              </div>

              <div className="contentRow">
                <TextField
                  id={`weight-${i}`}
                  label="Weight"
                  size="small"
                  type="number"
                  onChange={e =>
                    handleChange(i, "weight", parseFloat(e.target.value))
                  }
                  slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }
                  }}
                  sx={{ m: 1, width: 223 }}
                  required
                />
              </div>

              {exercises[i]?.type === "repeats" && (
                <div className="contentRow">
                  <TextField
                    id={`repeats-${i}`}
                    label="Reps"
                    type="number"
                    size="small"
                    onChange={e =>
                      handleChange(i, "repeats", parseInt(e.target.value))
                    }
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">reps</InputAdornment>,
                      }
                    }}
                    sx={{ m: 1, width: 223 }}
                    required
                  />
                </div>
              )}

              {exercises[i]?.type === "duration" && (
                <div className="contentRow">
                  <TextField
                    id={`duration-${i}`}
                    label="Duration"
                    type="number"
                    size="small"
                    onChange={e =>
                      handleChange(i, "duration", parseInt(e.target.value))
                    }
                    slotProps={{
                      input: {
                        endAdornment: <InputAdornment position="end">s</InputAdornment>,
                      }
                    }}
                    sx={{ m: 1, width: 223 }}
                    required
                  />
                </div>
              )}

              <div className="contentRow">
                <TextField
                  id={`sets-${i}`}
                  label="Sets"
                  type="number"
                  size="small"
                  onChange={e => {
                    const value = e.target.value;
                    handleChange(i, "sets", value === "" ? "" : Number(value));
                  }}
                  slotProps={{
                    input: {
                      endAdornment: <InputAdornment position="end">s</InputAdornment>,
                    }
                  }}
                  sx={{ m: 1, width: 223 }}
                  required
                />
              </div>
            </div>
          ))}

        </div>
        <div className="buttons">
          <button onClick={handleExercise} id="add" className="addButton">
            Add Exercise
          </button>
          {isCreating ? (
            <button type="button" onClick={handleRemoveExercise} id="remove" className="deleteButton">
              Remove Exercise
            </button>
          ) : null}
        </div>
        {isCreating ? (
          <div className="buttons">
            <button type="submit" id="create" className="addButton">
              Save Session
            </button>
          </div>

        ) : null}
      </form>
    </div>
  );
};
export default SessionCreateContentBox;
