import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles';
import api from '../../api';
import TaskForm from '../components/TaskForm';
import useTaskStore from '../../store';

const EditTaskScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const updateTask = useTaskStore((state) => state.updateTask);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await api.get(`/tasks/${id}`);
      setTask(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await api.put(`/tasks/${id}`, values);
      updateTask(response.data); 
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {task && (
        <TaskForm initialValues={task} onSubmit={handleSubmit} />
      )}
    </View>
  );
};

export default EditTaskScreen;