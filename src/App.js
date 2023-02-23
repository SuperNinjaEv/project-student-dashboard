import './App.css'
import { useState, useEffect } from "react";
import data from "./data/data.json"
import CohortList from './components/CohortList';
import StudentList from './components/StudentList';


function App() {

  const [students, setStudents] = useState(data);
  const [studentTotal, setStudentTotal] = useState(students.length);
  const [cohortId, setCohortId] = useState('All Students');
  const [cohorts, setCohorts] = useState([])
  const [cohortMembers, setCohortMembers] = useState([]);

  // Collects, slices and sorts Cohort Codes into an ARRAY STATE
  let cohortArr = [];
  function handleCohorts() {
    data.map((student) => {
      let stuID = student.cohort.cohortCode.slice(0, -4) + " " + student.cohort.cohortCode.slice(-4);
      if (!cohortArr.includes(stuID)) {
        cohortArr.push(stuID);
      }
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
  }
  useEffect(() => handleCohorts(), [])


  return (
    <div className='app'>
      <header>
        <h1>Student Dashboard</h1>
      </header>
      <div className='lists'>
        <CohortList
        data={data}
        students={students}
        cohorts={cohorts}
        />
        <StudentList
        data={data}
        students={students}
        cohortId={cohortId}
        studentTotal={studentTotal} 
        />
      </div>
    </div>
  );
}

export default App;
