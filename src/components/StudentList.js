import { useState } from "react";
import StudentDetails from "./StudentDetails"

export default function StudentList({ data, students, setStudents, studentTotal, setStudentTotal, cohorts, setCohorts, cohortId, setCohortId, cohortMembers, setCohortMembers }) {

    const [showDetails, setShowDetails] = useState(false);

    function handleShowDetails(stuID) {
        // setShowDetails(!showDetails);
        // console.log(stuID);
        let studentDetails = document.getElementById(stuID);
        let showButton = document.querySelector("button #show");

        if (!studentDetails.style.display) {
            studentDetails.style.display = "grid";
            showButton.innerText = "Show Less...";
        } else if (studentDetails.style.display === "none") {
            studentDetails.style.display = "grid";
            showButton.innerText = "Show Less...";

        } else {
            studentDetails.style.display = "none";
            showButton.innerText = "Show More...";

        }
    }

    function bdayConvert(dob) {
        const birthObj = new Date(dob);
        return (birthObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }))
    }

    function graduationTracking(student) {
        let certs = Object.values(student.certifications).every(value => value === true);
        // console.log(certs)
        if (certs === true && student.codewars.current.total >= 600) {
            return ("On Track to Graduate");
        }
    }

    return (
        <div className="studentList">
            <h3>{cohortId}</h3>
            <p>Total Students: <span className="green">{students.length}</span></p>

            <div className="studentCards">
                {
                    students.map((student) => {
                        return (
                            <section key={student.id} className="card">

                                <img
                                    src="https://i.pravatar.cc/100"
                                    alt={student.names}
                                    className="profilePic" />

                                <div className="basicInfo">
                                    <p><strong>
                                        {student.names.preferredName} {student.names.middleName[0]} {student.names.surname}
                                    </strong></p>
                                    <p>{student.username}</p>
                                    <p><span className="green">Birthday: </span>{bdayConvert(student.dob)}</p>
                                    <button className={student.id} onClick={() => handleShowDetails(student.id)}>
                                        <u><span className="green" id="show">
                                            Show More...
                                        </span></u>
                                    </button>
                                </div>

                                <div className="gradTrack"><span className="green">
                                    {graduationTracking(student)}
                                </span></div>


                                <StudentDetails student={student} />
                            </section>
                        )
                    })
                }
            </div>
        </div>
    )
}