import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../styles';
import UpdateStepModal from './UpdateStepModal'; 

const TaskCard = ({ task, onDelete, onEdit, onUpdateStep }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleUpdateStep = (newStep) => {
    onUpdateStep(task.id, newStep);
    handleCloseModal(); 
  };

  return (
    <View style={globalStyles.card}>
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <TouchableOpacity onPress={handleOpenModal} style={globalStyles.stepButton}> 
        <Text>{task.step}</Text>
      </TouchableOpacity>
      <Button title="Editar" onPress={onEdit} />
      <Button title="Excluir" onPress={onDelete} />
      <UpdateStepModal 
        isVisible={isModalVisible} 
        onClose={handleCloseModal} 
        onUpdateStep={handleUpdateStep} 
      />
    </View>
  );
};

export default TaskCard;