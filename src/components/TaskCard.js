import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { globalStyles, colors } from '../../styles';
import UpdateStepModal from './UpdateStepModal'; 

const TaskCard = ({ task, onDelete, onEdit, onUpdateStep }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStep, setSelectedStep] = useState(task.step);
  const [currentStep, setCurrentStep] = useState(task.step);

  
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

  
  const handlePreviousStep = async () => {
    const steps = ['Para fazer', 'Em andamento', 'Pronto'];
    const currentIndex = steps.indexOf(currentStep);
    const newIndex = (currentIndex - 1 + steps.length) % steps.length;
    const newStep = steps[newIndex];

    try {
      await onUpdateStep(task.id, { step: newStep }); // Correção: adicione { step: newStep }
      setCurrentStep(newStep);
      console.log(task.id);
      console.log(newStep);
    } catch (error) {
      console.error('Erro ao atualizar o estado da tarefa:', error);
      console.error('Resposta da API (erro):', error.response);
    }
  };

  const handleNextStep = async () => {
    const steps = ['Para fazer', 'Em andamento', 'Pronto'];
    const currentIndex = steps.indexOf(currentStep);
    const newIndex = (currentIndex + 1) % steps.length;
    const newStep = steps[newIndex];

    try {
      await onUpdateStep(task.id, { step: newStep }); // Correção: adicione { step: newStep }
      setCurrentStep(newStep);
      console.log(task.id);
      console.log(newStep);
    } catch (error) {
      console.error('Erro ao atualizar o estado da tarefa:', error);
      console.error('Resposta da API (erro):', error.response);
    }
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
  
  console.log(task.step);
  console.log(task.id);

  return (
    <TouchableOpacity 
      onPress={() => onEdit(task.id)} 
      style={[globalStyles.card, styles.cardButton, { backgroundColor: getColorByStep(task.step) }]}
    >
      <View> 
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.description}>{task.description}</Text>
        <Text style={styles.stepLine}>─────────────────────</Text>

        <TouchableOpacity onPress={() => onEdit(task.id)}  style={styles.stepButton}> 
        <Text style={styles.stepText}>👉 {task.step}</Text>
        </TouchableOpacity>

        <View style={styles.buttons}>
        <TouchableOpacity style={styles.deleteButton}  hitSlop={{ top: 20, bottom: 20, left: 25, right: 25 }} onPress={onDelete}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
        </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  stepLine: {
    color: "white",
    fontWeight: "bold"
  },  
  stepText: {
    fontSize: 20,
    color: "white", // Cor do texto do estado da tarefa
    textShadowColor: '#000',
    textShadowRadius: 2,
    fontWeight: "900"
  },
  deleteButtonText:{
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20
  },
  deleteButton:{
    backgroundColor: "red",
    borderRadius: 20,
    width: "40%",
    marginLeft: 190,
    marginBottom: -10
  },
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
  arrowButtonText: {
    color: 'black',
    fontWeight: "bolder",
    fontSize: 30
  },
});

export default TaskCard;