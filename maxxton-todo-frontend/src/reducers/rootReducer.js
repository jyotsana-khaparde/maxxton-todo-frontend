import { GET_TASK_LIST, ADD_TASK, EDIT_TASK, DELETE_TASK } from '../constants/actionTypes'

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
        case EDIT_TASK:
            console.log('EDIT_TASK reducer---', action.data);
            console.log('state reducer----', state.taskList)
            let editedTaskList = [...state.taskList];
            for(let i = 0; i < editedTaskList.length; i++) {
                if (editedTaskList[i].id === action.data.id) {
                    editedTaskList[i] = action.data
                }
            }
            console.log('updatedDate reducer found----', editedTaskList);
        return {
            ...state,
            taskList: editedTaskList
        }
        case DELETE_TASK:
            console.log('DELETE_TASK action.data---', action.data);
            let dataForFilter = [...state.taskList];
            let filteredData = dataForFilter.filter(dataForFilters => dataForFilters.id !== action.data)
            console.log('filteredData reducer --->', filteredData);
        return {
            ...state,
            taskList: filteredData
        }
        default: return state
    }
}

export default todoReducer;