import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Picker } from '@react-native-picker/picker';

export default function Insirir() {

  const { setCadastro } = useContext(AuthContext);

  const [UsuarioNome, setNome] = useState("");
  const [UsuarioEmail, setEmail] = useState("");
  const [UsuarioCpf, setCpf] = useState("");
  const [UsuarioSenha, setSenha] = useState("");
  const [IndicacaoGenero, setIndicacaoGenero] = useState(null);
  const [UsuarioDataNascimento, setDataNascimento] = useState("");
  const [UsuarioIdade, setIdade] = useState("");
  const [FrequenciaVacina, setFrequenciaVacina] = useState(null);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState(false);

  async function Cadastro() {
    try {
      const response = await fetch('http://10.139.75.101:5251/api/Usuarios/InsertUsuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          UsuarioNome: UsuarioNome,
          UsuarioEmail: UsuarioEmail,
          UsuarioCpf: UsuarioCpf,
          UsuarioSenha: UsuarioSenha,
          IndicacaoGeneroId: IndicacaoGenero,
          UsuarioDataNascimento: UsuarioDataNascimento,
          UsuarioIdade: UsuarioIdade,
          FrequenciaVacinaId: FrequenciaVacina
        })
      });

      console.log("Status da resposta:", response.status);

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Resposta JSON:", jsonResponse);
        setSucesso(true);
        setErro(false);
      } else {
        const errorText = await response.text();
        console.log("Erro na resposta:", errorText);
        setErro(true);
        setSucesso(false);
      }
    } catch (err) {
      console.log("Erro na requisição:", err.message);
      setErro(true);
      setSucesso(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'white' }}>
      {sucesso ? (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: 'green', marginBottom: 20 }}>Cadastro realizado com sucesso!</Text>
          <TouchableOpacity style={css.btnCadastro} onPress={() => setCadastro(false)}>
            <Text style={css.btnCadastroText}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={css.logocaixa}>
            <Image source={require("../../assets/logoApp.png")} style={css.logo} />
          </View>
          <View style={css.inputcaixa}>
            <TextInput style={css.input}
              placeholder=" Nome" placeholderTextColor={'white'} onChangeText={(digitado) => setNome(digitado)} value={UsuarioNome}
            />
            <TextInput style={css.input}
              placeholder=" Email" placeholderTextColor={'white'} onChangeText={(digitado) => setEmail(digitado)} value={UsuarioEmail}
            />
            <TextInput style={css.input}
              placeholder=" Cpf" placeholderTextColor={'white'} onChangeText={(digitado) => setCpf(digitado)} value={UsuarioCpf}
            />
            <TextInput style={css.input}
              placeholder=" Senha" placeholderTextColor={'white'} onChangeText={(digitado) => setSenha(digitado)} value={UsuarioSenha}
            />
            <Picker
              selectedValue={IndicacaoGenero}
              onValueChange={(itemValue) => setIndicacaoGenero(itemValue)}
              style={css.input}
            >
              <Picker.Item label="Selecione o Gênero" value="" />
              <Picker.Item label="Feminino" value={1} />
              <Picker.Item label="Masculino" value={2} />
            </Picker>
            <TextInput style={css.input}
              placeholder=" Data de Nascimento" placeholderTextColor={'white'} onChangeText={(digitado) => setDataNascimento(digitado)} value={UsuarioDataNascimento}
            />
            <TextInput style={css.input}
              placeholder=" Idade" placeholderTextColor={'white'} onChangeText={(digitado) => setIdade(digitado)} value={UsuarioIdade}
            />
            <Picker
              selectedValue={FrequenciaVacina}
              onValueChange={(itemValue) => setFrequenciaVacina(itemValue)}
              style={css.input}
            >
              <Picker.Item label="Toma Vacina com Frequência?" value="" />
              <Picker.Item label="Sim" value={1} />
              <Picker.Item label="Não" value={2} />
            </Picker>
          </View>
          {erro && <Text style={{ color: 'red', marginBottom: 10 }}>Erro ao realizar cadastro. Tente novamente.</Text>}
          <TouchableOpacity style={css.btnLogin} onPress={Cadastro}>
            <Text style={css.btnLoginText}>INSERIR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={css.btnCadastro} onPress={() => setCadastro(false)}>
            <Text style={css.btnCadastroText}>Voltar para o Login</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const css = StyleSheet.create({
 
  input: {
    width: "90%",
    height: 50,
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#C2DEF3",
    color: "white",
    marginLeft: 20
  },
  
  inputcaixa: {
    width: "100%",
  
  },
  logocaixa: {
    width: "100%",
    height: 100,

  },
  logo: {
    marginLeft: -15,
    width: "110%",
    height: 400,
    resizeMode: "contain",
    marginTop:-150
  },
  btnLogin: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 35,
    backgroundColor: "white"
},
btnLoginText: {
    color: "#40C2ED",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold"
},
  btnCadastro: {
    width: "90%",
    marginTop: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    
  },
  btnCadastroText: {
    color: "black",
   
  },
  caixatexto: {
    
  },
  textcadastro: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#40C2ED",
    bottom: 16
  },
  Text:{
    top: 5
}
});
