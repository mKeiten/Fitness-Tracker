import React from "react";
import {Session} from "../../entities/Session"
import "./ExercisePlot.css"
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {Goal} from "../../entities/Goal";

interface PlotProps {
  sessions: Session[];
  exerciseName: string;
  goals: Goal[];
}

const Plots: React.FC<PlotProps> = ({sessions, exerciseName, goals}) => {

  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const allDatesSet = new Set<string>();

  sortedSessions.forEach(s => {
    allDatesSet.add(new Date(s.date).toISOString().substring(0,10));
  });
  const exerciseGoals = goals.filter(g => g.exercise === exerciseName);
  exerciseGoals.forEach(g => {
    allDatesSet.add(new Date(g.deadline).toISOString().substring(0,10));
  });

  const allDates = Array.from(allDatesSet).sort();

  const data = allDates.map(date => {
    const session = sortedSessions.find(
      s => new Date(s.date).toISOString().substring(0,10) === date
    );
    const exercise = session?.exercises.find(ex => ex.exercise === exerciseName);
    const goalForThisDate = exerciseGoals.find(g => new Date(g.deadline).toISOString().substring(0,10) === date);
    return {
      date,
      weight: exercise ? exercise.weight : null,
      repeats: exercise ? exercise.repeats : null,
      goalWeight: goalForThisDate ? goalForThisDate.targetWeight : null,
      goalRepeats: goalForThisDate ? goalForThisDate.targetRepeats : null
    };
  });

  return(
    <div className="chartContainer">
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1-content"
          id="panel1-header"
          >
        <strong>{exerciseName}</strong>
      </AccordionSummary>
        <Accordion className="plot-details">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Weight in Kg
          </AccordionSummary>
          <AccordionDetails>
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
                  <Line type="monotone" dataKey="goalWeight" stroke="#DAA520" fill="#DAA520" connectNulls/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon/>}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Repeats
          </AccordionSummary>
          <AccordionDetails>
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
                  <Line type="monotone" dataKey="goalRepeats" stroke="#DAA520" fill="#DAA520" connectNulls/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </AccordionDetails>
        </Accordion>
      </Accordion>
    </div>
  )
}

export default Plots;
