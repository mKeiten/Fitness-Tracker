import React from 'react'
import './ContentBox.css'
import {ExerciseRecord} from "../../entities/ExerciseRecord";

interface ContentBoxProps {
  onSubmit: (record: ExerciseRecord) => void;
  content: ExerciseRecord;
}

const UpdateContentBox: React.FC<ContentBoxProps> = ({onSubmit, content}) => {
  const [record, setRecord] = React.useState<ExerciseRecord>(content);

  const handleSubmit = () => {
    onSubmit(record);
  };

  return (
    <div className="contentBox">
      <input
        type="text"
        value={record.exercise}
        onChange={e => setRecord({...record, exercise: e.target.value})}
        placeholder="Exercise Name"
      />
      <input
        type="number"
        value={record.weight}
        onChange={e => setRecord({...record, weight: parseInt(e.target.value)})}
        placeholder="Weight in Kg"
      />
      <input
        type="number"
        value={record.repeats}
        onChange={e => setRecord({...record, repeats: parseInt(e.target.value)})}
        placeholder="Number of Repeats"
      />
      <button onClick={handleSubmit}>Update</button>

    </div>
  );
}

export default UpdateContentBox;
