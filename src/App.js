import './App.css'
import { useState, useEffect } from "react";
import data from "./data/data.json"
import CohortList from './components/CohortList';
import StudentList from './components/StudentList';


function App() {

  const [students, setStudents] = useState(data);
  // const [studentTotal, setStudentTotal] = useState(data.length);
  const [cohortId, setCohortId] = useState('All Students');
  const [cohorts, setCohorts] = useState([])

  // On initial component render, useEffect() will run below code
  // Collects, slices and sorts Cohort Codes into an ARRAY STATE
  // Initally had useEffect call function, but was receiving errors on deployment 
  // So instead placed function directly into the useEffect()
  useEffect(() => {
    let cohortArr = [];

    data.map((student) => {
      let stuID = student.cohort.cohortCode;
      if (!cohortArr.includes(stuID)) {
        cohortArr.push(stuID);
      }
      return cohortArr
    })
    const season = ["Spring", "Summer", "Fall", "Winter"];

    cohortArr.sort((a, b) => {
      if (a.slice(-4) !== b.slice(-4)) {
        return (b.slice(-4) - a.slice(-4));
      } else {
        return (season.indexOf(b.slice(0, -5)) - season.indexOf(a.slice(0, -5)));
      }
    })
    setCohorts(cohortArr)
  }, [])

  return (
    <div className='app'>
      <header>
        <h1>Student Dashboard</h1>
      </header>
      <div className='lists'>
        <CohortList
          data={data}
          students={students}
          setStudents={setStudents}
          // setStudentTotal={setStudentTotal}
          cohorts={cohorts}
          setCohortId={setCohortId}
        />
        <StudentList
          students={students}
          cohortId={cohortId}
        />
      </div>
    </div>
  );
}

export default App;
