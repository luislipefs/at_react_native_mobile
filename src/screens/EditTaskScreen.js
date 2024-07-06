import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { globalStyles, colors} from '../../styles';
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

       <Button style={globalStyles.Button} title="Excluir" onPress={() => onDelete(task.id)} color={colors.red} />
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
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
  },
  picker: {
    height: 40,
    width: '100%',
  }
});


export default EditTaskScreen;