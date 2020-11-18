import { GET_TASK_LIST, ADD_TASK } from '../constants/actionTypes'

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
        case ADD_TASK:
            console.log('ADD_TASK reducer---', action.data);
            console.log('state reducer----', state)
            let updatedDate = [...state.taskList, action.data]
            console.log('updatedDate reducer----', updatedDate);
        return {
            ...state,
            taskList: updatedDate
        }
        default: return state
    }
}

export default todoReducer;