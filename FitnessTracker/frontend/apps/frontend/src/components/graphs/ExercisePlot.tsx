import React from "react";
import {Session} from "../../entities/Session"
import "./ExercisePlot.css"
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

interface PlotProps {
  sessions: Session[];
  exerciseName: string;
}

const Plots: React.FC<PlotProps> = ({sessions, exerciseName}) => {

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const startDate = new Date(sortedSessions[0].date);
  const endDate = new Date();
  const allDates: string[] = [];
  for(let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() +1)) {
    allDates.push(new Date(d).toISOString().substring(0,10));
  }

  const data = allDates.map(date => {
    const session = sortedSessions.find(
      s => new Date(s.date).toISOString().substring(0,10) === date
    );
    const exercise = session?.exercises.find(ex => ex.exercise === exerciseName);
    return {
      date,
      weight: exercise ? exercise.weight : null,
      repeats: exercise ? exercise.repeats : null
    };
  });

  return(
    <div className="chartContainer">
      <details className="exercise-details">
        <summary><strong>{exerciseName}</strong></summary>
        <details className="plot-details">
          <summary className="weight-headline">Weight in Kg</summary>
          <div className="plot">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart
                width={800}
                height={200}
                syncId={exerciseName}
                data={data}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="weight" stroke="#8884d8" fill="#8884d8" connectNulls/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </details>

        <details className="plot-details">
          <summary className="repeats-headline">Repeats</summary>
          <div className="plot" >
            <ResponsiveContainer width="100%" height={200} >
              <LineChart
                width={800}
                height={200}
                syncId={exerciseName}
                data={data}
              >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="repeats" stroke="#52BF4B" fill="#52BF4B" connectNulls/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </details>
      </details>
    </div>
  )
}

export default Plots;
