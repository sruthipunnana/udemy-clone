import React from 'react';
import { myDB } from '../../firebase';

const styles = {
  card: {
    border: '1px solid #ddd',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '16px',
    margin: '16px',
    width: '300px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressBarContainer: {
    width: '100%',
    marginTop: '8px',
    display:'flex',
    position: 'relative',
  },
  progressBar: {
    width: '100%',
    height: '10px',
    borderRadius: '10px',
    marginBottom: '8px',
    backgroundColor:'pink'
  },
  thumbnail: {
    width: '100%',
    height: 'auto',
    marginBottom: '8px',
  },
  completed: {
    backgroundColor: 'purple',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
  },
  dueDate: {
    marginTop: '8px',
  },
};

export const StudentDashboard = () => {
  const [enrolled, setEnrolled] = React.useState([]);

  React.useEffect(() => {
    myDB.collection('students').onSnapshot((snapshot) => {
      const enrolledCourses = snapshot.docs.map((doc) => doc.data());
      setEnrolled(enrolledCourses);
    });
  }, []);

  const handleMarkCompleted = (index) => {
    const updatedEnrolled = [...enrolled];
    updatedEnrolled[index].completed = !updatedEnrolled[index].completed;

    updatedEnrolled[index].progress = updatedEnrolled[index].completed ? 100 : 80;

    setEnrolled(updatedEnrolled);
  };



  return (
    <div style={{ textAlign: 'center', background: 'linear-gradient(to right, pink, white)', height: '100vh', padding: '1em', marginTop: '0em' }}>
      <h1 style={{ fontFamily: 'Roboto', fontSize: '25px', marginBottom: '0px' }}>Sruthi's Enrolled Courses</h1>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        {enrolled.map((student, index) => (
          <div key={index} style={styles.card}>
            <img src={student.thumbnail} alt={student.name} style={styles.thumbnail} />
            <div style={{ textAlign: 'center' }}>
              <h3>{student.name}</h3>
              <p>{student.enrolled}</p>
              <p><span style={{ fontWeight: 'bold' }}>Instructor:</span> {student.instructor}</p>
              <div style={styles.progressBarContainer}>
                <progress value={student.progress} max="100" style={styles.progressBar}></progress>
                {student.completed ? <span style={{ fontSize:'10px', paddingBottom:'15px', marginTop:'0px'}}>100%</span> : <span style={{ fontSize:'10px', paddingBottom:'15px', marginTop:'0px'}}>80%</span>}
              </div>
              <button className='btn btn-parimary'  style={{marginTop:'0px', textDecoration:'underline'}} onClick={() => handleMarkCompleted(index)}>
                {student.completed ? 'Mark as Incomplete' : 'Mark as Completed'}
              </button>
              <p style={styles.dueDate}><span style={{ fontWeight: 'bold' }}>Due Date:</span>{student.duedate && student.duedate.toDate().toLocaleDateString()}</p>
            </div>
            <div style={styles.completed}>{student.completed ? 'Hurray!Completed🎉' : 'In Progress'}</div>
          </div>
        ))}
      </div>
      
    </div>
  );
};
