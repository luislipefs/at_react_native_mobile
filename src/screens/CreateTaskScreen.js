import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
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
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Nova Tarefa</Text>
      <TaskForm
        initialValues={{ title: '', description: '', step: 'Para fazer' }} // Valor inicial para step
        onSubmit={handleSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    marginRight: 10,
  },
});

export default CreateTaskScreen;