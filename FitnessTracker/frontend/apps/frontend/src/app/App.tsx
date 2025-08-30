import React from 'react';
import './App.css';
import Container from '../components/container/Container';
import {ExerciseRecord} from "../entities/ExerciseRecord";
import ReadContentBox from "../components/contentBox/ReadContentBox";
import CreateContentBox from "../components/contentBox/CreateContentBox";

export function App() {
  const [records, setRecords] = React.useState<ExerciseRecord[]>([])
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

  const handleCreateSubmit = (exercise: string, weight: number, repeats: number) => {
    fetch("http://localhost:8080/exercises/records", {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({exercise: exercise, weight: weight, repeats: repeats})
    }).then(response => {
      if (response.status == 201) {
        return response.json()
      }
      return null;
    }).then(data => {
      if (data !== null) {
        setRecords([...records, data]);
      }
    })
  }

  return (
    <div className="main-component">
      <div>
        <Container>
          {
            <div>
              <h2>Create</h2>
              <CreateContentBox onSubmit={handleCreateSubmit}/>
            </div>
          }
        </Container>
      </div>

      <div>
        <Container>
          {
            <div>
              <h2>Read</h2>
              {
                records.map(record => <ReadContentBox
                  key={`${record.id}`}
                  content={record}/>)
              }
            </div>
          }
        </Container>
      </div>

      <div>
        <Container>
          {
            <div>
              <h2>Update</h2>
            </div>
          }
        </Container>
      </div>

      <div>
        <Container>
          {
            <div>
              <h2>Delete</h2>
            </div>
          }
        </Container>
      </div>
    </div>
  )
}

export default App;
