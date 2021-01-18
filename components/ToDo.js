import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import data from '../shared/data';
import { displayTime } from './NewToDo';

///Helper Foos///
export function dateString(date, pattern = '') {
    if (!date || !date.getFullYear) { return ''; }
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthAbv = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const dayAbv = ['Sun', 'Mon', 'Tue', 'Wed', 'Thrs', 'Fri', 'Sat'];
    pattern = pattern.replace('YR', date.getFullYear().toString().substr(-2));
    pattern = pattern.replace('YEAR', date.getFullYear().toString());
    pattern = pattern.replace('MONTH', monthNames[date.getMonth()]);
    pattern = pattern.replace('MO', monthAbv[date.getMonth()]);
    pattern = pattern.replace('DAY', dayNames[date.getDay()]);
    pattern = pattern.replace('DY', dayAbv[date.getDay()]);
    pattern = pattern.replace('DT', date.getDate());
    return pattern;
}
export function extactDayData(dataObj, theDate, raw = true) {
    let key = raw ? dateString(theDate, 'MO_DT_YEAR') : theDate;
    let data = dataObj[key] ? [].concat(dataObj[key].list) : [];
    data.sort((a, b) => new Date(a.startTime) < new Date(b.startTime));
    return data;
}

export function getDayItems(items, rawDate) { return extactDayData(items, rawDate); }

function getOverdue(items, rawDate) {
    let overdue = [];
    for (const dateKey in items) {
        if (!items[dateKey].complete) {
            overdue.push(...items[dateKey].list.filter(item => new Date(item.date) <= rawDate && !item.status));
        }
    }
    return overdue;
}

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props }
    }
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={this.props.zebra} >
                <View style={style.ToDoTimeBox} >
                    <Text style={style.ToDoTime}>{this.state.startTime}</Text>
                    <Text style={style.ToDoTime}>{this.state.endTime}</Text>
                </View>

                <View style={style.ToDoContent} >
                    <View flex={11} >
                        <Text style={{ fontWeight: 'bold' }}>{this.state.title}</Text>
                        <Text style={style.ToDoDesc}>{this.state.details}</Text>
                    </View>
                    <View flex={1} marginTop={-15} marginBottom={15}>
                        <CheckBox
                            right
                            checked={this.state.status}
                            onPress={
                                () => {
                                    this.setState({ status: !this.state.status });
                                }
                            }
                        />
                        <TouchableOpacity
                            activeOpacity={.6}
                            onPress={() => navigate('EditToDo', { date: this.state.date, key: this.state.id })}
                        >
                            <Icon name="pencil" type="font-awesome" color="#aaa" />
                        </TouchableOpacity>
                    </View>

                </View>

            </View >
        );
    }
}

export function ToDoItemList(props) {
    const items = props.items.map((item, index) => { return (<ToDoItem navigation={props.navigation} {...item} key={item.id} zebra={(index % 2 === 0 ? style.ToDoItem : style.ToDoItemDark)} />) });
    return (<View>{items}</View>);
}

export function ToDoPageContent(props) {
    return (
        <ScrollView>
            <View padding={10} backgroundColor="#777" >
                {props.subTitle ? (<Text style={{ color: '#fff', textAlign: 'center', fontSize: 13 }}>{props.subTitle}</Text>) : null}
                {props.auxBef}
            </View>
            <ToDoItemList navigation={props.navigation} items={props.items} />
        </ScrollView>
    );
}

export class Today extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = { title: "Today" }
    render(props) {
        let today = new Date();
        return (<ToDoPageContent navigation={this.props.navigation} items={getDayItems(data.TODOs, today)} subTitle={dateString(today, 'MONTH DT, YEAR')} />);
    }
}

export class Tomorrow extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = { title: "Tomorrow" }
    render(props) {
        let tommorow = new Date();
        tommorow.setDate(tommorow.getDate() + 1);
        return (<ToDoPageContent navigation={this.props.navigation} items={getDayItems(data.TODOs, tommorow)} subTitle={dateString(tommorow, 'MONTH DT, YEAR')} />);
    }
}
export class Overdue extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = { title: "Overdue" }
    render(props) {
        let now = new Date();
        return (<ToDoPageContent navigation={this.props.navigation} items={getOverdue(data.TODOs, now)} subTitle={dateString(now, 'Late as of: MONTH DT, YEAR')} />);
    }
}


const style = StyleSheet.create({
    ToDoItem: {
        padding: 15,
        flexDirection: 'row',

    },
    ToDoItemDark: {
        padding: 15,
        flexDirection: 'row',
        backgroundColor: '#ececec'
    },
    ToDoContent: {
        backgroundColor: '#fefefe',
        borderRadius: 5,
        padding: 10,
        flex: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        flexDirection: 'row',

    },
    ToDoTimeBox: {
        paddingTop: 15,
        paddingRight: 10,
        flex: 3,
    },
    ToDoTitleBox: {
        paddingBottom: 0
    },
    ToDoDesc: {
    },
    ToDoTime: {
        fontWeight: 'bold',
        fontSize: 11,
        textAlign: 'right',
        color: '#555'
    },

});



