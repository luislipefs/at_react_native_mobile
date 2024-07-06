import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

export const colors = {
  primary: '#2196F3', 
  secondary: '#f50', 
  background: '#f4f4f4',
  red: "red",
  text: '#333',
  card: '#fff', 
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    padding: 20,
    marginBottom: 10,
    borderRadius: 8, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3, 
    elevation: 3,
  },
  Button:{
    padding: 10
  }
 }
);