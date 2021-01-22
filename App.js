import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './components/Main';
import { Provider } from 'react-redux';
import ConfigureStore from './redux/configureStore';

const store = ConfigureStore();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Main />
      </View >
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});
