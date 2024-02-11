/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
// import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';
const Food = () => {
    const [foodExpenses, setFoodExpenses] = useState([]);
  
    useEffect(() => {
      const db = getFirestore();
      const foodQuery = query(collection(db, "datallist"), where("category", "==", "Food"));
  
      const unsubscribe = onSnapshot(foodQuery, (querySnapshot) => {
        const expenses = [];
        querySnapshot.forEach((doc) => {
          expenses.push({ ...doc.data(), id: doc.id }); // Include unique id from Firestore document
        });
  
        // Sort expenses in reverse order based on time and date
        expenses.sort((a, b) => {
          const dateTimeA = new Date(a.date + 'T' + a.time + ':00');
          const dateTimeB = new Date(b.date + 'T' + b.time + ':00');
  
          return dateTimeB - dateTimeA;
        });
  
        setFoodExpenses(expenses);
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <View style={styles.index}>
        <Text style={styles.title}>Food Expenses</Text>
        {foodExpenses.length > 0 ? (
          <FlatList
            data={foodExpenses}
            renderItem={({ item }) => (
              <View style={styles.dataBar} key={item.id}>
                <Text style={styles.displaycategory}>{item.remark}</Text>
                <View style={styles.dateandtime}>
                  <Text style={styles.displaytime}>{item.time}</Text>
                  <Text style={styles.displaydate}>{item.date}</Text>
                </View>
                <View style={styles.amountContainer}>
                  <Text style={styles.displayamount}>{item.amount}</Text>
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Text style={styles.noExpensesText}>No food expenses found.</Text>
        )}
      </View>
    );
  };
  
const styles = StyleSheet.create({
  index: {
    backgroundColor: '#E8EAED',
    flex: 1,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 40,
    color: '#000', // Use hex color for black
    marginLeft: 30,
    marginTop: 30,
    fontWeight: '600',
  },
  dataBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    flexDirection: 'row',
    height: 62,
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
  },displaytime: {
    color: 'gray',
    paddingTop: 27,
    paddingHorizontal: 1,
    marginLeft: 10, // Change marginLeft to 10 to align left
  },
  displaydate: {
    color: 'gray',
    paddingHorizontal: 1,
    marginLeft: 10, // Change marginLeft to 10 to align left
    paddingTop: 27,
    alignItems:"flex-start"
  },
  amountContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  dateandtime: {
    flexDirection: 'row',
  },
  noExpensesText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Food;
