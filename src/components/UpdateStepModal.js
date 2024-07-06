import React, { useState } from 'react';
import { View, Text, Modal, Button, StyleSheet } from 'react-native';

const UpdateStepModal = ({ isVisible, onClose, onUpdateStep }) => {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Alterar Estado</Text>
        <Button title="Para Fazer" onPress={() => onUpdateStep('Para Fazer')} />
        <Button title="Em Andamento" onPress={() => onUpdateStep('Em Andamento')} />
        <Button title="Pronto" onPress={() => onUpdateStep('Pronto')} />
        <Button title="Cancelar" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default UpdateStepModal;