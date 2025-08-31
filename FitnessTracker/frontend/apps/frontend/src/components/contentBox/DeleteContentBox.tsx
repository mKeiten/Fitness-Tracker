import React from 'react'
import './ContentBox.css'
import {ExerciseRecord} from "../../entities/ExerciseRecord";

interface ContentBoxProps {
  onSubmit: (id: number) => void;
  content: ExerciseRecord;
}

const DeleteContentBox: React.FC<ContentBoxProps> = ({onSubmit, content}) => {
  const [record, setRecord] = React.useState<ExerciseRecord>(content);

  const handleSubmit = () => {
    onSubmit(record.id);
  };

  return (
    <div className="contentBox">
      <p>Exercise: {record.exercise}</p>
      <p>Weight: {record.weight}</p>
      <p>Repeats: {record.repeats}</p>
      <button onClick={handleSubmit}>Delete</button>

    </div>
  );
}

export default DeleteContentBox;
