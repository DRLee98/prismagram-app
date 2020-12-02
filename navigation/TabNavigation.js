import React from "react";
import { View, Platform, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcon";
import { stackStyles } from "./config";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const stackFactory = (name, initialRoute, customConfig) => (
  <Stack.Navigator>
    <Stack.Screen name={name} component={initialRoute} options={{ ...customConfig, headerStyle: { ...stackStyles } }} />
  </Stack.Navigator>
);

export default () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: "#FAFAFA",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-home" : "md-home"} />
          ),
        }}
      >
        {() =>
          stackFactory("Home", Home, {
            title: "Home",
            headerRight: () => <MessagesLink />,
            headerTitle: () => <Image src={require("../assets/logo.png")} />,
          })
        }
      </Tab.Screen>
      <Tab.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-search" : "md-search"} />
          ),
        }}
      >
        {() =>
          stackFactory("Search", Search, {
            title: "Search",
          })
        }
      </Tab.Screen>
      <Tab.Screen
        name="Add"
        component={View}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("PhotoNavigation");
          },
        })}
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              size={32}
              name={Platform.OS === "ios" ? "ios-add-circle-outline" : "md-add-circle-outline"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={
                Platform.OS === "ios"
                  ? focused
                    ? "ios-heart"
                    : "ios-heart-empty"
                  : focused
                  ? "md-heart"
                  : "md-heart-empty"
              }
            />
          ),
        }}
      >
        {() =>
          stackFactory("Notifications", Notifications, {
            title: "Notifications",
          })
        }
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <NavIcon focused={focused} name={Platform.OS === "ios" ? "ios-person" : "md-person"} />
          ),
        }}
      >
        {() =>
          stackFactory("Profile", Profile, {
            title: "Profile",
          })
        }
      </Tab.Screen>
    </Tab.Navigator>
  );
};
