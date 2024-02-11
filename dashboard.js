/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable quotes */
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from '@react-navigation/native';
import Newaddlist from './newaddlist';
import Food from "./food";
import firestore from '@react-native-firebase/firestore';

const styles = StyleSheet.create({
  index: {
    flex: 1,
    backgroundColor: "#333C4B",
  },
  dashboard: {
    color: "white",
    fontSize: 40,
    fontWeight: "700",
    paddingLeft: 35,
    paddingTop: 65,
  },
  card: {
    height: 150,
    borderRadius: 15,
    backgroundColor: "rgba(169, 169, 169, 0.44)",
    width: "40%",
    marginTop: 25,
    marginLeft: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "500",
    color: "#fffafa",
    marginTop: 5,
    justifyContent:"center",
    textAlign:"center"
  },
  flatlistContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  dashcard: {

    justifyContent:"space-between",
    borderRadius: 20,
    backgroundColor: "rgba(235, 113, 71, 0.97)",
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 1,
    width: "85%",
    height: 150,
    marginTop: 30,
    marginLeft: 30,
  },
  picker: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontWeight:"700"

  },
  loginbutton1: {
    height: '20%',
    borderRadius: 10,
    backgroundColor: '#eb7147',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    marginLeft: 45,
    marginTop: -55,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    position: 'absolute',
    width: '90%',
  },
  loginbutton: {
    flex: 1,
    width: '90%',
  },
  signUp: {
    top: '20%',
    left: '30%',
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    position: 'absolute',
  },
  amounttotal: {
    color: 'white',
    fontSize: 25,
    fontWeight: '700',
    marginLeft: 25,
    marginBottom:50

  },
  totaltitle: {
    color: "white",
    fontSize: 20,
    fontWeight: '700',
    padding:12


  },
  cardiconstyle: {
    width: 35,
    height: 35,
    marginLeft:35,
  },
  cardiconstyle2: {
    width: 35,
    height: 35,
    marginLeft:15,
  },
  cardiconstyle3: {
    width: 35,
    height: 35,
    marginLeft:20,
  },
  settingsIcon: {
    marginRight: 15,
  },
  titleandmonth:{
flexDirection: 'row',

  }

});

const categories = [
  { id: 'food', title: 'Food', imageSource: require('./component/whitefork.png'), style: styles.cardiconstyle2 },
  { id: 'shopping', title: 'Shopping',imageSource: require('./component/bag.png'), style: styles.cardiconstyle  },
  { id: 'medicine', title: 'Medicine',imageSource: require('./component/drugs.png'), style: styles.cardiconstyle  },
  { id: 'others', title: 'Others',imageSource: require('./component/notes.png'), style: styles.cardiconstyle3  },
];
const Dashboard = () => {
  const navigation = useNavigation();

  const [month, setMonth] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  useEffect(() => {
    // Get current month
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    setMonth(currentMonth);

    // Fetch data from Firestore
    const fetchData = async () => {
      try {
        // console.log("Fetching data from Firestore...");
        const collectionRef = firestore().collection('datallist');
        const snapshot = await collectionRef.get();
        let total = 0;

        snapshot.forEach((doc) => {
          const amountValue = doc.data().amount || 0;
          total += amountValue;
        });

        setTotalAmount(total);
        console.log('Sum of amounts:', total);
      } catch (error) {
        // console.error("Error fetching data from Firestore:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate(`${item.title}`)}
    >
      <View>
        <Image source={item.imageSource} style={item.style} />
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.index}>


      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.flatlistContainer}
      />

      <View style={styles.loginbutton}>
        <Pressable style={styles.loginbutton1} onPress={() => navigation.navigate(Newaddlist)}>
          <Text style={styles.signUp}>Add Expenses</Text>
        </Pressable>
      </View>
    </View>
  );
};

// eslint-disable-next-line eol-last
export default Dashboard;