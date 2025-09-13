import React from 'react'
import {Session} from "../../entities/Session"
import './ContentBox.css'

interface ContentBoxProps {
  content: Session;
}

const ReadContentBox: React.FC<ContentBoxProps> = ({content}) => {

  const sessionDate = new Date(content.date)
  return (
    <div className="contentBox">

      <details>
        <summary>
            <strong>Date:</strong> {sessionDate.toLocaleDateString()}
        </summary>
        {content.exercises.map((record) => (
          <div key={record.id} className="exerciseRecords">
          <p>Exercise: {record.exercise}</p>
            <p>Weight: {record.weight} kg</p>
            <p>Repeats: {record.repeats}</p>
            <p>Sets: {record.sets}</p>
          </div>
        ))}
      </details>
    </div>
  );
}

export default ReadContentBox;
