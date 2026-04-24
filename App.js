import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState([
    { id: '1', title: 'Купить молоко', text: 'Не забыть купить молоко в магазине' },
    { id: '2', title: 'Позвонить маме', text: 'Вечером позвонить маме' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Заметки</Text>
      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    marginTop: 10,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    color: '#555',
  },
});