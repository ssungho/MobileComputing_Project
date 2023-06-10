// registPage.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const RegistScreen = () => {
  const [name, setName] = useState(''); // enter name
  const [email, setEmail] = useState(''); // enter email
  const [password, setPassword] = useState(''); // Enter Password
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm Password
  const [passwordMatch, setPasswordMatch] = useState(true); // Match Password
  const [gender, setGender] = useState(null); // Enter gender (optional)

  // 회원가입 php주소.
  const php_regist = 'http://34.64.100.63/eatTogether/registUser.php';

  const handleSubmit = () => {
    // Check if the passwords match
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // Check if the email is already registered
    fetch(php_regist, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(
        email,
      )}&password=${encodeURIComponent(password)}&gender=${encodeURIComponent(
        gender,
      )}`,
    })
      .then(response => response.text())
      .then(responseText => {
        if (responseText === 'duplicate') {
          Alert.alert('알림', '이미 등록된 이메일입니다.');
        } else if (responseText === 'success') {
          Alert.alert('회원가입 완료', '회원가입이 완료되었습니다!');
        } else {
          Alert.alert('오류', '회원가입 중 오류가 발생했습니다.');
        }
      })

      .catch(error => {
        console.error(error);
      });
  };

  const handleCheckboxChange = value => {
    setGender(value);
  };

  return (
    // Style code
    <View style={styles.container}>
      <Text style={styles.title}>잇투게더 회원가입</Text>
      <Text style={styles.inputLabel}>이름을 입력해 주세요.</Text>
      <TextInput
        style={styles.input}
        placeholder="이름"
        value={name}
        onChangeText={text => setName(text)}
      />
      <Text style={styles.inputLabel}>이메일을 입력해 주세요.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Text style={styles.inputLabel}>비밀번호를 입력해 주세요.</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <Text style={styles.inputLabel}>
        비밀번호를 다시 한 번 입력해 주세요.
      </Text>
      <TextInput
        style={[styles.input, !passwordMatch && styles.inputError]}
        placeholder="비밀번호 확인"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={text => {
          setConfirmPassword(text);
          setPasswordMatch(true); // Reset the password match error on input change
        }}
      />
      {!passwordMatch && (
        <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
      )}
      <Text></Text>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={gender === 'male'}
          onValueChange={() => handleCheckboxChange('male')}
        />
        <Text style={styles.checkboxLabel}>Male</Text>
        <CheckBox
          value={gender === 'female'}
          onValueChange={() => handleCheckboxChange('female')}
        />
        <Text style={styles.checkboxLabel}>Female</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>회원가입 하기</Text>
      </TouchableOpacity>
    </View>
  );
};

// StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FBEF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
  input: {
    width: '70%',
    height: 48,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  button: {
    width: '70%',
    height: 48,
    backgroundColor: '#86B404',
    borderRadius: 4,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default RegistScreen;
