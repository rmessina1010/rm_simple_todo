import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { displayTime } from '../shared/sharedFunctions'

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
class NewToDo extends Component {
    constructor(props) {
        super(props);
        this.state = resetNewToDoState();
        this.clockTarget = 'endTime';

    }

    handleSubmit() {
        this.props.screenProps.addToDo(this.state, this.props.screenProps.nextId);
        this.setState(resetNewToDoState());
    }

    static navigationOptions = { title: "Create To Do" }

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
                            style={{ ...styles.button, backgroundColor: '#45B101' }}
                            onPress={() => this.handleSubmit()}
                        >
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={.6}
                            style={styles.button}
                            onPress={() => { this.setState(resetNewToDoState()) }}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
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
                            selectedTime && this.setState({ [this.clockTarget]: selectedTime, showClock: false });
                        }}
                        style={styles.formItem}
                    />) : null
                }
            </View>
        );
    }
}




export const styles = StyleSheet.create({
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
        backgroundColor: '#808080'

    },
    buttonText: {
        alignItems: "center",
        color: '#fff'
    },
    textInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#eee',
        borderRadius: 5,
        fontWeight: 'bold'

    }
});

export default NewToDo;