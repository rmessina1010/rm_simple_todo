import * as ActionTypes from './actionTypes';

export const updateStatus = (date, id, status) => ({
    type: ActionTypes.TODO_STATUS,
    payload: { id, status, date },
});
