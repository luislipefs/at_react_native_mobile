import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskTabs from './src/navigation/TaskTabs'; // Importe o componente de abas
import CreateTaskScreen from './src/screens/CreateTaskScreen';
import EditTaskScreen from './src/screens/EditTaskScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tarefas" component={TaskTabs} /> 
        <Stack.Screen name="Criar Tarefa" component={CreateTaskScreen} />
        <Stack.Screen name="EditTask" component={EditTaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;