import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './components/Main';
import { Provider } from 'react-redux';
import ConfigureStore from './redux/configureStore';
import { PersistGate } from 'redux-persist/es/integration/react';
import Loading from './components/Loading';

const { persistor, store } = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={Loading}
        persistor={persistor}
      >
        <View style={styles.container}>
          <Main />
        </View >
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});
