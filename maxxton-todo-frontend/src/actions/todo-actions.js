import { GET_TASK_LIST, ADD_TASK } from '../constants/actionTypes'
import axios from 'axios';

export const getTaskList = () => {
    return (dispatch) => {
        axios.get('http://localhost:3000/tasks')
          .then(res => {
            console.log('getTaskList action---->',res.data);
            dispatch({ type: GET_TASK_LIST, data: res.data})
          })
          .catch(error => {
              console.log('error-->', error)
          })
    }
}

export const addTask = (payload) => {
    return (dispatch) => {
        axios.post('http://localhost:3000/tasks', payload)
          .then(res => {
            console.log('addTask action---->',res.data);
            dispatch({ type: ADD_TASK, data: res.data})
          })
          .catch(error => {
              console.log('error-->', error)
          })
    }
}

