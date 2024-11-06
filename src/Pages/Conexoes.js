import { View, ActivityIndicator, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import PagerView from 'react-native-pager-view';

export default function Conexoes() {
    const [vacinas, setVacinas] = useState([]);
    const [avaliacao, setAvaliacao] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

      
    const [exibe, setExibe] = useState(false); 
    const [mostra, setMostra] = useState(false); 

    async function getVacinas() {
        setLoading(true); 
        try {
            const response = await fetch('http://10.139.75.38:5251/api/Vacinas/GetAllVacinas');
            const data = await response.json();
            setVacinas(data); 
        } catch (err) {
            setError(true); 
        } finally {
            setLoading(false); 
        }
    }


    useEffect(() => {
        getVacinas();
    }, []); 


    async function getAvaliacao() {
        setLoading(true); 
        try {
            const response = await fetch('http://10.139.75.38:5251/api/Avaliacaos/GetAllAvaliacaos');
            const data = await response.json();
            setAvaliacao(data); 
        } catch (err) {
            setError(true); 
        } finally {
            setLoading(false); 
        }
    }


    useEffect(() => {
        getAvaliacao();
    }, []); 


    
    const [exibeId, setExibeId] = useState(null);  


    const FuncionaDetalhe = (vacinaId) => {
        setExibeId((prevId) => (prevId === vacinaId ? null : vacinaId)); 
    };
    

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
                    <ActivityIndicator size="large" color="#079EFF" />
                ) : error ? (
                    <Text style={{ color: 'red' }}>Erro ao carregar as vacinas. Tente novamente!</Text>
                ) : (
                    <FlatList
                        data={vacinas}
                        keyExtractor={(item) => item.vacinaId.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.caixavacina}>
                                <Text style={{ color: 'black', paddingLeft: 20, fontWeight: 'bold' }}>
                                    {item.vacinaNome}
                                </Text>
    
                                <TouchableOpacity
                                    style={{ color: '#079EFF', paddingLeft: 160, fontWeight: 'bold' }}
                                    onPress={() => FuncionaDetalhe(item.vacinaId)} 
                                >
                                    <Text style={{ fontWeight: "bold", marginTop: 10 }}>
                                        {exibeId === item.vacinaId ? 'Fechar Detalhes' : 'Detalhes'}
                                    </Text>
                                </TouchableOpacity>
    
                                {exibeId === item.vacinaId && ( 
                                    <View>
                                       
                                        <FlatList
                                            data={avaliacao.filter(a => a.vacinaId === item.vacinaId)}  
                                            keyExtractor={(avaliacaoItem) => avaliacaoItem.avaliacaoId.toString()}
                                            renderItem={({ item: avaliacaoItem }) => (
                                                                                        <View>
                                                                                            <Text style={{ fontWeight: 'bold' }}>
                                                                                                {avaliacaoItem.avaliacaoDor}  
                                                                                            </Text>
                                                                                        </View>
                                                                                    )}
                                        />
                                    </View>
                                )}
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
