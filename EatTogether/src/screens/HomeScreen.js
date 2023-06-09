import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation = useNavigation();

    const handleRegistPress = () => {
        navigation.navigate('Regist');
      };

    return (
        <View style={styles.container}>
            <View style = {{flex:5}}>
                <Image
                    style={styles.Logo}
                    source={require('../images/Logo.png')}
                />
                <Text style={styles.Text}>같이 먹어요 ☜(ﾟヮﾟ☜)</Text>
            </View>
            <View style = {{flex:1}}>
            <TouchableOpacity>
                    <Text style={styles.login}>로그인</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={handleRegistPress}>
                    <Text style={styles.login}>회원가입 하러가기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FBEF',
    },
    Logo: {
        borderRadius: 100,
        width: 200,
        height: 200,
        alignSelf: "center",
        marginTop: 120,
        marginBottom: 160,
    },
    Text: {
        fontSize: 26,
        fontStyle: "italic",
        alignSelf: "center",
        color: "#86B404",
        marginBottom: 50,
    },
    login: {
        fontSize: 16,
        alignSelf: "center",
        marginTop: 10,
    }
});

export default HomeScreen;