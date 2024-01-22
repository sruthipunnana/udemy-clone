import { combineReducers,createStore } from 'redux'


// state
const initialCourses = {
    data: [],
    loaded: false,
    courseDetails:[]
  };

// create action
export const fetchCourses=(courses)=>({
    type:'FETCH',
    payload:courses
})

export const fetchCourseDetails = (courseDetails) => ({
    type: 'FETCH_COURSE_DETAILS',
    payload: courseDetails,
  });

// create a reducer 
const coursesReducer = (state = initialCourses, action) => {
    switch (action.type) {
      case 'FETCH':
        return {
          ...state,
          data: action.payload,
          loaded: true,
        };
      default:
        return state;
    }
  };

  export const courseDetailsReducer = (state= initialCourses.courseDetails, action) => {
    switch (action.type) {
      case 'FETCH_COURSE_DETAILS':
        return action.payload
      default:
        return state;
    }
  };
  

const combinedReducer= combineReducers({
    courses:coursesReducer,
    courseDetails: courseDetailsReducer,
})

// create a store
export const myStore=createStore(combinedReducer)