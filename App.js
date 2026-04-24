import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [notes, setNotes] = useState([
    { id: '1', title: 'Купить молоко', text: 'Не забыть купить молоко в магазине' },
  ]);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem('notes');
      if (stored) setNotes(JSON.parse(stored));
    } catch (e) { console.error(e); }
  };

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (e) { console.error(e); }
  };

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

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
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
            <View style={{ marginTop: 10 }}>
              <Button title="Удалить" onPress={() => deleteNote(item.id)} color="#c00" />
            </View>
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