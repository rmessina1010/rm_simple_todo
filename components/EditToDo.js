import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles, displayTime } from './NewToDo';

function resetNewToDoState() {
    return {
        title: '',
        details: '',
        date: new Date(),
        noTime: true,
        startTime: new Date(),
        endTime: new Date(),
        showCalendar: false,
        showClock: false,
    }
}

class EditToDo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...resetNewToDoState()
        };
        this.clockTarget = 'endTime';
    }

    handeSubmit() {
        alert(1);
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

                        onChange={value => this.setState({ title: value })}

                    />
                    <TextInput
                        value={this.state.details}

                        padding={15}
                        marginTop={10}
                        marginHorizontal={10}
                        style={styles.textInput}
                        blurOnSubmit={true}
                        textAlignVertical="top"
                        placeholder="Details"
                        numberOfLines={4}
                        multiline={true}

                        onChange={value => this.setState({ details: value })}
                    />
                    <View flexDirection='row'>
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={styles.button}
                            onPress={() => this.setState({ showCalendar: true })}
                        >
                            <Text style={styles.buttonText}>{this.state.date.toLocaleDateString('en-US')}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            activeOpacity={.6}
                            style={styles.button}
                            onPress={() => this.setState({ noTime: !this.state.noTime, startTime: new Date(), endTime: new Date() })}
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
                                    this.setState({ showClock: true })
                                }
                                }
                            >
                                <Text style={styles.buttonText}>{displayTime(this.state.startTime)} </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={.6}
                                style={styles.button}
                                onPress={() => {
                                    this.clockTarget = 'endTime';
                                    this.setState({ showClock: true })
                                }
                                }
                            >
                                <Text style={styles.buttonText}>{displayTime(this.state.endTime)}</Text>
                            </TouchableOpacity>
                        </View>) : null

                    }
                    <View flexDirection='row'>
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={{ ...styles.button, backgroundColor: '#5637DD' }}
                            onPress={() => this.handeSubmit(false)}
                        >
                            <Text style={styles.buttonText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={styles.button}
                            onPress={() => this.handeSubmit(true)}
                        >
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                { this.state.showCalendar ?
                    (<DateTimePicker
                        value={this.state.date}
                        mode='date'
                        display='default'
                        onChange={(event, selectedDate) => {
                            selectedDate && this.setState({ date: selectedDate, showCalendar: false });
                        }}
                        style={styles.formItem}
                    />) : null
                }
                { this.state.showClock ?
                    (<DateTimePicker
                        value={this.state.date}
                        mode='time'
                        display='spinner'
                        onChange={(event, selectedTime) => {
                            console.log(selectedTime);
                            selectedTime && this.setState({ [this.clockTarget]: selectedTime, showClock: false });
                        }}
                        style={styles.formItem}
                    />) : null
                }
            </View>
        );
    }
}


export default EditToDo;