import { GET_TASK_LIST } from '../constants/actionTypes'
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

