import React from 'react'
import {ExerciseRecord} from "../../entities/ExerciseRecord";
import './ContentBox.css'

interface ContentBoxProps {
  content: ExerciseRecord;
}

const ReadContentBox: React.FC<ContentBoxProps> = ({content}) => {
  const [record, setRecord] = React.useState<ExerciseRecord>(content);

  return (
    <div className="contentBox">
      <p>Exercise: {record.exercise}</p>
      <p>Weight: {record.weight}</p>
      <p>Repeats: {record.repeats}</p>
      <p>Sets: {record.sets}</p>
    </div>
  );
}

export default ReadContentBox;
