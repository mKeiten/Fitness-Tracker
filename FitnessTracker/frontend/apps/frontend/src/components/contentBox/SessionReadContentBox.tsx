import * as React from 'react'
import {Session} from "../../entities/Session"
import './ContentBox.css'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEvents from '@mui/icons-material/EmojiEvents'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import {ExerciseRecord} from "../../entities/ExerciseRecord";
import SessionUpdateContentBox from "./SessionUpdateContentBox";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import {Goal} from "../../entities/Goal";

interface ContentBoxProps {
  onDeleteExercise: (sessionId: number, exerciseId: number) => void;
  onDeleteSession: (sessionId: number) => void;
  content: Session;
  onSubmit: (session: Session) => void;
  onUpdateGoal: (goal: Goal) => void;
  onCreateGoal: (goal: Goal) => void;
  goals: Goal[];
}

const ReadContentBox: React.FC<ContentBoxProps> = ({onDeleteSession, onDeleteExercise, content, onSubmit, onUpdateGoal, onCreateGoal, goals}) => {

  const session = content;
  const [isEditing, setIsEditing] = React.useState(false);
  const [openGoalDialogForExerciseId, setOpenGoalDialogForExerciseId] = React.useState<number | null>(null);
  const [goalInput, setGoalInput] = React.useState({
    targetWeight: 0,
    targetRepeats: 0,
    targetDuration: 0,
    targetSets: 0,
    deadline: "",
  });

  const handleGoalInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setGoalInput(prev => ({ ...prev, [name]: value }));
  };

  const handleExerciseDelete = (exercise: ExerciseRecord) => {
    if(confirm('Are you sure you want to delete the exercise ' + exercise.exercise + '?')) {
      onDeleteExercise(session.id, exercise.id);
    }
  };

  const handleOpenGoalDialog = (exerciseId: number) => {
    setOpenGoalDialogForExerciseId(exerciseId);
    setGoalInput({
      targetWeight: 0,
      targetRepeats: 0,
      targetDuration: 0,
      targetSets: 0,
      deadline: ""
    });
  };

  const handleCloseGoalDialog = () => {
    setOpenGoalDialogForExerciseId(null);
    setGoalInput({
      targetWeight: 0,
      targetRepeats: 0,
      targetDuration: 0,
      targetSets: 0,
      deadline: ""
    });
  }

  const handleSubmitGoal = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (openGoalDialogForExerciseId === null) return;

    const exerciseRecord = content.exercises.find(r => r.id === openGoalDialogForExerciseId);
    if (!exerciseRecord) return;

    const existingGoal = goals.find(g => g.exercise === exerciseRecord.exercise);

    const goalPayload: Goal = {
      id: existingGoal?.id,
      exercise: exerciseRecord.exercise,
      targetWeight: Number(goalInput.targetWeight),
      targetRepeats: Number(goalInput.targetRepeats),
      targetDuration: Number(goalInput.targetDuration),
      targetSets: Number(goalInput.targetSets),
      deadline: new Date(goalInput.deadline),
      achieved: false,
    };

    try {
      let updatedGoal: Goal;

      if (existingGoal) {
        const response = await fetch(`http://localhost:8080/exercises/goals/${existingGoal.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(goalPayload),
        });
        if (!response.ok) throw new Error("Failed to update goal");
        updatedGoal = await response.json();
        onUpdateGoal(updatedGoal);
      } else {
        const response = await fetch(`http://localhost:8080/exercises/goals`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(goalPayload),
        });
        if (!response.ok) throw new Error("Failed to create goal");
        updatedGoal = await response.json();
        onCreateGoal(updatedGoal);
      }
      setOpenGoalDialogForExerciseId(null);
    } catch (error) {
      console.error("Error saving goal:", error);
      alert("An error occurred while saving the goal. Check console for details.");
    }
  };

  const isGoalAchieved = (exercise: ExerciseRecord, goal: Goal) => {
    if (!goal) {return false;}
    return (
      (goal.targetWeight == null || (exercise.weight ?? 0) >= goal.targetWeight) &&
      (goal.targetRepeats == null || (exercise.repeats ?? 0) >= goal.targetRepeats) &&
      (goal.targetDuration == null || (exercise.duration ?? 0) >= goal.targetDuration) &&
      (goal.targetSets == null || (exercise.sets ?? 0) >= goal.targetSets)
    );
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
              {content.exercises.map((record) => {

                const exerciseGoals = goals.filter(g => g.exercise === record.exercise);
                console.log("Record exercise:", record.exercise);
                console.log("Goals:", goals);
                console.log("Filtered Goals:", exerciseGoals);
                return (
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
                      <React.Fragment>
                        <IconButton aria-label="emoji_events" onClick={() => handleOpenGoalDialog(record.id)}>
                          <EmojiEvents/>
                        </IconButton>
                        <Dialog open={openGoalDialogForExerciseId === record.id} onClose={handleCloseGoalDialog}>
                          <DialogTitle>Set Goal for {record.exercise}</DialogTitle>
                          <DialogContent>
                            <form onSubmit={handleSubmitGoal} id={`goal-form-${record.id}`}>
                              <TextField
                                margin="dense"
                                label="Target Weight (kg)"
                                type="number"
                                name="targetWeight"
                                fullWidth
                                value={goalInput.targetWeight}
                                onChange={handleGoalInputChange}
                              />
                              <TextField
                                margin="dense"
                                label="Target Repeats"
                                type="number"
                                name="targetRepeats"
                                fullWidth
                                value={goalInput.targetRepeats}
                                onChange={handleGoalInputChange}
                              />
                              <TextField
                                margin="dense"
                                label="Target Duration (s)"
                                type="number"
                                name="targetDuration"
                                fullWidth
                                value={goalInput.targetDuration}
                                onChange={handleGoalInputChange}
                              />
                              <TextField
                                margin="dense"
                                label="Target Sets"
                                type="number"
                                name="targetSets"
                                fullWidth
                                value={goalInput.targetSets}
                                onChange={handleGoalInputChange}
                              />
                              <TextField
                                margin="dense"
                                type="date"
                                name="deadline"
                                fullWidth
                                value={goalInput.deadline}
                                onChange={handleGoalInputChange}
                              />
                            </form>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleCloseGoalDialog}>
                              Cancel
                            </Button>
                            <Button type="submit" form={`goal-form-${record.id}`}>
                              Save
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </React.Fragment>

                    </div>
                    <div className="exerciseRecordsContainer">
                      {exerciseGoals.length > 0 && (
                        <div className="exerciseGoalsContainer">
                          {exerciseGoals.map(goal => {
                            const achieved = isGoalAchieved(
                              content.exercises.find(e => e.exercise === goal.exercise) || record,
                              goal
                            );

                            return (
                              <div key={goal.id} className="exerciseContainer">
                                <span style={{marginRight: "5px", fontWeight: "bold"}}>Goal: </span>{" "}
                                {goal.targetWeight} kg | {goal.targetRepeats} reps | {goal.targetDuration} s
                                | {goal.targetSets} sets | {new Date(goal.deadline).toLocaleDateString()}
                                {achieved ? (
                                  <EmojiEvents sx={{color: "#DAA520", marginLeft: "8px"}}/>
                                ) : ""}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
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
