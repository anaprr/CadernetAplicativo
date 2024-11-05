import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={{ uri: 'https://link-da-imagem-do-logo.png' }}
        style={styles.logo}
      />

      {/* Imagem principal */}
      <Image
        source={{ uri: 'https://link-da-imagem-ilustracao.png' }}
        style={styles.mainImage}
      />

      {/* Texto principal */}
      <Text style={styles.text}>
        Cadernet há <Text style={styles.highlight}>25 anos</Text> no mercado
      </Text>

      {/* Botão Saiba Mais */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Saiba mais</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logo: {
    width: 30,
    height: 30,
    marginBottom: 20,
  },
  mainImage: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 20,
  },
  highlight: {
    color: '#00A6ED', // Cor azul para o destaque
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
});
