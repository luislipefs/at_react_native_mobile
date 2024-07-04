import React from 'react';
import { FlatList, Text } from 'react-native';
import TaskCard from './TaskCard'; 

const TaskList = ({ tasks, onDelete, onEdit, onMove }) => {
  if (tasks.length === 0) {
    return <Text>Nenhuma tarefa encontrada.</Text>;
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TaskCard task={item} onDelete={() => onDelete(item.id)} onEdit={() => onEdit(item.id)} onMove={() => onMove(item)} />
      )}
    />
  );
};

export default TaskList;