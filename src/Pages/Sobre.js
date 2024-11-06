import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Sobre() {
  const [mostrarmais, setMostrarmais] = useState(false);
  const navigation = useNavigation();

  const abrircaixa = () => {
    setMostrarmais(true);
  };

  const fecharcaixa = () => {
    setMostrarmais(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
        <Image
          source={require("../../assets/logoApp.png")}
          style={styles.logo}
        />
      </TouchableOpacity>

      <Image
        source={require("../../assets/imagemsobre.png")}
        style={styles.imagemprincipal}
      />

      <Text style={styles.text}>
        Cadernet há <Text style={styles.cordiferente}>25 anos</Text> no mercado
      </Text>

      <TouchableOpacity style={styles.button} onPress={abrircaixa}>
        <Text style={styles.buttonText}>Saiba mais</Text>
      </TouchableOpacity>

      {mostrarmais && (
        <View style={styles.caixainfo}>
          <TouchableOpacity style={styles.fecharbotao} onPress={fecharcaixa}>
            <Text style={styles.fecharbotaotexto}>X</Text>
          </TouchableOpacity>
          <Text style={styles.infotexto}>
            O aplicativo facilita a gestão de dados de saúde, substituindo a caderneta de vacinação física. Ele permite o registro online de vacinas e efeitos colaterais, fornecendo informações em tempo real. Isso ajuda a organizar os sistemas de saúde, melhorando o atendimento e corrigindo falhas locais de maneira eficiente.
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logo: {
    width: 300,
    height: 80,
    marginBottom: -30,
    marginLeft: 20,
    marginTop: -20,
  },
  imagemprincipal: {
    width: 900,
    height: 480,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  cordiferente: {
    color: '#00A6ED',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#A7DBFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  caixainfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
    width: '90%',
    alignItems: 'center',
  },
  infotexto: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333333',
    marginTop: 10,
  },
  fecharbotao: {
    position: 'absolute',
    top: 5,
    right: 10,
    padding: 5,
  },
  fecharbotaotexto: {
    fontSize: 18,
    color: '#333333',
    fontWeight: 'bold',
  },
});