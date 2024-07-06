import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles, colors } from '../../styles';
import api from '../../api';
import TaskList from '../components/TaskList';
import useTaskStore from '../../store';

const TaskListScreen = ({ navigation }) => {
  const { tasks, setTasks } = useTaskStore();
  const [loading, setLoading] = useState(true);
  const [dataUpdated, setDataUpdated] = useState(false); // Nova variável de estado
  const route = useRoute();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await api.get('/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      } finally {
        setLoading(false);
        setDataUpdated(true); // Define a flag como true após buscar os dados
      }
    };

    fetchTasks();
  }, [route.name]);

  const handleUpdateTaskStep = async (taskId, newStep) => {
    try {
      await api.patch(`/tasks/${taskId}/update-step`, { step: newStep });
      setTasks((prevTasks) => 
        prevTasks.map((task) => 
          task.id === taskId ? { ...task, step: newStep } : task
        )
      );
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

  return (
    <View style={globalStyles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <TaskList
          tasks={tasks.filter((task) => {
            switch (route.name) {
              case 'Para Fazer':
                return task.step === 'Para fazer';
              case 'Em Andamento':
                return task.step === 'Em andamento';
              case 'Pronto':
                return task.step === 'Pronto';
              default:
                return true;
            }
          })}
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