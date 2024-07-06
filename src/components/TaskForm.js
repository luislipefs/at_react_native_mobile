import React, { useState } from 'react';
import { View, Button, TextInput, Text, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { globalStyles, colors } from '../../styles';
import { Formik } from 'formik';
import * as yup from 'yup';

const taskSchema = yup.object({
  title: yup
    .string()
    .required('É necessário informar o título')
    .min(4, 'O título precisa ter pelo menos 4 caracteres')
    .max(64, 'O título pode ter no máximo 64 caracteres'),
  description: yup
    .string()
    .required('É necessário informar a descrição')
    .min(8, 'A descrição precisa ter pelo menos 8 caracteres')
    .max(128, 'A descrição pode ter no máximo 128 caracteres'),
  step: yup
    .string()
    .oneOf(['Para fazer', 'Em andamento', 'Pronto'], 'Valor inválido para "step".'),
});

const TaskForm = ({ initialValues, onSubmit }) => {
  const [selectedStep, setSelectedStep] = useState('Para fazer');

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={(values) => {
        console.log("handleSubmit no TaskForm chamado!", values);
        onSubmit({ ...values, step: selectedStep });
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Título:</Text>
          <TextInput
            style={styles.input}
            placeholder="Título"
            value={values.title}
            onChangeText={handleChange('title')}
          />
          {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}

          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={styles.input}
            placeholder="Descrição"
            value={values.description}
            onChangeText={handleChange('description')}
          />
          {touched.description && errors.description && (
            <Text style={styles.errorText}>{errors.description}</Text>
          )}

         <Text style={styles.label}>Estado:</Text>
         <View style={styles.pickerContainer}>

          <Picker style={styles.picker}
            selectedValue={selectedStep}
            onValueChange={(itemValue) => setSelectedStep(itemValue)}
          >
            <Picker.Item style={styles.picker} color="#f50"  label="Para fazer" value="Para fazer" />
            <Picker.Item style={styles.picker} color="#08c" label="Em andamento" value="Em andamento" />
            <Picker.Item style={styles.picker} color="#17bd17" label="Pronto" value="Pronto" />
          </Picker>
          </View>
          <Button title="Salvar" onPress={handleSubmit} style={styles.button}/>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontSize: 20,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 2,
  },
  pickerContainer: {
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 20,
    borderBlockColor: "black",
    flexDirection: "column"

  },
  label: {
    marginTop: 5,
    fontSize: 16,
    marginRight: 10,
    paddingLeft: 5,
    paddingBottom: 5
  },
  picker: {
    fontSize: 20,
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    paddingLeft: 5
  }
});

export default TaskForm;