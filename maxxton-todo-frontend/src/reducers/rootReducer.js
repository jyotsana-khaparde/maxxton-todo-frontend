import { GET_TASK_LIST } from '../constants/actionTypes'

const initialState = {
    taskList: [],
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_LIST:
            console.log('taskList reducer---', action.data);
        return {
            ...state,
            taskList: action.data
        }
        default: return state
    }
}

export default todoReducer;