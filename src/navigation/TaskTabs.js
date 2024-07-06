import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TaskListScreen from '../screens/TaskListScreen';

const Tab = createMaterialTopTabNavigator();

const TaskTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Todas" component={TaskListScreen} />
      <Tab.Screen name="Para Fazer" component={TaskListScreen} />
      <Tab.Screen name="Em Andamento" component={TaskListScreen} />
      <Tab.Screen name="Pronto" component={TaskListScreen} />
    </Tab.Navigator>
  );
};

export default TaskTabs;