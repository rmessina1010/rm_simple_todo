import { createStore } from 'redux';
import { toDoReducer } from './reducers';
import data from '../shared/data';

// import { persistStore} from 'redux-persist';
//import storage from 'redux-persist/es/storage'

// const config = {
//     key: 'root',
//     storage: storage,
//     debug: true
// }

const ConfigureStore = () => {
    const store = createStore(toDoReducer, data);
    //const persistor = persistStore(store)
    //return { persistor, store };
    return store;
}

export default ConfigureStore;