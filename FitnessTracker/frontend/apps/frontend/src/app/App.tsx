import React from 'react';
import './App.css';
import Container from '../components/container/Container';
import {ExerciseRecord} from "../entities/ExerciseRecord";
import ReadContentBox from "../components/contentBox/ReadContentBox";
import CreateContentBox from "../components/contentBox/CreateContentBox";
import DeleteContentBox from "../components/contentBox/DeleteContentBox";
import UpdateContentBox from "../components/contentBox/UpdateContentBox";


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

  const handleDeleteSubmit = (id: number) => {
    fetch(`http://localhost:8080/exercises/records/${id}`, {
      method: "DELETE"
    }).then(response => {
      if (response.status == 200) {
        return response.json()
      }
      return null;
    }).then(data => {
      if(data !== null) {
        setRecords(records.filter(record => record.id !== data.id));
      }
    });
  }

  const handleUpdateSubmit = (recordToUpdate: ExerciseRecord) => {
    fetch(`http://localhost:8080/exercises/records/${recordToUpdate.id}`, {
      method: "PUT",
      headers: {"content-type": "application/json"},
      body: JSON.stringify({exercise: recordToUpdate.exercise, weight: recordToUpdate.weight, repeats: recordToUpdate.repeats})
    }).then(response => {
      if (response.status == 200) {
        return response.json()
      }
      return null;
    }).then(data => {
      if(data !== null) {
        setRecords(records.map(record => (record.id === data.id ?
          {...record, exercise: data.exercise, weight: data.weight, repeats: data.repeats}
          : record)));
      }
    });
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
                  key={`${record.id}-${record.exercise}-${record.weight}-${record.repeats}`}
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
              {
                records.map(record => <UpdateContentBox
                  key={`${record.id}-${record.exercise}-${record.weight}-${record.repeats}`}
                  onSubmit={handleUpdateSubmit}
                  content={record}
                />)
              }

            </div>
          }
        </Container>
      </div>

      <div>
        <Container>
          {
            <div>
              <h2>Delete</h2>
              {
                records.map(record => <DeleteContentBox
                  key={`${record.id}-${record.exercise}-${record.weight}-${record.repeats}`}
                  onSubmit={handleDeleteSubmit}
                  content={record}
                />)
              }
            </div>
          }
        </Container>
      </div>
    </div>
  )
}

export default App;
