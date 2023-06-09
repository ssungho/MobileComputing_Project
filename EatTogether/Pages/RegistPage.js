// 회원가입 페이지

// SignUp.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const SignUp = () => {
    const [name, setName] = useState(''); // enter name
    const [email, setEmail] = useState(''); // enter email
    const [password, setPassword] = useState(''); // Enter Password
    const [confirmPassword, setConfirmPassword] = useState(''); // Confirm Password
    const [passwordMatch, setPasswordMatch] = useState(true); // Match Password
    const [gender, setGender] = useState(null); // Enter gender (optional)

    const handleSubmit = () => {
        // Check if the passwords match
        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        // Check if the email is already registered
        fetch('http://34.64.100.63/eatTogether/checkEmail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `email=${encodeURIComponent(email)}`,
        })
            .then((response) => response.text())
            .then((responseText) => {
                if (responseText === 'duplicate') { // 변경: 'exist' -> 'duplicate'
                    Alert.alert('알림', '이미 등록된 이메일입니다.');
                    return;
                }

                // If the email is not registered, register the user
                fetch('http://34.64.100.63/eatTogether/registerUser.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&gender=${encodeURIComponent(gender)}`,
                })
                    .then((response) => response.text())
                    .then((responseText) => {
                        console.log(responseText);
                        // Show success popup
                        Alert.alert('회원가입 완료', '회원가입이 완료되었습니다!');
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleCheckboxChange = (checked) => {
        // Update the gender state based on the value of checked (true or false)
        if (checked) {
            setGender('male');
        } else {
            setGender('female');
        }
    }

    return (
        // Style code
        <View style={styles.container}>
            <Text style={styles.title}>잇투게더 회원가입</Text>
            <TextInput
                style={styles.input}
                placeholder="이름"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="비밀번호를 입력해주세요"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
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
                    onValueChange={handleCheckboxChange}
                />
                <Text style={styles.checkboxLabel}>Male</Text>
                <CheckBox
                    value={gender === 'female'}
                    onValueChange={handleCheckboxChange}
                />
                <Text style={styles.checkboxLabel}>Female</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>회원가입!!</Text>
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
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
    },
    input: {
        width: '80%',
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
        width: '80%',
        height: 48,
        backgroundColor: '#007bff',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
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

export default SignUp;