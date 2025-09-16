import React from 'react'
import {ExerciseRecord} from "../../entities/ExerciseRecord";
import {Session} from "../../entities/Session"

interface SessionContentBoxProps {
  onSubmit: (session: Session) => void;
}

const SessionCreateContentBox: React.FC<SessionContentBoxProps> = ({onSubmit}) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [exercises, setExercises] = React.useState<Omit<ExerciseRecord, "id" | "sessionId">[]>([]);
  const [isCreating, setIsCreating] = React.useState(false);

  const handleExercise = () => {
    setExercises(prev => [
      ...prev,
      {exercise: "", weight: 0, repeats: 0, sets: 0}
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
    setIsCreating(false);
  };

  return (

    <div className="contentBox">
      <form onSubmit={handleSubmit}>
        <div className="contentRow">
          <label htmlFor="date">Date:</label>
          <input
            id="date"
            type="date"
            max={new Date().toISOString().substring(0, 10)}
            value={date ? date.toISOString().substring(0, 10) : ""}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDate(new Date(e.target.value))
            }
            required
          />
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
                  onChange={e => handleChange(i, "exercise", e.target.value)}
                  placeholder="Exercise Name"
                  required
                />
              </div>

              <div className="contentRow">
                <label htmlFor={`weight-${i}`}>Weight:</label>
                <input
                  id={`weight-${i}`}
                  type="number"
                  onChange={e =>
                    handleChange(i, "weight", parseInt(e.target.value))
                  }
                  placeholder="Weight in Kg"
                  required
                />
              </div>

              <div className="contentRow">
                <label htmlFor={`repeats-${i}`}>Repeats:</label>
                <input
                  id={`repeats-${i}`}
                  type="number"
                  onChange={e =>
                    handleChange(i, "repeats", parseInt(e.target.value))
                  }
                  placeholder="Number of Repeats"
                  required
                />
              </div>

              <div className="contentRow">
                <label htmlFor={`sets-${i}`}>Sets:</label>
                <input
                  id={`sets-${i}`}
                  type="number"
                  onChange={e => {
                    const value = e.target.value;
                    handleChange(i, "sets", value === "" ? "" : Number(value));
                  }}
                  placeholder="Number of Sets"
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
            <button type="button" onClick={handleRemoveExercise} id="remove" className="addButton">
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
