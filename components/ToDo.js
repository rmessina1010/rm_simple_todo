import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
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

export function getDayItems(items, rawDate) {
    let filterStr = dateString(rawDate, 'MO DT YEAR');

    return filterStr ? items.filter(item => (!item.date || item.date.indexOf(filterStr) > -1)) : [];
}

function getOverdue(items, rawDate) {
    return items.filter(item => (!item.date || new Date(item.date) <= rawDate));
}

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.state = { ...props }
    }
    render() {
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
                    <View flex={1} marginTop={-15}>
                        <CheckBox
                            right
                            checked={this.state.status}
                            onPress={
                                () => {
                                    this.setState({ status: !this.state.status });
                                }
                            }
                        />
                        <Icon name="pencil" type="font-awesome" color="#aaa" />
                    </View>
                </View>
            </View>
        );
    }
}

export function ToDoItemList(props) {
    const items = props.items.map((item, index) => { return (<ToDoItem {...item} key={item.id} zebra={(index % 2 === 0 ? style.ToDoItem : style.ToDoItemDark)} />) });
    return (<View>{items}</View>);
}

export function ToDoPageContent(props) {
    return (
        <ScrollView>
            <View padding={10} backgroundColor="#777" >
                {props.subTitle ? (<Text style={{ color: '#fff', textAlign: 'center', fontSize: 13 }}>{props.subTitle}</Text>) : null}
                {props.auxBef}
            </View>
            <ToDoItemList items={props.items} />
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
        return (<ToDoPageContent items={getDayItems(data, today)} subTitle={dateString(today, 'MONTH DT, YEAR')} />);
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
        return (<ToDoPageContent items={getDayItems(data, tommorow)} subTitle={dateString(tommorow, 'MONTH DT, YEAR')} />);
    }
}
export class Overdue extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = { title: "Overdue" }
    render(props) {
        let now = new Date();
        return (<ToDoPageContent items={getOverdue(data, now)} subTitle={dateString(now, 'Late as of: MONTH DT, YEAR')} />);
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
        flex: 8,
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
        flex: 2,
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



