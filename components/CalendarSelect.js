import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { ToDoPageContent, getDayItems, dateString } from './ToDo';
import data from '../shared/data';
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

    render(props) {

        const CalendarSection = (
            <View style={{ alignItems: "center", paddingVertical: 20 }}>
                <Button
                    onPress={this.toggleCal}
                    title=' Select Date '
                    color='#5637DD'
                    accessibilityLabel='Tap me to select a reservation date'

                />
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

        return (<ToDoPageContent items={getDayItems(data, this.state.date)} subTitle={this.state.date ? dateString(this.state.date, 'MONTH DT, YEAR') : 'No Date selected!'
        } auxAft={CalendarSection} />);
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
    }
});

