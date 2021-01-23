import { createStore } from 'redux';
import { toDoReducer } from './reducers';
import data from '../shared/data';

import { persistStore, persistCombineReducers, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'

const config = {
    key: 'root',
    storage: storage,
    debug: true
}

const ConfigureStore = () => {
    const store = createStore(
        persistReducer(config, toDoReducer),
        data
    );
    const persistor = persistStore(store)
    return { persistor, store };
}

export default ConfigureStore;