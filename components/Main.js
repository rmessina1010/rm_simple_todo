import React from 'react';
import { connect } from 'react-redux';
import { updateStatus, addToDo } from '../redux/actionCreators'

import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Today, Tomorrow, Overdue } from './ToDo'
import NewToDo from './NewToDo'
import EditToDo from './EditToDo'
import { OnCalendar } from './CalendarSelect'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';



const TodayNavigator = createStackNavigator(
    {
        Today: { screen: Today },
        EditToDo: {
            screen: EditToDo,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name='pencil'
                    type='font-awesome'
                    iconStyle={{ color: '#fff', marginLeft: 20 }}
                    onPress={() => navigation.pop()}//return to prev
                />
            })
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD',
            },
            headerTintColor: '#fff',
            headerTitleStyle: style.headerTitle,
            headerLeft: <Icon
                name='clock-o'
                type='font-awesome'
                iconStyle={{ color: '#fff', marginLeft: 20 }}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const TomorrowNavigator = createStackNavigator(
    {
        Tommorrow: { screen: Tomorrow },
        EditToDo: {
            screen: EditToDo,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name='pencil'
                    type='font-awesome'
                    iconStyle={{ color: '#fff', marginLeft: 20 }}
                    onPress={() => navigation.pop()}//return to prev
                />
            })
        },

    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: style.headerTitle,
            headerLeft: <Icon
                name='calendar-plus-o'
                type='font-awesome'
                iconStyle={{ color: '#fff', marginLeft: 20 }}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const OverdueNavigator = createStackNavigator(
    {
        Overdue: { screen: Overdue },
        EditToDo: {
            screen: EditToDo,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name='pencil'
                    type='font-awesome'
                    iconStyle={{ color: '#fff', marginLeft: 20 }}
                    onPress={() => navigation.pop()}//return to prev
                />
            })
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: style.headerTitle,
            headerLeft: <Icon
                name='exclamation-triangle'
                type='font-awesome'
                iconStyle={{ color: '#fff', marginLeft: 20 }}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const CalendarNavigator = createStackNavigator(
    {
        calendar: { screen: OnCalendar },
        EditToDo: {
            screen: EditToDo,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon
                    name='pencil'
                    type='font-awesome'
                    iconStyle={{ color: '#fff', marginLeft: 20 }}
                    onPress={() => navigation.pop()}//return to prev
                />
            })
        },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: style.headerTitle,
            headerLeft: <Icon
                name='calendar'
                type='font-awesome'
                iconStyle={{ color: '#fff', marginLeft: 20 }}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);

const AddToDoNavigator = createStackNavigator(
    {
        Add: { screen: NewToDo },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: style.headerTitle,
            headerLeft: <Icon
                name='plus-square'
                type='font-awesome'
                iconStyle={{ color: '#fff', marginLeft: 20 }}
                onPress={() => navigation.toggleDrawer()}
            />
        })
    }
);
const MainNavigator = createDrawerNavigator(
    {
        Today: {
            screen: TodayNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='clock-o'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Tomorrow: {
            screen: TomorrowNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='calendar-plus-o'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Overdue: {
            screen: OverdueNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='exclamation-triangle'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        Calendar: {
            screen: CalendarNavigator,
            navigationOptions: {
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='calendar'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
        AddToDo: {
            screen: AddToDoNavigator,
            navigationOptions: {
                title: 'New To Do',
                drawerIcon: ({ tintColor }) => (
                    <Icon
                        name='plus-square'
                        type='font-awesome'
                        size={24}
                        color={tintColor}
                    />
                )
            }
        },
    }
);


const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {
    updateStatus: (date, id, status) => updateStatus(date, id, status), //maps to an action creator
    addToDo: (todo, nextId) => addToDo(todo, nextId), //maps to an action creator
};


const AppNavigator = createAppContainer(MainNavigator);

function Main(props) {
    console.log(props.updateStatus, "MAIN")
    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
        }} >
            <AppNavigator screenProps={{
                TODOs: props.TODOs,
                nextId: props.nextId,
                updateStatus: props.updateStatus,
                addToDo: props.addToDo
            }} />
        </View>
    );
}

const style = StyleSheet.create({

    headerTitle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        textTransform: 'uppercase',
        flexGrow: 1,
        textAlign: 'center',
        marginLeft: -40

    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);