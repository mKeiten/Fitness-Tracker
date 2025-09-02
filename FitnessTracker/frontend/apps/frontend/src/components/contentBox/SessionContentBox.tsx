import React from 'react'
import {ExerciseRecord} from "../../entities/ExerciseRecord";
import {Session} from "../../entities/Session"

interface SessionContentBoxProps {
  onSubmit: (session: Session) => void;
}

const SessionContentBox: React.FC<SessionContentBoxProps> = ({onSubmit}) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [exercises, setExercises] = React.useState<Omit<ExerciseRecord, "id" | "sessionId">[]>([]);


  const handleExercise = () => {
    setExercises(prev => [
      ...prev,
      {exercise: "", weight: 0, repeats: 0, sets: 0}
    ]);
  };

  const handleChange = (index: number, field: keyof Omit<ExerciseRecord, "id" | "sessionId">, value: string | number) => {
    setExercises(prev => {
      const updated = [...prev];
      updated[index] = {...updated[index], [field]: value};
      return updated;
    });
  };

  const handleSubmit = () => {
    const newSession: Session = {
      id: 0,
      date,
      exercises: exercises.map((ex) => ({
        id: 0,
        exercise: ex.exercise,
        weight: ex.weight,
        repeats: ex.repeats,
        sets: ex.sets,
        sessionId: 0
      })),
    };

    onSubmit(newSession);
    setExercises([]);
    setDate(new Date());
  };

  return (
    <div className="contentBox">

      <div className="contentRow">
        <label htmlFor="date">Date:</label>
        <input
          id="date"
          type="date"
          value={date ? date.toISOString().substring(0, 10) : ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDate(new Date(e.target.value))
          }
        />
        <button onClick={handleExercise} id="add" className="addButton">
          Add Exercise
        </button>
      </div>

      <div className="inputFields">

        {exercises.map((ex, i) => (

          <div key={i}>
            <span className="headlineContainer"><h3 id="subHeadline">Exercise {i + 1}</h3></span>

            <div className="contentRow">
              <label htmlFor={`exercise-${i}`}>Exercise:</label>
              <input
                id={`exercise-${i}`}
                type="text"
                value={ex.exercise}
                onChange={e => handleChange(i, "exercise", e.target.value)}
                placeholder="Exercise Name"
              />
            </div>

            <div className="contentRow">
              <label htmlFor={`weight-${i}`}>Weight:</label>
              <input
                id={`weight-${i}`}
                type="number"
                value={ex.weight}
                onChange={e =>
                  handleChange(i, "weight", parseInt(e.target.value) || 0)
                }
                placeholder="Weight in Kg"
              />
            </div>

            <div className="contentRow">
              <label htmlFor={`repeats-${i}`}>Repeats:</label>
              <input
                id={`repeats-${i}`}
                type="number"
                value={ex.repeats}
                onChange={e =>
                  handleChange(i, "repeats", parseInt(e.target.value) || 0)
                }
                placeholder="Number of Repeats"
              />
            </div>

            <div className="contentRow">
              <label htmlFor={`sets-${i}`}>Sets:</label>
              <input
                id={`sets-${i}`}
                type="number"
                value={ex.sets}
                onChange={e =>
                  handleChange(i, "sets", parseInt(e.target.value) || 0)
                }
                placeholder="Number of Sets"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="buttons">

        <button onClick={handleSubmit} id="create" className="addButton">
          Save Session
        </button>
      </div>
    </div>
  );
};

export default SessionContentBox;
