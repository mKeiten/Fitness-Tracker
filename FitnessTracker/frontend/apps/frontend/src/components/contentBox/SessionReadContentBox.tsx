import React from 'react'
import {Session} from "../../entities/Session"
import './ContentBox.css'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import {ExerciseRecord} from "../../entities/ExerciseRecord";
import SessionUpdateContentBox from "./SessionUpdateContentBox";

interface ContentBoxProps {
  onDeleteExercise: (sessionId: number, exerciseId: number) => void;
  content: Session;
  onSubmit: (session: Session) => void;
}

const ReadContentBox: React.FC<ContentBoxProps> = ({onDeleteExercise, content, onSubmit}) => {

  const [session] = React.useState<Session>(content);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleExerciseDelete = (exercise: ExerciseRecord) => {
    if(confirm('Are you sure you want to delete the exercise ' + exercise.exercise + '?')) {
      onDeleteExercise(session.id, exercise.id);
    }
  };


  const sessionDate = new Date(content.date)
  return (

    <div className="contentBox">
      {isEditing ? (
        <SessionUpdateContentBox onSubmit={(updatedSession) => {
          onSubmit(updatedSession);
          setIsEditing(false);
        }} content={content} />
      ) : (
        <details>
          <summary>
            <strong>Date:</strong> {sessionDate.toLocaleDateString()}
            <IconButton aria-label="edit" onClick={() => setIsEditing(true)}>
              <EditIcon/>
            </IconButton>
          </summary>
          {content.exercises.map((record) => (
            <div key={record.id} className="exerciseRecords">
              <p>Exercise: {record.exercise}
                <IconButton aria-label="delete" onClick={() => handleExerciseDelete(record)}>
                  <DeleteIcon/>
                </IconButton>
              </p>
              <p>Weight: {record.weight} kg</p>
              <p>Repeats: {record.repeats}</p>
              <p>Sets: {record.sets}</p>
            </div>
          ))}
        </details>
      )}


    </div>
  );
}

export default ReadContentBox;
