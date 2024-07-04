import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../styles';
import api from '../../api';
import TaskForm from '../components/TaskForm';
import useTaskStore from '../../store';

const CreateTaskScreen = ({ navigation }) => {
  const addTask = useTaskStore((state) => state.addTask); 

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/tasks', values);
      addTask(response.data);
      navigation.goBack(); 
      console.log("Navegando de volta...");
      // navigation.goBack();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      console.error('Erro ao criar tarefa:', error.response);
    }
  };

  return (
    <View style={globalStyles.container}>
      <TaskForm
        initialValues={{ title: '', description: '', step: 'Para fazer' }}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default CreateTaskScreen;