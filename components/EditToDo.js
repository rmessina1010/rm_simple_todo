import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from './NewToDo';
import { extactDayData, dateString, displayTime } from '../shared/sharedFunctions'

function resetNewToDoState() {
    return {
        title: '',
        details: '',
        date: dateString(new Date(), 'DAY MO DT YR'),
        noTime: true,
        startTime: displayTime(new Date()),
        endTime: displayTime(new Date()),
        showCalendar: false,
        showClock: false,
    }
}


class EditToDo extends Component {
    constructor(props) {
        super(props);
        let theToDo = extactDayData(this.props.screenProps.TODOs, new Date(props.navigation.getParam('date')));
        let itemKey = props.navigation.getParam('key');

        if (theToDo.filter) {
            theToDo = theToDo.filter(item => item.id === itemKey);
            if (!theToDo) { theToDo = resetNewToDoState(); }
            else { theToDo = theToDo[0]; }
        }
        this.state = {
            ...theToDo
        };
        this.clockTarget = 'endTime';
    }

    handleSubmit = (isDelete) => {
        if (isDelete) {
            Alert.alert(
                `Delete: ${this.state.title}`,
                `This action cannot be undone.`,
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        onPress: () => console.log('Cancel Pressed')
                    },
                    {
                        text: 'OK',
                        onPress: () => {
                            this.props.screenProps.deleteToDo(this.props.navigation.getParam('date'), this.props.navigation.getParam('key'));
                            this.props.navigation.pop();
                        }
                    }
                ],
                { cancelable: false }
            );
        } else {
            let originalDateKey = this.props.navigation.getParam('date');
            this.props.screenProps.editToDo(this.state, originalDateKey);
            this.props.navigation.pop();
        }

    }
    static navigationOptions = { title: "Edit To Do" }

    render() {

        return (
            <View>
                <View style={{
                    padding: 15
                }}>
                    <TextInput
                        value={this.state.title}

                        padding={10}
                        marginHorizontal={10}
                        style={styles.textInput}
                        textAlignVertical="top"
                        placeholder="Title"

                        onChangeText={value => this.setState({ title: value })}

                    />
                    <TextInput
                        value={this.state.details}

                        padding={15}
                        marginTop={10}
                        marginHorizontal={10}
                        style={{ ...styles.textInput, fontWeight: 'normal' }}
                        blurOnSubmit={true}
                        textAlignVertical="top"
                        placeholder="Details"
                        numberOfLines={4}
                        multiline={true}

                        onChangeText={value => this.setState({ details: value })}
                    />
                    <View flexDirection='row'>
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={styles.button}
                            onPress={() => this.setState({ showCalendar: true, showClock: false })}
                        >
                            <Text style={styles.buttonText}>{new Date(this.state.date).toLocaleDateString('en-US')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={.6}
                            style={styles.button}
                            onPress={() => this.setState({ noTime: !this.state.noTime, startTime: '11:59 PM', endTime: '11:59 PM' })}
                        >
                            <Text style={styles.buttonText}>{this.state.noTime ? 'All Day' : 'Time Range'}</Text>
                        </TouchableOpacity>

                    </View>
                    {
                        !this.state.noTime ? (<View flexDirection='row'>
                            <TouchableOpacity
                                activeOpacity={.6}
                                style={styles.button}
                                onPress={() => {
                                    this.clockTarget = 'startTime';
                                    this.setState({ showClock: true, showCalendar: false })
                                }
                                }
                            >
                                <Text style={styles.buttonText}>{this.state.startTime} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={.6}
                                style={styles.button}
                                onPress={() => {
                                    this.clockTarget = 'endTime';
                                    this.setState({ showClock: true, showCalendar: false })
                                }
                                }
                            >
                                <Text style={styles.buttonText}>{this.state.endTime}</Text>
                            </TouchableOpacity>
                        </View>) : null

                    }
                    <View flexDirection='row'>
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={{ ...styles.button, backgroundColor: '#45B101' }}
                            onPress={() => this.handleSubmit(false)}
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={styles.button}
                            onPress={() => this.handleSubmit(true)}
                        >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    <View flexDirection='row'>
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={styles.button}
                            onPress={() => this.props.navigation.pop()}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {
                    this.state.showCalendar ?
                        (<DateTimePicker
                            value={new Date(this.state.date)}
                            mode='date'
                            display='default'
                            onChange={(event, selectedDate) => {
                                selectedDate && this.setState({ date: dateString(selectedDate, 'DAY MO DT YR'), showCalendar: false });
                            }}
                            style={styles.formItem}
                        />) : null
                }
                {
                    this.state.showClock ?
                        (<DateTimePicker
                            value={new Date('Jan 1 1970 ' + this.state[this.clockTarget])}
                            mode='time'
                            display='spinner'
                            onChange={(event, selectedTime) => {
                                selectedTime && this.setState({ [this.clockTarget]: displayTime(selectedTime), showClock: false });

                            }}
                            style={styles.formItem}
                        />) : null
                }
            </View >
        );
    }
}


export default EditToDo;