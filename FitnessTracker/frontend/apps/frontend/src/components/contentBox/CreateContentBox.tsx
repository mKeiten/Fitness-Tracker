import React from 'react'
import './ContentBox.css'

interface ContentBoxProps {
  onSubmit: (exercise: string, weight: number, repeats: number, sets: number) => void;
}

const CreateContentBox: React.FC<ContentBoxProps> = ({onSubmit}) => {
  const [exercise, setExercise] = React.useState("");
  const [weight, setWeight] = React.useState<number>(0);
  const [repeats, setRepeats] = React.useState<number>(0);
  const [sets, setSets] = React.useState<number>(0);

  const handleSubmit = () => {
    onSubmit(exercise, weight || 0, repeats || 0, sets || 0);
    setExercise("");
    setWeight(0);
    setRepeats(0);
    setSets(1);
  };

  return (
    <div className="contentBox">
      <input
        type="text"
        value={exercise}
        onChange={e => setExercise(e.target.value)}
        placeholder="Exercise Name"
      />
      <input
        type="number"
        value={weight}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(parseInt(e.target.value))}
        placeholder="Weight in Kg"
      />
      <input
        type="number"
        value={repeats}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRepeats(parseInt(e.target.value))}
        placeholder="Number of Repeats"
      />
      <input
        type="number"
        value={sets}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSets(parseInt(e.target.value))}
        placeholder="Number of Sets"
      />
      <button onClick={handleSubmit}>Create</button>

    </div>
  );
}

export default CreateContentBox;
