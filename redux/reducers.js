import * as ActionTypes from './actionTypes';
import { dateString, displayTime } from '../shared/sharedFunctions'

export const toDoReducer = (state, action) => {
    let dateKey;
    switch (action.type) {
        case ActionTypes.TODO_STATUS:
            dateKey = dateString(new Date(action.payload.date), 'MO_DT_YEAR');
            if (state.TODOs[dateKey]) {
                let updated = JSON.parse(JSON.stringify(state.TODOs))
                let isComplete = true;
                let onDay = updated[dateKey].list.map(todo => {
                    if (todo.id !== action.payload.id) {
                        if (isComplete && !todo.status) { isComplete = false; }
                    } else {
                        todo.status = action.payload.status;
                        if (isComplete && !action.payload.status) { isComplete = false; }
                    }
                    return todo
                });

                updated[dateKey].complete = isComplete;
                updated[dateKey].list = onDay;
                return { ...state, TODOs: updated }
            }
            return state;
        case ActionTypes.ADD_TODO:
            dateKey = dateString(new Date(action.payload.todo.date), 'MO_DT_YEAR');
            let newToDo = {
                status: false,
                id: action.payload.nextId,
                title: action.payload.todo.title,
                details: action.payload.todo.details,
                date: dateString(new Date(action.payload.todo.date), 'DAY MO DT YEAR'),
                noTime: action.payload.todo.noTime,
                startTime: displayTime(action.payload.todo.startTime),
                endTime: displayTime(action.payload.todo.endTime)
            };
            let updated = JSON.parse(JSON.stringify(state.TODOs))
            if (!updated[dateKey] || !updated[dateKey].list) {
                updated[dateKey] = {
                    complete: false,
                    list: [newToDo]
                }
            } else {
                updated[dateKey].complete = false;
                updated[dateKey].list.push(newToDo);
                updated[dateKey].list.sort((a, b) => new Date(a.startTime) > new Date(b.startTime));
            }
            // console.log(updated[dateKey], dateKey, action.payload.nextId + 1);
            return { ...state, TODOs: updated, nextId: action.payload.nextId + 1 };
        case ActionTypes.EDIT_TODO:
            updated = JSON.parse(JSON.stringify(state.TODOs));
            let newDateKey = dateString(new Date(action.payload.todo.date), 'MO_DT_YEAR');
            if (!updated[newDateKey]) { updated[newDateKey] = { list: [], complete: true } }
            updated[newDateKey].list = updated[newDateKey].list.filter(todo => todo.id !== action.payload.todo.id);
            updated[newDateKey].list.push(action.payload.todo);
            updated[newDateKey].list.sort((a, b) => new Date(a.startTime) > new Date(b.startTime));
            updated[newDateKey].complete = (updated[newDateKey].complete && action.payload.todo.status);
            if (action.payload.todo.date !== action.payload.originalDate) {// if edit changes dates, delte item from original date.list
                let oldDateKey = dateString(new Date(action.payload.originalDate), 'MO_DT_YEAR');
                updated[oldDateKey].list = updated[oldDateKey].list.filter(todo => todo.id !== action.payload.todo.id);
                updated[oldDateKey].complete = !(updated[dateKey].list.some(todo => !todo.status))
            }
            //  console.log(updated);
            return { ...state, TODOs: updated };
        case ActionTypes.DELETE_TODO:
            dateKey = dateString(new Date(action.payload.date), 'MO_DT_YEAR');
            updated = JSON.parse(JSON.stringify(state.TODOs));
            updated[dateKey].list = updated[dateKey].list.filter(todo => todo.id !== action.payload.id);
            updated[dateKey].complete = !(updated[dateKey].list.some(todo => !todo.status))
            return { ...state, TODOs: updated };
        default:
            return state;

    }
}