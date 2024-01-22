import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { myDB } from '../../firebase'
import { fetchCourses } from '../../redux'
import { NavLink, useNavigate } from 'react-router-dom'

export const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const coursesList = useSelector((state) => state.courses.data || [])
    const loaded = useSelector((state) => state.courses.loaded);
    const [searchTerm, setSearchTerm] = React.useState('');
  

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCourses = coursesList.filter(
        (course) =>
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const clickLogin = () => {
        navigate('/dashboard')
    }
   
    React.useEffect(() => {
        if (!loaded) {
          myDB.collection('courses').onSnapshot((snapshot) => {
            const newCourses = snapshot.docs.map((doc) => doc.data());
            dispatch(fetchCourses(newCourses));
          });
        }
      }, [dispatch, loaded]);




      return (
        <div style={{ background: 'linear-gradient(to right, pink, white)', minHeight: '100vh', padding: '1em' }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Roboto', fontSize: '1.5em', color: 'purple' }}>Welcome to Course-Saga🎯</h1>
                <NavLink to='/dashboard'>
                    <button className='btn btn-info' style={{ color: 'white' }} onClick={clickLogin}>
                        Login
                    </button>
                </NavLink>
            </div>
            <div>
                <h4 style={{ marginLeft: '0px', marginTop: '0.5em', color: 'black', fontFamily: 'Roboto', textAlign: 'center' }}>
                    Get enrolled now!
                </h4>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <input
                        type='search'
                        placeholder='Search🔍'
                        value={searchTerm}
                        onChange={handleSearch}
                        style={{ width: '50vw', height: '3em', padding: '1em', borderRadius: '9px', fontSize: '16px' }}
                    />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', minHeight: '400px', overflowY: 'scroll' }}>
                    {filteredCourses.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        filteredCourses.map((course) => (
                            <NavLink to={`/courses/${course.id}`} style={{ textDecoration: 'none' }} key={course.id}>
                                <div className='card' style={{ width: '18rem', margin: '10px',height: '520px' }}>
                                    <img src={course.thumbnail} className='card-img-top' alt={course.name} />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{course.name}</h5>
                                        <h6 className='card-title' style={{ color: 'gray', fontSize: '12px' }}>
                                            {course.instructor}
                                        </h6>
                                        <p className='card-text'>{course.bio}</p>
                                        <p className='card-text'>{course.price}/-</p>
                                        <p className='card-text'>
                                            Rating: {course.rating > 0 ? '⭐'.repeat(course.rating) : 'No ratings yet'}
                                        </p>
                                    </div>
                                </div>
                            </NavLink>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};