import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

export default function App() {
  const [toggle, setToggle] = useState (false);
  const handleChangeToggle = () => setToggle (oldToggle => ! oldToggle);

  useEffect (() => {
    //Liga o flash do celular
    Torch.switchState(toggle);}, [toggle]);

  useEffect(() => {
    // Quando o celular for chacoalhado, mudaremos o toggle
     const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => ! oldToggle);
    });

    // Quando essa função vai ser chamada quando componente for desmontado
  return () => subscription.remove();

  }, []);
  
 
  return (
    <View style={toggle ? styles.containerLight : styles.container}>
      <TouchableOpacity onPress = {handleChangeToggle}>
      <Image 
      style = {toggle ? styles.lightingOn : styles.lightingOff}
      source = {
        toggle
        ? require('./assets/eco-light.png')
        : require('./assets/eco-light-off.png')
        }
       />

      <Image 
      style = {styles.dioLogo}
      source = {
        toggle
        ? require('./assets/logo-dio.png')
        : require('./assets/logo-dio-white.png')
        }
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    //expande espaço disponível
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    //expande espaço disponível
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain', //vai se adequar ao espaço
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff: {
    resizeMode: 'contain', //vai se adequar ao espaço
    tintColor: 'white',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  dioLogo: {
    resizeMode: 'contain', //vai se adequar ao espaço
    alignSelf: 'center',
    width: 250,
    height: 150,
  },
});
