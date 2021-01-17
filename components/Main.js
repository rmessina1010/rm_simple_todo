import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { Today, Tomorrow, Overdue } from './ToDo'
import NewToDo from './NewToDo'
import { OnCalendar } from './CalendarSelect'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


const TodayNavigator = createStackNavigator(
    {
        Today: { screen: Today },
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

const AppNavigator = createAppContainer(MainNavigator);

function Main(props) {
    return (
        <View style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
        }} >
            <AppNavigator />
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

export default Main;