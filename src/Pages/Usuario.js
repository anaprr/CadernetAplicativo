import { View, Text, Image, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Usuarios from '../Components/Usuarios'
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';


export default function Usuario() {

    const[usuarios, setUsuarios] = useState([]);
    const[error, setError] = useState(false);
    const [vacinas, setVacinas] = useState([]);
    const keys = [ 1, 2, 3, 5, 6 ];


    async function getVacinas(event) {
        const { position } = event.nativeEvent;
        await fetch('http://10.139.75.38:5251/api/Vacinas/GetVacinasIdade/' + keys[position] )
            .then(res => res.json())
            .then(json => {
                setVacinas(json);
            })
            .catch(err => setError(true))
    }

    useFocusEffect(
      React.useCallback(() => {
          //  getVacinas(1);
      }, [])
  );
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

  useEffect(() => {
    getUsuarios();
  }, [])

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
      <PagerView style={css.container} initialPage={0} onPageSelected={(event) => getVacinas(event)}>
                <View style={css.page} key="1">
                    <View style={css.caixa1}>
                        <Image style={css.imagem1} source={{ uri: 'https://images.vexels.com/content/284336/preview/baby-cookie-people-fcc836.png' }} />
                        <Text style={{ marginTop: 30 }}>0-10 anos</Text>
                    </View>
                    {vacinas ?
                        <View style={css.vacinalista}>
                            <FlatList
                                data={vacinas}
                                keyExtractor={(item) => item.vacinaId.toString()}
                                renderItem={({ item }) => (
                                    <View style={css.caixavacina}>
                                        <Text style={{ color: 'black', paddingLeft: 20, fontWeight: 'bold' }}>{item.vacinaNome}</Text>
                                        <Text style={{ color: '#079EFF', paddingLeft: 160, fontWeight: 'bold' }}>Exibir Mais</Text>
                                    </View>
                                )}
                            />
                        </View>
                        :
                        <ActivityIndicator size="large" />
                    }
                </View>
                <View style={css.page} key="2">
                    <View style={css.caixa1}>
                        <View>
                            <Image style={css.imagem1} source={{ uri: 'https://images.vexels.com/content/266405/preview/girl-student-drawing-children-29c33f.png' }} ></Image>
                        </View>
                        <View>
                            <Text style={{ marginTop: 30 }}>11-19 anos</Text>
                        </View>
                    </View>
                    <View style={css.vacinalista}>
                        {vacinas.length > 0 ?
                            <View style={css.vacinalista}>
                                <FlatList
                                    data={vacinas}
                                    keyExtractor={(item) => item.vacinaId.toString()}
                                    renderItem={({ item }) => (
                                        <View style={css.caixavacina}>
                                            <Text style={{ color: 'black', paddingLeft: 20, fontWeight: 'bold' }}>{item.vacinaNome}</Text>
                                            <Text style={{ color: '#079EFF', paddingLeft: 160, fontWeight: 'bold' }}>Exibir Mais</Text>
                                        </View>
                                    )}
                                />
                            </View>
                            :
                            <Text>Sem vacinas</Text>
                        }
                    </View>
                </View>
                <View style={css.page} key="3">
                    <View style={css.caixa1}>
                        <View>
                            <Image style={css.imagem1} source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/830/925/small/young-adult-male-teacher-in-glasses-explaining-with-a-pointing-gesture-educational-concepts-interactive-teaching-and-engaging-explanations-young-adult-teacher-3d-render-generative-ai-pro-png.png' }} ></Image>
                        </View>
                        <View>
                            <Text style={{ marginTop: 30 }}>20-59 anos</Text>
                        </View>
                    </View>
                    <View style={css.vacinalista}>
                        {vacinas.length > 0 ?
                            <View style={css.vacinalista}>
                                <FlatList
                                    data={vacinas}
                                    keyExtractor={(item) => item.vacinaId.toString()}
                                    renderItem={({ item }) => (
                                        <View style={css.caixavacina}>
                                            <Text style={{ color: 'black', paddingLeft: 20, fontWeight: 'bold' }}>{item.vacinaNome}</Text>
                                            <Text style={{ color: '#079EFF', paddingLeft: 160, fontWeight: 'bold' }}>Exibir Mais</Text>
                                        </View>
                                    )}
                                />
                            </View>
                            :
                            <Text>Sem vacinas</Text>
                        }
                    </View>
                </View>
                <View style={css.page} key="5">
                    <View style={css.caixa1}>
                        <View>
                            <Image style={css.imagem1} source={{ uri: 'https://i.pinimg.com/originals/9b/14/73/9b147357159230bca3097c37f4828b7c.png' }} ></Image>
                        </View>
                        <View>
                            <Text style={{ marginTop: 30 }}>+ de 60 anos</Text>
                        </View>
                    </View>
                    <View style={css.vacinalista}>
                        {vacinas.length > 0 ?
                            <View style={css.vacinalista}>
                                <FlatList
                                    data={vacinas}
                                    keyExtractor={(item) => item.vacinaId.toString()}
                                    renderItem={({ item }) => (
                                        <View style={css.caixavacina}>
                                            <Text style={{ color: 'black', paddingLeft: 20, fontWeight: 'bold' }}>{item.vacinaNome}</Text>
                                            <Text style={{ color: '#079EFF', paddingLeft: 160, fontWeight: 'bold' }}>Exibir Mais</Text>
                                        </View>
                                    )}
                                />
                            </View>
                            :
                            <Text>Sem vacinas</Text>
                        }
                    </View>
                </View>
                <View style={css.page} key="6">
                    <View style={css.caixa1}>
                        <View>
                            <Image style={css.imagem1} source={{ uri: 'https://greenpng.com/wp-content/uploads/2022/09/Desenho-de-uma-mulher-gravida-476x1024.png' }} ></Image>
                        </View>
                        <View>
                            <Text style={{ marginTop: 30 }}>periodo gestacional</Text>
                        </View>
                    </View>
                    <View style={css.vacinalista}>
                        {vacinas.length > 0 ?
                            <View style={css.vacinalista}>
                                <FlatList
                                    data={vacinas}
                                    keyExtractor={(item) => item.vacinaId.toString()}
                                    renderItem={({ item }) => (
                                        <View style={css.caixavacina}>
                                            <Text style={{ color: 'black', paddingLeft: 20, fontWeight: 'bold' }}>{item.vacinaNome}</Text>
                                            <Text style={{ color: '#079EFF', paddingLeft: 160, fontWeight: 'bold' }}>Exibir Mais</Text>
                                        </View>
                                    )}
                                />
                            </View>
                            :
                            <Text>Sem vacinas</Text>
                        }
                    </View>
                </View>


            </PagerView>

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