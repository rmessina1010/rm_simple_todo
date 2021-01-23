import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { extactDayData, dateString } from '../shared/sharedFunctions'

///Helper Foos///

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
    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={this.props.zebra} >
                <View style={style.ToDoTimeBox}>
                    {this.props.overdue ? <Text style={style.ToDoDate}>{dateString(new Date(this.props.date), 'MO DT\nYEAR')}</Text> : null}
                    <Text style={style.ToDoTime}>{this.props.startTime}</Text>
                    <Text style={style.ToDoTime}>{this.props.endTime}</Text>
                </View>

                <View style={style.ToDoContent} >
                    <View flex={11} >
                        <Text style={{ fontWeight: 'bold' }}>{this.props.title}</Text>
                        <Text style={style.ToDoDesc}>{this.props.details}</Text>
                    </View>
                    <View flex={1} marginTop={-15} marginBottom={15}>
                        <CheckBox
                            right
                            checked={this.props.status}
                            onPress={() => this.props.updateStatus(this.props.date, this.props.id, !this.props.status)}
                        />
                        <TouchableOpacity
                            activeOpacity={.6}
                            onPress={() => navigate('EditToDo', { date: this.props.date, key: this.props.id })}
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
    const items = props.items.map((item, index) => {
        return (<ToDoItem
            navigation={props.navigation} {...item}
            updateStatus={props.updateStatus}
            overdue={props.overdue}
            key={item.id} zebra={(index % 2 === 0 ? style.ToDoItem : style.ToDoItemDark)} />)
    });
    return (<View>{items}</View>);
}

export function ToDoPageContent(props) {
    return (
        <ScrollView>
            <View padding={10} backgroundColor="#777" >
                {props.subTitle ? (<Text style={{ color: '#fff', textAlign: 'center', fontSize: 13 }}>{props.subTitle}</Text>) : null}
                {props.auxBef}
            </View>
            <ToDoItemList
                updateStatus={props.updateStatus}
                navigation={props.navigation}
                items={props.items}
                overdue={props.overdue}
            />
        </ScrollView>
    );
}

export class Today extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = { title: "Today" }
    render() {
        let today = new Date();
        return (<ToDoPageContent
            navigation={this.props.navigation}
            items={getDayItems(this.props.screenProps.TODOs, today)}
            subTitle={dateString(today, 'MONTH DT, YEAR')}
            updateStatus={this.props.screenProps.updateStatus}
        />);
    }
}

export class Tomorrow extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = { title: "Tomorrow" }
    render() {
        let tommorow = new Date();
        tommorow.setDate(tommorow.getDate() + 1);
        return (<ToDoPageContent
            navigation={this.props.navigation}
            items={getDayItems(this.props.screenProps.TODOs, tommorow)}
            subTitle={dateString(tommorow, 'MONTH DT, YEAR')}
            updateStatus={this.props.screenProps.updateStatus}
        />);
    }
}

export class Overdue extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = { title: "Overdue" }
    render() {
        let now = new Date();
        // console.log(this.props.screenProps);
        return (<ToDoPageContent
            updateStatus={this.props.screenProps.updateStatus}
            navigation={this.props.navigation}
            items={getOverdue(this.props.screenProps.TODOs, now)}
            subTitle={dateString(now, 'Late as of: MONTH DT, YEAR')}
            overdue={true}
        />);
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
    ToDoDate: {
        fontWeight: 'normal',
        fontSize: 13,
        textAlign: 'right',
        color: '#aaa'
    },

});



