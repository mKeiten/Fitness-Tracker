import React from 'react';
import './App.css';
import Container from '../components/container/Container';
import {ExerciseRecord} from "../entities/ExerciseRecord";
import {Session} from "../entities/Session"
import SessionContentBox from "../components/contentBox/SessionContentBox";
import SessionReadContentBox from "../components/contentBox/SessionReadContentBox";
import SessionDeleteContentBox from "../components/contentBox/SessionDeleteContentBox";
import SessionUpdateContentBox from "../components/contentBox/SessionUpdateContentBox";
import Plots from "../components/graphs/ExercisePlot";

export function App() {
  const [records, setRecords] = React.useState<ExerciseRecord[]>([])
  const [sessions, setSessions] = React.useState<Session[]>([])
  const uniqueExercisesNames = Array.from(
    new Set(sessions.flatMap(session => session.exercises.map(ex => ex.exercise)))
  );
  const removeSessionFromState = (sessionId: number) => {
    setSessions(prevSessions => prevSessions.filter(s => s.id !== sessionId));
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/exercises/records", {
      method: "GET"
    }).then(response => {
      if(response.status == 200) {
        return response.json();
      }
      return null;
    }).then(data => {
      if(data !== null) {
        setRecords(data);
      }
    })
  }, [])

  React.useEffect(() => {
    fetch("http://localhost:8080/exercises/sessions", {
      method: "GET"
    }).then(response => {
      if(response.status == 200) {
        return response.json();
      }
      return null;
    }).then(data => {
      if(data !== null) {
        setSessions(data);
      }
    })
  }, [])

  const handleDeleteSubmit = async (sessionId: number, exerciseId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/${sessionId}/exercises/records/${exerciseId}`, {
        method: "DELETE"
      });
      const data = await response.json();
      const session = sessions.find(s => s.id === data.sessionId)
      if (session && session.exercises.length <= 1) {
        removeSessionFromState(sessionId);
      }
      setSessions(prevSessions =>
        prevSessions.map(s =>
          s.id === sessionId
            ? { ...s, exercises: s.exercises.filter(e => e.id !== data.id) }
            : s
        )
      );
    } catch (err) {
      console.error(err);
    }
  }

  const handleSessionDeleteSubmit = (id: number) => {
    fetch(`http://localhost:8080/exercises/sessions/${id}`, {
      method: "DELETE"
    }).then(response => {
      if (response.status == 200) {
        return response.json()
      }
      return null;
    }).then(data => {
      if(data !== null) {
        setSessions(sessions.filter(session => session.id !== data.id));
      }
    });
  }

  const handleUpdateSessionSubmit = (session: Session) => {
    fetch(`http://localhost:8080/exercises/sessions/${session.id}`, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({
        date: session.date.toISOString(),
        exercises: session.exercises.map(ex => ({
          exercise: ex.exercise,
          weight: ex.weight,
          repeats: ex.repeats,
          sets: ex.sets,
          sessionId: ex.sessionId
        }))
      })
    }).then(response => {
      if (response.status == 200) {
        return response.json()
      }
      return null;
    }).then(data => {
      if (data !== null) {
        setSessions(sessions.map(session =>
          session.id === data.id ? data : session
        ));
      }
    });
  }

  const handleCreateSessionSubmit = (session: Session) => {
    fetch("http://localhost:8080/exercises/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date: session.date.toISOString(),
        exercises: session.exercises.map(ex => ({
          exercise: ex.exercise,
          weight: ex.weight,
          repeats: ex.repeats,
          sets: ex.sets,
          sessionId: ex.sessionId
        }))
      })
    })
      .then(postResponse => {
        if (postResponse.status !== 201) {
          console.error("Fehler beim Anlegen der Session:", postResponse.status);
          return Promise.reject("Post fehlgeschlagen");
        }
        return fetch("http://localhost:8080/exercises/sessions");
      })
      .then(getResponse => {
        if (getResponse.status !== 200) {
          console.error("Fehler beim Laden der Sessions:", getResponse.status);
          return Promise.reject("Get fehlgeschlagen");
        }
        return getResponse.json();
      })
      .then((updatedSessions: Session[]) => {
        setSessions(updatedSessions);
      })
      .catch(error => {
        console.error("Fehler beim Speichern/Laden der Sessions:", error);
      });
  };



  return (
    <div className="main-component">

      <div className="read">
        <Container>
          {
            <div>
              <div className="headline">Workouts</div>
              {
                sessions.map(session => <SessionReadContentBox
                  key={`${session.id}`}
                  content={session}
                />)
              }
            </div>
          }
        </Container>
      </div>

      <div  className="create">
        <Container>
          {
            <div>
              <div  className="headline">new workout</div>
              <SessionContentBox onSubmit={handleCreateSessionSubmit}/>
            </div>
          }
        </Container>
      </div>


      <div  className="update">
        <Container>
          {
            <div>
              <details>
                <summary className="more headline">Update</summary>
                {
                  sessions.map(session => <SessionUpdateContentBox
                    key={`${session.id}`}
                    onSubmit={handleUpdateSessionSubmit}
                    content={session}
                  />)
                }
              </details>

            </div>
          }
        </Container>
      </div>

      <div className="delete">
        <Container>
          {
            <div >
              <details>
                <summary className="more headline">Delete</summary>
                {
                  sessions.map(session => <SessionDeleteContentBox
                    key={`${session.id}`}
                    onDeleteSession={handleSessionDeleteSubmit}
                    onDeleteExercise={handleDeleteSubmit}
                    content={session}
                  />)
                }
              </details>
            </div>
          }
        </Container>
      </div>

      <div className="plots headline">
        <Container>
          <div className="headline">Charts</div>
          {
            <div>
              {uniqueExercisesNames.map(name => (
                <Plots key={name} sessions={sessions} exerciseName={name}/>
              ))}
            </div>
          }
        </Container>
      </div>
    </div>
  )
}

export default App;
