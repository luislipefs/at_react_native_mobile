import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { globalStyles} from '../../styles';
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
      const response = await api.patch(`/tasks/${taskId}/update-step`, newStep.step); 
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

  return (
    <View style={globalStyles.container}>
      <View> 
        <Text style={styles.text}>Toque nos cards para editar detalhes ⤵ </Text>
      </View>
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

      <View style={styles.createButtonView}>
        <TouchableOpacity style={styles.createButton} hitSlop={{ top: 20, bottom: 20, left: 25, right: 25 }} onPress={() => navigation.navigate('Criar Tarefa')}>
        <Text style={styles.createButtonText}>Criar Tarefa</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  createButtonView:{
    backgroundColor: "#2196F3",
    borderRadius: 10,

  },
  createButton:{
    backgroundColor: "f50",
    height: 45,

  },
  createButtonText:{
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 5

  },
  text: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: 'bold',
    color: "black",
    marginBottom: 8,
    textShadowColor: '#000',
    textShadowRadius: 2
  }
});

export default TaskListScreen;