import React from 'react';
import { View, Text, Button } from 'react-native';
import { globalStyles } from '../../styles'; 

const TaskCard = ({ task, onDelete, onEdit, onMove }) => {
  return (
    <View style={globalStyles.card}>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>{task.step}</Text>
      <Button title="Editar" onPress={onEdit} />
      <Button title="Excluir" onPress={onDelete} />
      <Button title="Mover" onPress={onMove} />
    </View>
  );
};

export default TaskCard;