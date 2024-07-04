import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { globalStyles } from '../../styles';
import api from '../../api';
import TaskList from '../components/TaskList';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleEditTask = (id) => {
    navigation.navigate('EditTask', { id });
  };

  const handleMoveTask = async (task) => {
    try {
      const newStep = getNextStep(task.step);
      await api.patch(`/tasks/${task.id}/update-step`, { step: newStep });
      fetchTasks();
    } catch (error) {
      console.error('Erro ao mover tarefa:', error);
    }
  };

  const getNextStep = (currentStep) => {
    switch (currentStep) {
      case 'Para Fazer':
        return 'Em Andamento';
      case 'Em Andamento':
        return 'Pronto';
      case 'Pronto':
        return 'Para Fazer';
      default:
        return 'Para Fazer';
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
      <TaskList
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
        onMove={handleMoveTask}
      />
    </View>
  );
};

export default TaskListScreen;