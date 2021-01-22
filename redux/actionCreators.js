import * as ActionTypes from './actionTypes';

export const updateStatus = (date, id, status) => ({
    type: ActionTypes.TODO_STATUS,
    payload: { id, status, date },
});

export const addToDo = (todo, nextId) => ({
    type: ActionTypes.ADD_TODO,
    payload: { todo, nextId },
});

export const deleteToDo = (date, id) => ({
    type: ActionTypes.DELETE_TODO,
    payload: { date, id },
});

export const editToDo = (todo, originalDate) => ({
    type: ActionTypes.EDIT_TODO,
    payload: { todo, originalDate },
});
