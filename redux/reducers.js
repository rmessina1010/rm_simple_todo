import * as ActionTypes from './actionTypes';
import { dateString } from '../shared/sharedFunctions'

export const toDoReducer = (state, action) => {
    switch (action.type) {
        case ActionTypes.TODO_STATUS:
            let dateKey = dateString(new Date(action.payload.date), 'MO_DT_YEAR');
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
        default:
            return state;

    }
}