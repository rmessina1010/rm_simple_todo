import React from 'react';
import { ActivityIndicator, StyleSheet, View, Text } from 'react-native'

function Loading() {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size='large' color='#45B101' />
            <Text style={styles.loadingText}>Loading . . .</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        color: '#45B101',
        fontSize: 14,
        fontWeight: 'bold'
    }
});

export default Loading;