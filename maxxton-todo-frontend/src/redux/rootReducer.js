import { GET_TASK_LIST, ADD_TASK, EDIT_TASK, DELETE_TASK } from './actionTypes'

const initialState = {
    taskList: [],
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_LIST:
            let taskListData = [...action.data]
            taskListData.sort((a, b) => {
                let da = new Date(a.CreatedAt);
                let db = new Date(b.CreatedAt);
                return db - da;
            });
        return {
            ...state,
            taskList: taskListData
        }
        case ADD_TASK:
            let updatedDate = [...state.taskList, action.data]
            updatedDate.sort((a, b) => {
                let da = new Date(a.CreatedAt);
                let db = new Date(b.CreatedAt);
                return db - da;
            });
        return {
            ...state,
            taskList: updatedDate
        }
        case EDIT_TASK:
            let editedTaskList = [...state.taskList];
            for(let i = 0; i < editedTaskList.length; i++) {
                if (editedTaskList[i].id === action.data.id) {
                    editedTaskList[i] = action.data
                }
            }
        return {
            ...state,
            taskList: editedTaskList
        }
        case DELETE_TASK:
            let dataForFilter = [...state.taskList];
            let filteredData = dataForFilter.filter(dataForFilters => dataForFilters.id !== action.data)
        return {
            ...state,
            taskList: filteredData
        }
        default: return state
    }
}

export default todoReducer;