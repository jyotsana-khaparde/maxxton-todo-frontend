import { GET_TASK_LIST, ADD_TASK, EDIT_TASK, DELETE_TASK } from './actionTypes'
import axios from 'axios';

type Tpayload = {
  CurrentState: string,
  Description: string,
  DueDate: string,
  CreatedAt?: string,
  DueTime: string,
  Priority: string,
  Title: string,
  id: string
};

export const getTaskList = () => {
    return (dispatch: any) => {
        axios.get('http://localhost:3000/tasks')
          .then(res => {
            dispatch({ type: GET_TASK_LIST, data: res.data})
          })
          .catch(error => {
              console.log(error)
          })
    }
}

export const addTask = (payload: Tpayload) => {
    return (dispatch: any) => {
        axios.post('http://localhost:3000/tasks', payload)
          .then(res => {
            dispatch({ type: ADD_TASK, data: res.data })
          })
          .catch(error => {
              console.log(error)
          })
    }
}

export const editTask = (payload: Tpayload) => {
  return (dispatch: any) => {
      axios.put(`http://localhost:3000/tasks/${payload.id}`, payload)
        .then(res => {
          dispatch({ type: EDIT_TASK, data: res.data })
        })
        .catch(error => {
          console.log(error)
        })
  }
}

export const deleteTask = (payload: string) => {
  return (dispatch: any) => {
    axios.delete(`http://localhost:3000/tasks/${payload}`)
    .then(res => {
        dispatch({ type: DELETE_TASK, data: payload })
    }).catch(error => {
        console.log(error);
    });
  }
}
