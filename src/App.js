import { BrowserRouter,Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { StudentDashboard } from './components/StudentDashboard';
import { CourseDetails } from './components/CourseDetails';

function App() {
  return (
    <BrowserRouter>
    <div className="App" style={{fontFamily:'Roboto'}}>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/courses/:id' element={<CourseDetails/>}/>
      <Route path='/dashboard' element={<StudentDashboard/>}/>
    </Routes>
   </div>
    </BrowserRouter>
    
  );
}

export default App;
