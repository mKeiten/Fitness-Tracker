import React from 'react'
import {Session} from "../../entities/Session"
import './ContentBox.css'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {ExerciseRecord} from "../../entities/ExerciseRecord";
import SessionUpdateContentBox from "./SessionUpdateContentBox";

interface ContentBoxProps {
  onDeleteExercise: (sessionId: number, exerciseId: number) => void;
  onDeleteSession: (sessionId: number) => void;
  content: Session;
  onSubmit: (session: Session) => void;
}

const ReadContentBox: React.FC<ContentBoxProps> = ({onDeleteSession, onDeleteExercise, content, onSubmit}) => {

  const [session] = React.useState<Session>(content);
  const [isEditing, setIsEditing] = React.useState(false);

  const handleExerciseDelete = (exercise: ExerciseRecord) => {
    if(confirm('Are you sure you want to delete the exercise ' + exercise.exercise + '?')) {
      onDeleteExercise(session.id, exercise.id);
    }
  };

  const handleSessionDelete = () => {
    if(confirm('Are you sure you want to delete this workout session?')) {
      onDeleteSession(session.id);
    }
  };


  const sessionDate = new Date(content.date)
  return (
    <div className="workoutBox">

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <div>
            <strong>Date:</strong> {sessionDate.toLocaleDateString()}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          {isEditing ? (
            <SessionUpdateContentBox onSubmit={(updatedSession) => {
              onSubmit(updatedSession);
              setIsEditing(false);
            }} content={content}/>
          ) : (
          <div className="exerciseRecordsContainer">

            {content.exercises.map((record) => (
              <div key={record.id} className="exerciseRecords">
                <p><strong>{record.exercise}</strong></p>
                <div className="exerciseContainer">
                  <span className="attributeContainer">{record.weight} kg</span>
                  {record.type === "repeats" && (
                    <span className="attributeContainer">{record.repeats} reps</span>
                  )}
                  {record.type === "duration" && (
                    <span className="attributeContainer">{record.duration} s</span>
                  )}
                  <span className="attributeContainer">{record.sets} sets</span>

                  <IconButton aria-label="delete" onClick={() => handleExerciseDelete(record)}>
                    <DeleteIcon/>
                  </IconButton>
                </div>
              </div>
            ))}
            <div className="iconContainer">
              <IconButton aria-label="edit" onClick={() => setIsEditing(true)}>
                <EditIcon/>
              </IconButton>
              <IconButton aria-label="delete_forever" onClick={() => handleSessionDelete()}>
                <DeleteForeverIcon/>
              </IconButton>
            </div>
          </div>
          )}
        </AccordionDetails>
      </Accordion>





    </div>
  );
}

export default ReadContentBox;
