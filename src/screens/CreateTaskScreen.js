import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../../styles';
import api from '../../api';
import TaskForm from '../components/TaskForm';

const CreateTaskScreen = ({ navigation }) => {
  const handleSubmit = async (values) => {
    try {
      await api.post('/tasks', values);
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <TaskForm
        initialValues={{ title: '', description: '', step: 'Para Fazer' }}
        onSubmit={handleSubmit}
      />
    </View>
  );
};

export default CreateTaskScreen;