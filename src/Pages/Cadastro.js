import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Picker } from '@react-native-picker/picker';


export default function Insirir() {

  const { setCadastro } = useContext( AuthContext );

    const[ UsuarioNome, setNome] = useState("")
    const[ UsuarioEmail, setEmail] = useState("")
    const[ UsuarioCpf, setCpf] = useState("")
    const[ UsuarioSenha, setSenha] = useState("")
    const[ IndicacaoGenero, setIndicacaoGenero] = useState("")
    const[ UsuarioDataNascimento, setDataNascimento] = useState("")
    const[ UsuarioIdade, setIdade] = useState("")
    const[ FrequenciaVacina, setFrequenciaVacina] = useState("")
    const[sucesso, setSucesso] = useState(false)
    const[erro, setErro] = useState(false)

    async function Cadastro(){
        {
            await fetch('http://10.139.75.101:5251/api/Usuarios/GetAllUsuarios', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify ({
                UsuarioNome: UsuarioNome,
                UsuarioEmail: UsuarioEmail,
                UsuarioCpf: UsuarioCpf,
                UsuarioSenha: UsuarioSenha,
                IndicacaoGenero: IndicacaoGenero,
                UsuarioDataNascimento: UsuarioDataNascimento,
                UsuarioIdade: UsuarioIdade,
                FrequenciaVacina: FrequenciaVacina
                
              })
            })
              .then( res => (res.ok == true) ? res.json() : false)
              .then(json => console.log(json))
              .catch(err => setErro(true))
              
          }
    }

  return (
    <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: '#40C2ED'}}>
        { sucesso ? <Text>CERTO</Text> :
        
        <>

            <View style={css.logocaixa}>
              <Image source={require("../../assets/logo.png")} style={css.logo} />
            </View>
          <View style={css.caixatexto}>
            <Text style={css.textcadastro}>Cadastre-Se</Text>
          </View>
          <View style={css.inputcaixa}>
        <TextInput style={css.input}
            placeholder=" Nome" placeholderTextColor={'white'} onChangeText={(digitado) => setNome(digitado)} TextInput={UsuarioNome}
        />
        <TextInput style={css.input}
            placeholder=" Email" placeholderTextColor={'white'} onChangeText={(digitado) => setEmail(digitado)} TextInput={UsuarioEmail}
        />
        <TextInput style={css.input}
            placeholder=" Cpf" placeholderTextColor={'white'} onChangeText={(digitado) => setCpf(digitado)} TextInput={UsuarioCpf}
        />
        <TextInput style={css.input}
            placeholder=" Senha" placeholderTextColor={'white'} onChangeText={(digitado) => setSenha(digitado)} TextInput={UsuarioSenha}
        />

      <Picker
            selectedValue={IndicacaoGenero}
            onValueChange={(itemValue, itemIndex) => setIndicacaoGenero(itemValue)}
            style={css.input}
        >
        <Picker.Item label="Selecione o Gênero" value=""   />
        <Picker.Item label="Feminino" value="Feminino" />
        <Picker.Item label="Masculino" value="Masculino" />
      </Picker>
      
        <TextInput style={css.input}
            placeholder=" Data de Nascimento" placeholderTextColor={'white'} onChangeText={(digitado) => setDataNascimento(digitado)} TextInput={UsuarioDataNascimento}
        />
        <TextInput style={css.input}
            placeholder=" Idade" placeholderTextColor={'white'} onChangeText={(digitado) => setIdade(digitado)} TextInput={UsuarioIdade}
        />
        <Picker
            selectedValue={FrequenciaVacina}
            onValueChange={(itemValue, itemIndex) => setFrequenciaVacina(itemValue)}
            style={css.input}
        >
        <Picker.Item label="Toma Vacina com Frequencia?" value="" />
        <Picker.Item label="Sim" value="Sim" />
        <Picker.Item label="Não" value="Não" />
        </Picker>

        </View>
        </> 
        }
        { erro && <Text>ERRADO</Text>}

      <TouchableOpacity style={css.btnLogin} onPress={Cadastro}><Text style={css.btnLoginText}>INSERIR</Text></TouchableOpacity>
      <TouchableOpacity style={css.btnCadastro} onPress={() => setCadastro( false ) }><Text style={css.btnCadastroText} >Voltar para o Login</Text></TouchableOpacity>
    </ScrollView>
  )
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
    width: "60%",
    height: 70,
    marginLeft: 80
  },
  btnLogin: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 30,
    backgroundColor: "#C2DEF3",
    borderColor:"#C2DEF3"
  },
  btnLoginText: {
    color: "white",
    lineHeight: 45,
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color:"#40C2ED"
  },
  btnCadastro: {
    width: "90%",
    marginTop: 10,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  btnCadastroText: {
    color: "white",
    fontWeight: "bold",
  },
  caixatexto: {
    
  },
  textcadastro: {
    fontWeight: "bold",
    fontSize: 25,
    color: "white",
    bottom: 16
  },
});
