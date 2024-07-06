import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { globalStyles, colors } from '../../styles';
import UpdateStepModal from './UpdateStepModal'; 

const TaskCard = ({ task, onDelete, onEdit, onUpdateStep }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStep, setSelectedStep] = useState(task.step);
  
  const handlePreviousStep = () => {
    const steps = ['Para fazer', 'Em andamento', 'Pronto'];
    const currentIndex = steps.indexOf(task.step);
    const newIndex = (currentIndex - 1 + steps.length) % steps.length;
    onUpdateStep(task.id, steps[newIndex]); // Passe o ID da tarefa e o novo estado
  };
  
  const handleNextStep = () => {
    const steps = ['Para fazer', 'Em andamento', 'Pronto'];
    const currentIndex = steps.indexOf(task.step);
    const newIndex = (currentIndex + 1) % steps.length;
    onUpdateStep(task.id, steps[newIndex]); // Passe o ID da tarefa e o novo estado
  };

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

  const handleStepChange = (itemValue) => {
    setSelectedStep(itemValue);
    onUpdateStep(task.id, itemValue);
  };

  const getColorByStep = (step) => {
    switch (step) {
      case 'Para fazer':
        return '#fa4343';
      case 'Em andamento':
        return '#9b84db';
      case 'Pronto':
        return '#5aad5a';
      default:
        return 'gray';
    }
  };

  return (
    <TouchableOpacity 
      onPress={() => onEdit(task.id)} 
      style={[globalStyles.card, styles.cardButton, { backgroundColor: getColorByStep(task.step) }]}
    >
      <View> 
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <View style={styles.stepContainer}>
          <TouchableOpacity 
            onPress={handlePreviousStep} 
            style={styles.arrowButton} 
            hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }} // Área de toque maior
          >
            <Text style={styles.arrowButtonText}>{'<'}</Text> 
          </TouchableOpacity>
          <Text style={styles.stepText}>{task.step}</Text>
          <TouchableOpacity 
            onPress={handleNextStep} 
            style={styles.arrowButton} 
            hitSlop={{ top: 10, bottom: 10, left: 15, right: 15 }} // Área de toque maior
          >
            <Text style={styles.arrowButtonText}>{'>'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: "white",
    marginBottom: 8,
    textShadowColor: '#000',
    textShadowRadius: 2
  },
  description: {
    fontSize: 18,
    color: "white",
    marginBottom: 12,
    textShadowColor: '#000',
    textShadowRadius: 1
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  arrowButton: {
    paddingHorizontal: 20,
    paddingEnd: 30,
    backgroundColor: "white",
    borderRadius: 40,
    elevation: 2,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  stepText: {
    fontSize: 20,
    color: "white", // Cor do texto do estado da tarefa
    textShadowColor: '#000',
    textShadowRadius: 2
  },
  arrowButtonText: {
    color: 'black',
    fontWeight: "bolder",
    fontSize: 30
  },
});

export default TaskCard;