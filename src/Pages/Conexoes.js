import { View, ActivityIndicator, FlatList, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

export default function Conexoes() {
    const [vacinas, setVacinas] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const keys = [ 1, 2, 3, 5, 6 ];


    async function getVacinas(event) {
        const { position } = event.nativeEvent;
        await fetch('http://10.139.75.38:5251/api/Vacinas/GetAllVacinas' )
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

  return (
    <View style={styles.container}>
            <View style={styles.caixatop}>
                <Image style={styles.logo} source={require('../../assets/IconeLogoCadernet.png')} />
                <Text style={{ textAlign: 'center', marginTop: 35 }}>
                    Observe as experiências de outros pacientes com a vacina.
                </Text>
            </View>

            <View style={styles.vacinalista}>
                {loading ? (
                    <ActivityIndicator size="large" color="#079EFF" /> // Exibe um carregando se estiver buscando os dados
                ) : error ? (
                    <Text style={{ color: 'red' }}>Erro ao carregar as vacinas. Tente novamente!</Text> // Exibe uma mensagem de erro se a requisição falhar
                ) : (
                    <FlatList
                        data={vacinas}
                        keyExtractor={(item) => item.vacinaId.toString()} // Usando o ID da vacina como chave
                        renderItem={({ item }) => (
                            <View style={styles.caixavacina}>
                                <Text style={{ color: 'black', paddingLeft: 20, fontWeight: 'bold' }}>
                                    {item.vacinaNome} {/* Exibe o nome da vacina */}
                                </Text>
                                <Text style={{ color: '#079EFF', paddingLeft: 160, fontWeight: 'bold' }}>
                                    Exibir Mais
                                </Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',


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
        marginBottom: 20,
        marginLeft: 15,
        flexDirection: 'row',
        backgroundColor: '#A9DDFF',
        opacity: 0.5,
        width: 350,
        height: 50,
        borderRadius: 15,
    },

});
