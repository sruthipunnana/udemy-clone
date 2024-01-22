import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseDetails } from '../../redux';
import { useParams } from 'react-router-dom';
import { myDB } from '../../firebase';
import './index.css'

export const CourseDetails = () => {
    const { id } = useParams();

    const dispatch = useDispatch()
    const courseDetailsList = useSelector((state) => state.courseDetails || []);
    const filtered = courseDetailsList.filter((each) => each.course_id === Number(id))
    const [isSyllabusOpen, setIsSyllabusOpen] = React.useState(false);


    const toggleSyllabus = () => {
        setIsSyllabusOpen(!isSyllabusOpen);
    };

    useEffect(() => {
        const fetchCourseData = async () => {
            const coursesWithSyllabus = [];

            const snapshot = await myDB.collection('course-details').get();

            // Use Promise.all to wait for all asynchronous tasks to complete
            await Promise.all(
                snapshot.docs.map(async (doc) => {
                    const courseData = doc.data();

                    // Accessing the syllabus subcollection
                    const syllabusRef = doc.ref.collection('syllabus');

                    // Fetching syllabus documents
                    const syllabusSnapshot = await syllabusRef.get();
                    const syllabusData = syllabusSnapshot.docs.map((syllabusDoc) => syllabusDoc.data());

                    // Merging syllabus data into the courseData
                    const courseWithSyllabus = {
                        ...courseData,
                        syllabus: syllabusData,
                    };

                    // Add the courseWithSyllabus to the array
                    coursesWithSyllabus.push(courseWithSyllabus);
                })
            );

            // Dispatch the array of courses with syllabus once
            dispatch(fetchCourseDetails(coursesWithSyllabus));
        };

        // Call the async function
        fetchCourseData();
    }, [dispatch]);



    return (
        <div style={{background: 'linear-gradient(to right, pink, white)', }} className='total-container'  >
            {filtered.length === 0 ? (
                <h6>Loading...</h6>
            ) : (
                <div className='main-container'>
                    <div className='image-container'>
                        <img src={filtered[0].thumbnail} className='course-image' alt={filtered[0].name} />
                        <h2 onClick={toggleSyllabus} style={{ cursor: 'pointer', fontSize: '1.2em',marginTop:'0.5em', color:'blue' }}>Syllabus</h2>
                        {isSyllabusOpen && (
                            <div style={{ display: 'flex' }}>
                                {filtered[0].syllabus[0].syllabus.map((each, index) => (
                                    <div key={index} >
                                        <p><span style={{ fontWeight: 'bold' }}>Duration:</span>{each.week}</p>
                                        <p><span style={{ fontWeight: 'bold' }}>Topic:</span>{each.topic}</p>
                                        <p><span style={{ fontWeight: 'bold' }}>Content:</span>{each.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className='details-container'>
                        <h1>{filtered[0].name}</h1>
                        <p><span style={{ fontWeight: 'bold' }}>Instructor:</span> {filtered[0].instructor}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Description:</span>{filtered[0].description}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Enrollment Status:</span> {filtered[0].enrollment}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Duration:</span> {filtered[0].duration} weeks</p>
                        <p><span style={{ fontWeight: 'bold' }}>Schedule:</span> {filtered[0].schedule}</p>
                        <p><span style={{ fontWeight: 'bold' }}>Location:</span> {filtered[0].location}</p>
                        {filtered[0].prerequisites && filtered[0].prerequisites.length > 0 && (
                            <div>
                                <p><span style={{ fontWeight: 'bold' }}>Prerequisites:</span></p>
                                <ul>
                                    {filtered[0].prerequisites.map((prerequisite, index) => (
                                        <li key={index}>{prerequisite}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>


            )}
        </div>
    );
}