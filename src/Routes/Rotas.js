import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import Recomendacao from '../Pages/Recomendacao';
import Usuario from '../Pages/Usuario';
import Conexoes from '../Pages/Conexoes';
import Sobre from '../Pages/Sobre';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Sobre" component={Sobre} options={{ headerShown: false }} />
            <Stack.Screen name="Usuario" component={Usuario} options={{ title: 'Perfil do Usuário' }} />
            <Stack.Screen name="Conexoes" component={Conexoes} options={{ headerShown: false }} />
            <Stack.Screen name="Recomendacao" component={Recomendacao} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}

export default function Rotas() {
    const { logado, cadastro, setCadastro } = useContext(AuthContext);

    // Exibe a tela de login ou cadastro conforme o estado de autenticação
    if (!logado && !cadastro) {
        return <Login />;
    }

    if (!logado && cadastro) {
        return <Cadastro />;
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        backgroundColor: '#191919',
                    },
                    tabBarActiveTintColor: 'white',
                }}
            >
                <Tab.Screen
                    name="HomeStack"
                    component={HomeStack} // Usa o stack com Home e Sobre
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Recomendacao"
                    component={Recomendacao}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Usuario"
                    component={Usuario}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="camera" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Conexoes"
                    component={Conexoes}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="camera" color={color} size={size} />
                        ),
                    }}
                />
                
            </Tab.Navigator>
        </NavigationContainer>
    );
}