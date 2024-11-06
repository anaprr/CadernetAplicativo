import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Usuarios from '../Components/Usuarios'
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';


export default function Usuario() {

  const[usuarios, setUsuarios] = useState([]);
  const[error, setError] = useState(false);
  const[edicao, setEdicao] = useState(false);
  const[usuarioId, setUsuarioId] = useState(0);
  const[usuarioNome, setUsuarioNome] = useState();
  const[usuarioIdade, setUsuarioIdade] = useState();
  const[deleteResposta, setResposta] = useState(false);



  async function getUsuarios(){
    await fetch('http://10.139.75.98:5251/api/Usuarios/GetAllUsuarios' , {
            method: 'GET',
            headers:{
                'content-type' : 'application/json'
            }
        })
        .then( res => (res.ok == true) ? res.json () : false)
        .then(json => setUsuarios(json) )
        .catch(err => setError(true))
  }

  async function getUsuario(id)
  {    
    await fetch('http://10.139.75.98:5251/api/Usuarios/GetUsuarioId/' + id,{
            method: 'GET',
            headers: {
                'Content-type' : 'application/json; charset=UTF-8',
            },
        })
        .then((response)=> response.json())        
        .then(json=>{
          setUsuarioId(json.usuarioId);
          setUsuarioNome(json.usuarioName);
          setUsuarioIdade(json.usuarioIdade);
          
        });
  }

  useEffect(() => {
    getUsuarios();
  }, [])

  useFocusEffect(
    React.useCallback(()=>{
      getUsuarios();
    },[])
  );




  return (
    <View >
      <View style={css.container}>
        <Image style={{width: "40%", height: 150, marginTop: 60, resizeMode: "contain"}} source={require("../../assets/usuariofix.png")}/>
        
      {usuarios.length > 0 ?
        <>
        
          <FlatList
            data={usuarios}
            renderItem={({ item }) => <Usuarios  style={css.nome} nome={item.usuarioNome}/>}
            keyExtractor={(item) => item.usuarioId}
            contentContainerStyle={{ height: (usuarios.length * 600) + 110 }}
          />
        </>
        :
        ( usuarios.length == 0 ? 
            <Text style={css.text}>Sem usuarios para exibir</Text>
          :
            <ActivityIndicator size="large" color="#3097ff" />
        )
      }

      
     
  </View>
    </View>
    
  )
  
}



const css = StyleSheet.create({
    container: {
    flexGrow: 1,
        width: "100%",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "white"
    },
    img: {
        width: "50%",
        height: 150,
        marginTop: -500,
        resizeMode: "contain",
    },
    textprincipal: {
        marginTop: 20
    },
    texto:{
        marginRight: 90,
    },
    nome: {
        color:"black"
    },
    caixatop: {
      alignItems: 'center',
      textAlign: 'center'
  },
  logo: {
      width: 30,
      height: 40,
      marginTop: 30
  },

  page: {
      alignItems: 'center',

  },
  caixa1: {

      width: 160,
      height: 190,
      borderRadius: 15,
      marginTop: 40,
      alignItems: 'center'

  },
  imagem1: {
      width: 140,
      height: 170,

  },
  caixavacina: {
      alignItems: 'center',
      marginTop: 50,
      flexDirection: 'row',
      backgroundColor: '#A9DDFF',
      opacity: 0.5,
      width: 350,
      height: 50,
      borderRadius: 15,
  },
})