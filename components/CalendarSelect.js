import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ToDoPageContent, getDayItems } from './ToDo';

import DateTimePicker from '@react-native-community/datetimepicker';



export class OnCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            showCalendar: false
        }
    }

    toggleCal = () => this.setState({ showCalendar: !this.state.showCalendar });

    setDate = (event, selectedDate) => {
        selectedDate && this.setState({ date: selectedDate, showCalendar: false });
    }
    static navigationOptions = { title: "Calendar" }

    render() {

        const CalendarSection = (
            <View style={{ alignItems: "center", paddingVertical: 0 }}>
                <TouchableOpacity
                    activeOpacity={.6}
                    style={{ ...styles.button, borderWidth: 1, borderColor: '#ccc' }}
                    onPress={this.toggleCal}
                >
                    <Text style={styles.buttonText}>{'Date: ' + this.state.date.toLocaleDateString()}</Text>
                </TouchableOpacity>

                {
                    this.state.showCalendar ?
                        (<DateTimePicker
                            value={this.state.date}
                            mode={'date'}
                            display='default'
                            onChange={this.setDate}
                            style={styles.formItem}
                        />) : null

                }
            </View>
        );

        return (<ToDoPageContent
            navigation={this.props.navigation}
            items={getDayItems(this.props.screenProps.TODOs, this.state.date)}
            subTitle={null} auxBef={CalendarSection}
            updateStatus={this.props.screenProps.updateStatus}
        />);
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 10,
        borderRadius: 5,
        flex: 1,
        backgroundColor: '#5637DD'

    },
    buttonText: {
        alignItems: "center",
        color: '#fff'
    }

});

