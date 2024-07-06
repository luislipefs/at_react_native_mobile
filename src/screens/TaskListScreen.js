import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { globalStyles } from '../../styles';
import api from '../../api';
import TaskList from '../components/TaskList';
import useTaskStore from '../../store';

const TaskListScreen = ({ navigation }) => {
  const { tasks, setTasks, addTask } = useTaskStore();
  const [loading, setLoading] = useState(true);
  const route = useRoute();

  const fetchTasks = async () => {
    setLoading(true); // Inicia o loading antes de buscar os dados
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    } finally {
      setLoading(false); // Finaliza o loading após buscar os dados
    }
  };

  const filteredTasks = (() => {
    switch (route.name) { // Filtra as tarefas com base no nome da aba
      case 'Para Fazer':
        return tasks.filter((task) => task.step === 'Para Fazer');
      case 'Em Andamento':
        return tasks.filter((task) => task.step === 'Em Andamento');
      case 'Pronto':
        return tasks.filter((task) => task.step === 'Pronto');
      default:
        return tasks;
    }
  })();

  const handleUpdateTaskStep = async (taskId, newStep) => {
    try {
      await api.patch(`/tasks/${taskId}/update-step`, { step: newStep });
      fetchTasks();
    } catch (error) {
      console.error('Erro ao atualizar o estado da tarefa:', error);
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
      fetchTasks(); 
    }, [route.name, tasks]) // Adicione 'tasks' aqui!
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
      ) : (
        <TaskList
          tasks={ // Calcula a filtragem aqui, dentro do return
            tasks.filter((task) => {
              switch (route.name) {
                case 'Para Fazer':
                  return task.step === 'Para Fazer';
                case 'Em Andamento':
                  return task.step === 'Em Andamento';
                case 'Pronto':
                  return task.step === 'Pronto';
                default:
                  return true; 
              }
            })
          }
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
          onUpdateStep={handleUpdateTaskStep} 
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