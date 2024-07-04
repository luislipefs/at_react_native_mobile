import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { globalStyles } from '../../styles';
import api from '../../api';
import TaskList from '../components/TaskList';
import useTaskStore from '../../store';

const TaskListScreen = ({ navigation }) => {
  const { tasks, setTasks, addTask } = useTaskStore();
 // const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
      setLoading(false);
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

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        fetchTasks();
      });

      return unsubscribe;
    }, [navigation])
  );

  if (loading) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : tasks.length === 0 ? (
        <Text>Nenhuma tarefa encontrada.</Text>
      ) : (
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onMove={handleMoveTask}
        />
      )}

      <Button
        title="Criar Tarefa"
        onPress={() => navigation.navigate('Criar Tarefa')}
      />
    </View>
  );
};

export default TaskListScreen;