import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const App = () => {

  const [inputText, saveInputText] = useState('');
  const [storageName, saveStorageName] = useState('');

  useEffect(()=> {
    getStorageData();
  }, []);

const saveData = async () => {
 try {
    await AsyncStorage.setItem('nombre', inputText);
    saveStorageName(inputText)
 } catch (error) {
    console.log(error);
 }
}

const getStorageData = async () => {
  try {
    const nombre = await AsyncStorage.getItem('nombre');
    saveStorageName(nombre)

  } catch (error) {
    console.log(error);
  }
}

  const deleteData = async () => {
    try {
      await AsyncStorage.removeItem('nombre')
      saveStorageName('')
    } catch (error) {
      console.log((error))
    }
  }

  return ( 
    <>
      <View style={styles.container}>
        { storageName ? <Text> Hola: {storageName}</Text> : null}
        
        <TextInput
          placeholder='Escribe tu Nombre' 
          style={styles.input}
          onChangeText={ text => saveInputText(text)}
          
          />

        <Button 
          title='Guardar'
          color='#333'
          onPress={ () => saveData() }
        />
        {storageName ? (
            <TouchableHighlight 
              onPress={ () => deleteData()}
              style={styles.deleteBtn}>
                <Text style={styles.deleteText}>Eliminar Nombre &times;</Text>
            </TouchableHighlight>
        ) : null}

      </View>
    </>
   );
}


const styles = StyleSheet.create({
  
  container:{
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input:{
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300
  },
  deleteBtn:{
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  deleteText:{
    color:'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300
  }

});

 
export default App;
