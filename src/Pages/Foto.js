import { CameraView, useCameraPermissions, takePictureAsync } from 'expo-camera';
import { useState, useRef } from 'react';
import { ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Foto() {

    const [permission, requestPermission] = useCameraPermissions();
    const [facing, setFacing] = useState('back');
    const [ActiveCamera, setActiveCamera] = useState(false);
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [erro, setErro] = useState(false);
    const [msg, setMsg] = useState(false);

    const ref = useRef(null);


    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        // Permissão ainda não concedida
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>Você precisa dar permissão para a camera</Text>
                <Button onPress={requestPermission} title="Permitir o uso da Camera" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function resetPicture() {
        setFoto("");
        setActiveCamera(true);
    }

    async function takePhoto() {
        const options = {
            quality: 0.5,
            base64: true,
            width: 500,
            height: 300,
        };
        const photo = await ref.current.takePictureAsync(options);
        setFoto(photo.base64);
        setActiveCamera(false);
    }

    async function saveInfo() {
        await fetch('http://10.139.75.15:5251/api/Animal/InsertAnimal', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                animalNome: nome,
                animalFoto: foto
            })
        })
            .then(res => res.json())
            .then(json => { setNome(""); setFoto(""); setMsg(true); })
            .catch(err => console.log(err))
    }

    return (
        <View style={styles.container}>
            {!ActiveCamera ?
                <>
                    {
                        msg ? <Text style={styles.text}>Obrigado por cadastrar</Text>
                            :
                            <>
                                <TextInput
                                    style={styles.inputs}
                                    placeholder='Nome'
                                    placeholderTextColor="white"
                                    onChangeText={(value) => setNome(value)}
                                    value={nome}
                                />
                                {foto ?
                                    <View style={styles.fotoPronta}>
                                        <Image source={{ uri: `data:image/jpeg;base64,${foto}` }} style={styles.foto} />
                                        <TouchableOpacity onPress={resetPicture}>
                                            <Text style={styles.texto}>Tirar nova Foto</Text>
                                        </TouchableOpacity>
                                    </View> :
                                    <Button title="Tirar Foto" onPress={() => setActiveCamera(true)} />
                                }
                                <TouchableOpacity style={styles.btnSalvar}>
                                    <Text style={styles.textBtnSalvar} onPress={() => saveInfo()}>SALVAR</Text>
                                </TouchableOpacity>
                            </>
                    }
                </>
                :
                (ActiveCamera &&
                    <CameraView
                        style={styles.camera}
                        facing={facing}
                        ref={ref}
                        autofocus='on'
                        zoom={1}
                        ratio="16:9"
                    >
                        <View style={styles.boxCamera}>
                            <TouchableOpacity style={styles.changeCamera} onPress={toggleCameraFacing}>
                                <Image source={require("./../../assets/camera.png")} style={styles.changeIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnFoto}>
                                <Pressable onPress={takePhoto} style={styles.btnInterno}></Pressable>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.closeCamera} onPress={() => setActiveCamera(false)}>
                                <Text style={styles.text}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                )
            }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    camera: {
        width: "100%",
        height: "100%",
        resizeMode: "contain"
    },
    fotoPronta: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        width: "50%",
        height: "20%",
        backgroundColor: "black"
    },
    foto: {
        width: "100%",
        height: "80%",
        resizeMode: "cover",
    },
    boxCamera: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        width: "100%",
        height: 150,
        backgroundColor: "rgba( 0, 0, 0, 0.3)",
        position: "absolute",
        alignItems: "center",
        bottom: 0,
        padding: 25
    },
    changeIcon: {
        width: 50,
        height: 50
    },
    closeCamera: {
        width: 50,
        height: 20
    },
    btnFoto: {
        width: 100,
        height: 100,
        backgroundColor: "white",
        borderRadius: 50,
        position: "absolute",
        left: "45%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    btnInterno: {
        width: 90,
        height: 90,
        backgroundColor: "white",
        borderRadius: 50,
        borderWidth: 5,
        borderColor: "gray"
    },
    texto: {
        marginTop: 20,
        color: "white",
        textAlign: "center"
    },
    inputs: {
        borderWidth: 1,
        borderColor: "white",
        width: "90%",
        height: 50,
        color: "white",
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    },
    btnSalvar: {
        width: "60%",
        height: 50,
        backgroundColor: "#3097ff",
        borderRadius: 5,
        marginTop: 25
    },
    text: {
        color: "white"
    },
    textBtnSalvar: {
        color: "white",
        textAlign: "center",
        lineHeight: 45,
        fontSize: 20
    }
});