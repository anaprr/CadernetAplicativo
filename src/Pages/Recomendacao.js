import { View, ActivityIndicator, FlatList, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';

export default function Recomendacao() {

    const [vacinas, setVacinas] = useState([]);
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

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

    return (
        <View style={styles.container}>
            <View style={styles.caixatop}>
                <Image style={styles.logo} source={require('../../assets/IconeLogoCadernet.png')} />
                <Text style={{ textAlign: 'center', marginTop: 35 }}>
                    Mova a tela para verificar as recomendações para outras idades.
                </Text>
            </View>
            <PagerView style={styles.container} initialPage={0} onPageSelected={(event) => getVacinas(event)}>
                <View style={styles.page} key="1">
                    <View style={styles.caixa1}>
                        <Image style={styles.imagem1} source={{ uri: 'https://images.vexels.com/content/284336/preview/baby-cookie-people-fcc836.png' }} />
                        <Text style={{ marginTop: 30 }}>0-10 anos</Text>
                    </View>
                    {vacinas ?
                        <View style={styles.vacinalista}>
                            <FlatList
                                data={vacinas}
                                keyExtractor={(item) => item.vacinaId.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.caixavacina}>
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
                <View style={styles.page} key="2">
                    <View style={styles.caixa1}>
                        <View>
                            <Image style={styles.imagem1} source={{ uri: 'https://images.vexels.com/content/266405/preview/girl-student-drawing-children-29c33f.png' }} ></Image>
                        </View>
                        <View>
                            <Text style={{ marginTop: 30 }}>11-19 anos</Text>
                        </View>
                    </View>
                    <View style={styles.vacinalista}>
                        {vacinas.length > 0 ?
                            <View style={styles.vacinalista}>
                                <FlatList
                                    data={vacinas}
                                    keyExtractor={(item) => item.vacinaId.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.caixavacina}>
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
                <View style={styles.page} key="3">
                    <View style={styles.caixa1}>
                        <View>
                            <Image style={styles.imagem1} source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/024/830/925/small/young-adult-male-teacher-in-glasses-explaining-with-a-pointing-gesture-educational-concepts-interactive-teaching-and-engaging-explanations-young-adult-teacher-3d-render-generative-ai-pro-png.png' }} ></Image>
                        </View>
                        <View>
                            <Text style={{ marginTop: 30 }}>20-59 anos</Text>
                        </View>
                    </View>
                    <View style={styles.vacinalista}>
                        {vacinas.length > 0 ?
                            <View style={styles.vacinalista}>
                                <FlatList
                                    data={vacinas}
                                    keyExtractor={(item) => item.vacinaId.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.caixavacina}>
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
                <View style={styles.page} key="5">
                    <View style={styles.caixa1}>
                        <View>
                            <Image style={styles.imagem1} source={{ uri: 'https://i.pinimg.com/originals/9b/14/73/9b147357159230bca3097c37f4828b7c.png' }} ></Image>
                        </View>
                        <View>
                            <Text style={{ marginTop: 30 }}>+ de 60 anos</Text>
                        </View>
                    </View>
                    <View style={styles.vacinalista}>
                        {vacinas.length > 0 ?
                            <View style={styles.vacinalista}>
                                <FlatList
                                    data={vacinas}
                                    keyExtractor={(item) => item.vacinaId.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.caixavacina}>
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
                <View style={styles.page} key="6">
                    <View style={styles.caixa1}>
                        <View>
                            <Image style={styles.imagem1} source={{ uri: 'https://greenpng.com/wp-content/uploads/2022/09/Desenho-de-uma-mulher-gravida-476x1024.png' }} ></Image>
                        </View>
                        <View>
                            <Text style={{ marginTop: 30 }}>periodo gestacional</Text>
                        </View>
                    </View>
                    <View style={styles.vacinalista}>
                        {vacinas.length > 0 ?
                            <View style={styles.vacinalista}>
                                <FlatList
                                    data={vacinas}
                                    keyExtractor={(item) => item.vacinaId.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.caixavacina}>
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
        flexDirection: 'row',
        backgroundColor: '#A9DDFF',
        opacity: 0.5,
        width: 350,
        height: 50,
        borderRadius: 15,
    },

});