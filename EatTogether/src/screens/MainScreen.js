import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';

const MainScreen = () => {
  const [events, setEvents] = useState([]);
  const [isAddEventVisible, setIsAddEventVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [storeName, setStoreName] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [people, setPeople] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        'http://34.64.100.63/eatTogether/getPost.php',
      );
      setEvents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPost = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('store_name', storeName);
      formData.append('description', description);
      formData.append('numberOfPeople', numberOfPeople);
      formData.append('date', date.toISOString().split('T')[0]);

      await axios.post(
        'http://34.64.100.63/eatTogether/addPost.php',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      setTitle('');
      setStoreName('');
      setDescription('');
      setNumberOfPeople('');
      setDate(new Date());
      fetchEvents();
      setIsAddEventVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = date => {
    setEventDate(date);
    hideDatePicker();
  };

  const handleApply = () => {
    setPeople(prevPeople => prevPeople + 1);
  };

  return (
    <View style={styles.container}>
      {!isAddEventVisible ? (
        <>
          <FlatList
            data={events}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.eventItem}>
                <Text style={styles.eventTitle}>{item.title}</Text>
                <Text style={styles.eventStoreName}>
                  장소: {item.store_name}
                </Text>
                <Text style={styles.eventDate}>{item.date}</Text>
                <Text style={styles.eventDescription}>{item.description}</Text>
                <Text style={styles.eventDescription}>
                  현재 인원: {people}/{item.numberOfPeople}
                </Text>
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={handleApply}>
                  <Text style={styles.applyText}>신청</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsAddEventVisible(true)}>
            <Text style={styles.addButtonText}>등록하기</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            style={styles.inputTitle}
            placeholder="제목"
            onChangeText={text => setTitle(text)}
            value={title}
          />
          <TextInput
            style={styles.inputTitle}
            placeholder="가게 이름"
            onChangeText={text => setStoreName(text)}
            value={storeName}
          />
          <TextInput
            style={styles.inputText}
            placeholder="설명"
            onChangeText={text => setDescription(text)}
            value={description}
          />
          <TextInput
            style={styles.inputTitle}
            placeholder="인원수"
            onChangeText={text => setNumberOfPeople(text)}
            value={numberOfPeople}
            keyboardType="numeric"
          />

          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
            />
          )}
          <View style={styles.listview}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.saveButtonText}>날짜 선택</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={addPost}>
              <Text style={styles.saveButtonText}>등록하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsAddEventVisible(false)}>
              <Text style={styles.cancelButtonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#F5FBEF',
  },
  eventItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    padding: 20,
    marginBottom: 20,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventStoreName: {
    fontSize: 16,
    marginBottom: 10,
    marginBottom: 10,
  },
  eventDescription: {
    fontSize: 14,
    marginBottom: 12,
  },
  eventDate: {
    fontSize: 16,
    color: '#999999',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#86B404',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginBottom: 40,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputTitle: {
    backgroundColor: '#FFFFFF',
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    marginBottom: 20,
    justifyContent: 'center',
  },
  inputText: {
    backgroundColor: '#FFFFFF',
    height: 200,
    borderRadius: 10,
    paddingHorizontal: 20,
    fontSize: 14,
    marginBottom: 20,
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#86B404',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#86B404',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  applyText: {
    width: 60,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#86B404',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  applyButton: {
    alignSelf: 'flex-end',
  },
});

export default MainScreen;
