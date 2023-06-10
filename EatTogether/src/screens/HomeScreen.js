import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  // 로그인 버튼 터치시 로그인 페이지로 이동
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };
  // 회원가입 버튼 터치시 회원가입 페이지로 이동
  const handleRegistPress = () => {
    navigation.navigate('Regist');
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 5}}>
        <Image style={styles.logo} source={require('../images/Logo.png')} />
        <Text style={styles.text}>고민하지말고 같이 먹어요</Text>
      </View>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.login}>로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRegistPress}>
          <Text style={styles.login}>회원가입 하러가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FBEF',
  },
  logo: {
    borderRadius: 100,
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 80,
    marginBottom: 80,
  },
  text: {
    fontSize: 26,
    fontStyle: 'italic',
    alignSelf: 'center',
    color: '#86B404',
    marginBottom: 50,
  },
  login: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export default HomeScreen;
