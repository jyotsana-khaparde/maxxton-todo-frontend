import { GET_TASK_LIST, ADD_TASK, EDIT_TASK, DELETE_TASK } from '../constants/actionTypes'
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
            dispatch({ type: ADD_TASK, data: res.data })
          })
          .catch(error => {
              console.log('error-->', error)
          })
    }
}

export const editTask = (payload) => {
  return (dispatch) => {
      axios.put(`http://localhost:3000/tasks/${payload.id}`, payload)
        .then(res => {
          console.log('editTask action---->',res.data);
          dispatch({ type: EDIT_TASK, data: res.data })
        })
        .catch(error => {
          console.log('error-->', error)
        })
  }
}

export const deleteTask = (id) => {
  return (dispatch) => {
    axios.delete(`http://localhost:3000/tasks/${id}`)
    .then(res => {
        console.log('deleteTask action---->',res.data)
        dispatch({ type: DELETE_TASK, data: id })
    }).catch(error => {
        console.log(error);
    });
  }
}
