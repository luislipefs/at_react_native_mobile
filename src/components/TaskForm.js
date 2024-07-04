import React from 'react';
import { View, Button, TextInput } from 'react-native';
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
    .matches(
      /Para Fazer|Em Andamento|Pronto/,
      'Os passos devem ser "Para Fazer", "Em Andamento" ou "Pronto"'
    ),
});

const TaskForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View>
          <TextInput
            placeholder="Título"
            value={values.title}
            onChangeText={handleChange('title')}
          />
          {touched.title && errors.title && <Text>{errors.title}</Text>}

          <TextInput
            placeholder="Descrição"
            value={values.description}
            onChangeText={handleChange('description')}
          />
          {touched.description && errors.description && (
            <Text>{errors.description}</Text>
          )}

          <Button title="Salvar" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  );
};

export default TaskForm;