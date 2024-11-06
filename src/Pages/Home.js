import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from '../Context/AuthContext';

export default function Home() {

  
  return (
    <View style={css.container}>
      <View style={css.logocaixa}>
      <Image source={require("../../assets/logoApp.png")} style={css.logo} />
    </View>

      
      <View style={css.opcoes}>
      
        <TouchableOpacity style={css.quadrados} >
          <Image
            source={require("../../assets/pessoavacina.png")}
            style={css.icones}
          />
          <Text style={css.texto}>Vacinações</Text>
          
        </TouchableOpacity>

        <TouchableOpacity style={css.quadrados}>
          <Image
            source={require("../../assets/conexoes.png")}
            style={css.icones}
          />
          <Text style={css.texto}>Conexões</Text>
        </TouchableOpacity>

        <TouchableOpacity style={css.quadrados}>
          <Image
            source={require("../../assets/usuariofix.png")}
            style={css.icones}
          />
          <Text style={css.texto}>Perfil do usuário</Text>
        </TouchableOpacity>

        <TouchableOpacity style={css.quadrados}>
          <Image
            source={require("../../assets/sobrenos.png")}
            style={css.icones}
          />
          <Text style={css.texto}>Conheça mais sobre nós</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  superior: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  opcoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  quadrados: {
    width: 150,
    height: 150,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  icones: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logocaixa: {
    width: "100%",
    height: 100,

  },
  logo: {
    marginLeft: -10,
    width: "110%",
    height: 400,
    resizeMode: "contain",
    marginTop:-170
  },
});