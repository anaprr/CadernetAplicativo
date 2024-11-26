import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput, FlatList } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import Recomendacao from './Recomendacao';

const Usuario = () => {

  //pra fazer o botão de exibir informaçao*//

  const [mostrarHistorico, setMostrarHistorico] = useState(false);
  const [mostrarPendentes, setMostrarPendentes] = useState(false);
  const [mostrarObservacao, setMostrarObservacao] = useState(false);
  const exibirHistorico = () => setMostrarHistorico(!mostrarHistorico);
  const exibirPendentes = () => setMostrarPendentes(!mostrarPendentes);
  const exibirObservacao = () => setMostrarObservacao(!mostrarObservacao);

  //para enviar avaliação pro banco*//

  const [avaliacaoDor, setAvaliacaoDor] = useState("")
  const [avaliacaoEfeitoColateral, setAvaliacaoEfeitoColateral] = useState("")
  const [avaliacaoVezesTeveDoença, setAvaliacaoVezesTeveDoença] = useState("")
  const [vacinaId, setVacinaId] = useState("")
  const [usuarioId, setUsuarioId] = useState("")
  const [sucesso, setSucesso] = useState(false)
  const [vacinas, setVacinas] = useState();

  const { setNovaobs, usuario } = useContext(AuthContext);

  async function NovaOBS() {
    await fetch('http://10.139.75.47:5251/api/Avaliacaos/InsertAvaliacaos', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        avaliacaoDor: avaliacaoDor,
        avaliacaoEfeitoColateral: avaliacaoEfeitoColateral,
        avaliacaoVezesTeveDoença: avaliacaoVezesTeveDoença,
        usuarioId: usuarioId,
        vacinaId: vacinaId,
      })
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }

  async function getVacinas() {
    await fetch('http://10.139.75.47:5251/api/Vacinas/GetAllVacinas/')
      .then(res => res.json())
      .then(json => {
        setVacinas(json);
      })
      .catch(err => setError(true))
  }


  useEffect(() => {
    getVacinas();
  }, [])

  // pra criar select nomes vacinas*/

  return (
    <ScrollView style={css.container}>
      <View style={{ alignItems: 'center' }}>
        <Image style={css.fotouser} source={require('../../assets/usuariofix.png')} />
        <Text style={{ marginTop: 40 }}>{usuario.usuarioNome || 'Nome de usuário não disponível'}</Text>
      </View>

      <View style={{ marginTop: 40, flexDirection: 'row' }}>
        <Text style={{ fontSize: 18 }}>Histórico de vacinas</Text>
        <TouchableOpacity onPress={exibirHistorico}>
          <Image style={{ width: 35, height: 34, marginLeft: 10}} source={require('../../assets/iconseta.png')} />
        </TouchableOpacity>
      </View>
      {mostrarHistorico && (
        <View style={css.infoContainer}>
          <Text style={css.infoText}>Histórico de vacinas:</Text>
          <Text style={css.infoText}>- Vacina 1: COVID-19, 1ª dose</Text>
          <Text style={css.infoText}>- Vacina 2: COVID-19, 2ª dose</Text>
        </View>
      )}

      <View style={{ marginTop: 40, flexDirection: 'row' }}>
        <Text style={{ fontSize: 18 }}>Vacinas pendentes</Text>
        <TouchableOpacity onPress={exibirPendentes}>
          <Image style={{ width: 35, height: 35, marginLeft: 10 }} source={require('../../assets/iconseta.png')} />
        </TouchableOpacity>
      </View>
      {mostrarPendentes && (
        <View style={css.infoContainer}>
          <Text style={css.infoText}>Vacinas pendentes:</Text>
          <Text style={css.infoText}>- Vacina: Gripe, 2024</Text>
          <Text style={css.infoText}>- Vacina: Hepatite B, 3ª dose</Text>
        </View>
      )}

      <View style={{ marginTop: 40, flexDirection: 'row', }}>
        <Text style={{ fontSize: 18 }}>Faça uma observação sobre uma vacina</Text>
        <TouchableOpacity onPress={exibirObservacao}>
          <Image style={{ width: 35, height: 35, marginLeft: 10 }} source={require('../../assets/iconseta.png')} />
        </TouchableOpacity>
      </View>
      {mostrarObservacao && (
        <View style={{
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 50,
          backgroundColor: '#D9F0FF',
          borderRadius: 15,
          height: 450,
        }}>
          <View style={{ marginTop: 10 }}>
            <TextInput style={{ backgroundColor: 'white', width: 320, height: 45, borderRadius: 15, marginTop: 20 }}
              placeholder=" Avaliação da Dor" placeholderTextColor={'gray'} onChangeText={(digitado) => setAvaliacaoDor(digitado)} TextInput={avaliacaoDor}
            />
            <TextInput style={{ backgroundColor: 'white', width: 320, height: 45, borderRadius: 15, marginTop: 20 }}
              placeholder=" Efeito Colateral" placeholderTextColor={'gray'} onChangeText={(digitado) => setAvaliacaoEfeitoColateral(digitado)} TextInput={avaliacaoEfeitoColateral}
            />
            <TextInput style={{ backgroundColor: 'white', width: 320, height: 45, borderRadius: 15, marginTop: 20 }}
              placeholder=" Quantas vezes teve a doença" placeholderTextColor={'gray'} onChangeText={(digitado) => setAvaliacaoVezesTeveDoença(digitado)} TextInput={avaliacaoVezesTeveDoença}
            />
            <TextInput style={{ backgroundColor: 'white', width: 320, height: 45, borderRadius: 15, marginTop: 20 }}
              placeholder=" Usuário" placeholderTextColor={'gray'} onChangeText={(digitado) => setUsuarioId(digitado)} TextInput={usuarioId}
            />

            <Picker
              selectedValue={vacinaId}
              onValueChange={(itemValue) => setVacinaId(itemValue)}
              style={{ backgroundColor: 'white', width: 320, height: 5, marginTop: 20 }}
            >
              {vacinas.map((vacina) =>
                <Picker.Item label={vacina.vacinaNome} value={vacina.vacinaId} key={vacina.vacinaId}/>
              )}

            </Picker>
          </View>
          <TouchableOpacity style={{ backgroundColor: '#079EFF', width: "85%", alignItems: 'center', borderRadius: 10, marginTop: 20, height: 50,  }} onPress={NovaOBS}><Text style={{ color: 'white', padding: 14 }}>Enviar nova Avaliação</Text></TouchableOpacity>
        </View>

      )}
    </ScrollView>
  );
};

const css = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,

  },
  fotouser: {
    marginTop: 30,
    width: 160,
    height: 170,
  },
  infoContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#A7DBFF',
    borderRadius: 8,


  },
  infoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
});

export default Usuario;
