import React from 'react';
import { FlatList, Text } from 'react-native';
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onDelete, onEdit, onUpdateStep }) => { // Removido o parâmetro 'onMove'
  if (tasks.length === 0) {
    return <Text>Nenhuma tarefa encontrada.</Text>;
  }

  return (
    <FlatList
      data={tasks} 
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskCard 
          task={item} 
          onDelete={() => onDelete(item.id)} 
          onEdit={() => onEdit(item.id)} 
          onUpdateStep={() => onUpdateStep(item.id)} 
        />
      )}
    />
  );
};

export default TaskList;