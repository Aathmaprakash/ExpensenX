/* eslint-disable no-trailing-spaces */
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const AddExpenses = () => {
  // eslint-disable-next-line no-unused-vars
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [remark, setRemark] = useState('');
  const [display, setDisplay] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);

        const query = collection(db, 'datallist');
        const userIdFilter = query.where('userId', '==', user.uid);

        const unsubscribeData = onSnapshot(userIdFilter, (querySnapshot) => {
          const userDataList = [];
          querySnapshot.forEach((doc) => {
            userDataList.push(doc.data());
          });
          setDataList(userDataList);
        });

        return () => unsubscribeData();
      } else {
        setUserId(null);
        setDataList([]);
      }
    });

    return () => unsubscribeAuth();
  }, [userId]);

  const handleSave = async () => {
    if (!amount.trim() || !category.trim() || !remark.trim()) {
      // eslint-disable-next-line no-alert
      alert('Please enter values before saving.');
      return;
    }

    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString();
    const formattedDate = currentTime.toLocaleDateString();

    const newData = {
      amount: parseFloat(amount), // Assuming amount is a number
      category,
      remark,
      time: formattedTime,
      date: formattedDate,
      userId: userId,
    };

    const db = getFirestore();
    try {
      await addDoc(collection(db, 'datallist'), newData);
    } catch (error) {
      // console.error('Error adding document: ', error);
    }

    // Fetch all entries after saving
    const query = collection(db, 'datallist');
    // eslint-disable-next-line no-unused-vars
    const unsubscribeData = onSnapshot(query, (querySnapshot) => {
      const allDataList = [];
      querySnapshot.forEach((doc) => {
        allDataList.push(doc.data());
      });
      setDataList(allDataList);
    });

    setAmount('');
    setCategory('');
    setRemark('');
    setDisplay(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.index}>
        <View style={styles.card}>
          <TextInput
            placeholder="Amount"
            placeholderTextColor={'grey'}
            style={styles.rectangleView1}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
            value={amount}
          />
          <TextInput
            placeholder="Remark (Shop, Person name...)"
            style={styles.rectangleView1}
            placeholderTextColor={'grey'}
            keyboardType="default"
            onChangeText={(text) => setRemark(text)}
            value={remark}
          />
          
          <Picker
            style={[styles.rectangleView2]}
            selectedValue={category}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            <Picker.Item label="Select Category" value="" />
            <Picker.Item label="Food" value="Food" />
            <Picker.Item label="Medicine" value="Medicine" />
            <Picker.Item label="Shopping" value="Shopping" />
            <Picker.Item label="Other" value="Other" />
          </Picker>
          <View style={styles.loginbutton}>
            <Pressable style={styles.loginbutton1} onPress={handleSave}>
              <Text style={styles.signUp}>Save</Text>
            </Pressable>
          </View>
        </View>
        {display ? (
          <View>
            <ScrollView>
              {dataList.map((data, index) => (
                <View key={index} style={styles.dataBar}>
                  <View>
                    <Text style={styles.displaycategory}>{data.remark}</Text>
                    <View style={styles.dateandtime}>
                      <Text style={styles.displaytime}>{data.time}</Text>
                      <Text style={styles.displaydate}>{data.date}</Text>
                    </View>
                  </View>
                  <View style={styles.amountContainer}>
                    <Text style={styles.displayamount}>{data.amount}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  index: {
    backgroundColor: '#E8EAED',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  signUp: {
    top: '20%',
    left: '42%',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginLeft: 30,
    marginTop: 30,
    fontWeight: '600',
  },
  card: {
    height: 350,
    width: '100%',
    backgroundColor: '#333C4B',
    borderBottomEndRadius: 35,
    borderBottomLeftRadius: 35,
  },
  rectangleView1: {
    backgroundColor: '#E8EAED',
    width: '90%',
    height: 50,
    marginTop: 25,
    borderRadius:15,
    marginLeft: 20,
    overflow:'hidden',
    padding: 10,
    color:'black',
    fontSize: 17,
  },
  rectangleView2: {
    backgroundColor: '#E8EAED',
    width: '90%',
    height: 50,
    marginTop: 25,
    borderRadius:15,
    marginLeft: 20,
    overflow:'hidden',
    padding: 15,
    color:'black',
    fontSize: 17,
  },
  loginbutton1: {
    height: '40%',
    borderRadius: 10,
    backgroundColor: '#eb7147',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    marginLeft: 20,
    marginTop: 30,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    position: 'absolute',
    width: '100%',
  },
  loginbutton: {
    flex: 1,
    height: 30,
    width: '90%',
  },
  dataBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    height: 60,
    margin: 10,
    marginTop: 8,
    paddingTop: 10,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  displaycategory: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
    color: 'black',
  },
  displayamount: {
    marginRight: 15,
    color: 'red',
    fontSize: 25,
    fontWeight: '800',
  },
  displaytime: {
    color: 'gray',
    paddingTop: 2,
    paddingHorizontal: 5,
    marginLeft: -10,
  },
  displaydate: {
    color: 'gray',
    paddingHorizontal: 10,
    paddingTop: 2,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  amountContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateandtime: {
    flexDirection: 'row',
  },
});

export default AddExpenses;
