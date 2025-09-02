import React from 'react'
import './ContentBox.css'
import {Session} from "../../entities/Session";

interface ContentBoxProps {
  onSubmit: (session: Session) => void;
  content: Session;
}

const UpdateContentBox: React.FC<ContentBoxProps> = ({onSubmit, content}) => {
  const [session, setSession] = React.useState<Session>({
    ...content,
    exercises: content.exercises?? [],
    date: new Date(content.date)
  });


  const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(session);
  };

  return (
    <div className="contentBox">
      <form onSubmit={handleUpdateSubmit}>
        {session.exercises.map((ex, i) => (
          <div key={i} className="inputFields">

            <div className="contentRow">
              <input
                type="text"
                value={ex.exercise}
                onChange={e => {
                  const updatedExercises = [...session.exercises];
                  updatedExercises[i] = {...updatedExercises[i], exercise: e.target.value};
                  setSession({...session, exercises: updatedExercises});
                }}
                placeholder="Exercise Name"
                required
              />
            </div>

            <div className="contentRow">
              <input
                type="number"
                value={ex.weight ?? ""}
                onChange={e => {
                  const updatedExercises = [...session.exercises];
                  updatedExercises[i] = {...updatedExercises[i], weight: e.target.value === "" ? undefined : Number(e.target.value)};
                  setSession({...session, exercises: updatedExercises});
                }}
                placeholder="Weight in Kg"
                required
              />
            </div>

            <div className="contentRow">
              <input
                type="number"
                value={ex.repeats ?? ""}
                onChange={e => {
                  const updatedExercises = [...session.exercises];
                  updatedExercises[i] = {...updatedExercises[i], repeats: e.target.value === "" ? undefined : Number(e.target.value)};
                  setSession({...session, exercises: updatedExercises});
                }}
                placeholder="Number of Repeats"
                required
              />
            </div>

            <div className="contentRow">
              <input
                type="number"
                value={ex.sets ?? ""}
                onChange={e => {
                  const updatedExercises = [...session.exercises];
                  updatedExercises[i] = {...updatedExercises[i], sets: e.target.value === "" ? undefined : Number(e.target.value)};
                  setSession({...session, exercises: updatedExercises});
                }}
                placeholder="Number of Sets"
                required
              />
            </div>
          </div>
        ))}

        <button type="submit" className="addButton">Update</button>
      </form>
    </div>
);
}

export default UpdateContentBox;
