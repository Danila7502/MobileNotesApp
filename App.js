import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [notes, setNotes] = useState([
    { id: '1', title: 'Купить молоко', text: 'Не забыть купить молоко в магазине' },
  ]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const addNote = () => {
    if (title.trim() && text.trim()) {
      setNotes([
        ...notes,
        { id: Date.now().toString(), title: title.trim(), text: text.trim() }
      ]);
      setTitle('');
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Заметки</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Заголовок"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, { minHeight: 60 }]}
          placeholder="Текст"
          multiline
          value={text}
          onChangeText={setText}
        />
        <Button title="Добавить заметку" onPress={addNote} color="#555" />
      </View>

      <View style={styles.divider} />

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
    marginBottom: 15,
    textAlign: 'center',
  },
  form: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 15,
  },
  noteCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  noteText: {
    fontSize: 14,
    color: '#555',
  },
});