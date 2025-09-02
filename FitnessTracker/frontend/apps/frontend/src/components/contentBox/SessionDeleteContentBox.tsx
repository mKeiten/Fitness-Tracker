import React from 'react'
import './ContentBox.css'
import {ExerciseRecord} from "../../entities/ExerciseRecord";
import {Session} from "../../entities/Session";


interface ContentBoxProps {
  onDeleteExercise: (sessionId: number, exerciseId: number) => void;
  onDeleteSession: (sessionId: number) => void;
  content: Session;
}

const DeleteContentBox: React.FC<ContentBoxProps> = ({onDeleteSession, onDeleteExercise, content}) => {
  const [session] = React.useState<Session>(content);

  const handleExerciseDelete = (exercise: ExerciseRecord) => {
    onDeleteExercise(session.id, exercise.id);
  };
  const handleSessionDelete = () => {
    onDeleteSession(session.id);
  };

  const sessionDate = new Date(content.date)
  return (
    <div className="contentBox">
      <div className="contentRow">
        <strong>Date:</strong> {sessionDate.toLocaleDateString()}
        <button onClick={handleSessionDelete} className="deleteButton">Delete Session</button>
      </div>

        {content.exercises.map((record) => (
          <div key={record.id} className="exerciseRecord">
            <p>Exercise: {record.exercise}</p>
            <p>Weight: {record.weight} kg</p>
            <p>Repeats: {record.repeats}</p>
            <p>Sets: {record.sets}</p>
            <button onClick={() => handleExerciseDelete(record)} className="deleteButton">Delete Exercise</button>
          </div>
        ))}

      </div>
      );
}

export default DeleteContentBox;
