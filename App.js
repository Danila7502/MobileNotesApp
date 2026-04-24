import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [notes, setNotes] = useState([]); // Пустой массив вместо тестовых данных
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    if (notes.length > 0 || notes.length === 0) {
      saveNotes(notes);
    }
  }, [notes]);

  const loadNotes = async () => {
    try {
      const stored = await AsyncStorage.getItem('notes');
      if (stored) {
        setNotes(JSON.parse(stored));
      } else {
        // Если данных нет, оставляем пустой массив
        setNotes([]);
      }
    } catch (e) { 
      console.error('Ошибка загрузки заметок:', e); 
    }
  };

  const saveNotes = async (newNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
    } catch (e) { 
      console.error('Ошибка сохранения заметок:', e); 
    }
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
        <Text style={styles.textinform}>Добавление заметки</Text>
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
        <TouchableOpacity 
          style={styles.addButton} 
          onPress={addNote}
        >
          <Text style={styles.addButtonText}>Добавить</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteCard}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteText}>{item.text}</Text>
            <TouchableOpacity 
              style={styles.deleteButton} 
              onPress={() => deleteNote(item.id)}
            >
              <Text style={styles.deleteButtonText}>Удалить</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Нет заметок. Добавьте первую!</Text>
        }
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
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
  },
  textinform: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#a0a0a0',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,       
    alignItems: 'center',
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 2,
    backgroundColor: '#a0a0a0',
    marginVertical: 5,
    marginBottom: 20,
    borderRadius: 10,
  },
  noteCard: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginStart: 5,
  },
  noteText: {
    fontSize: 13,
    color: '#424242',
    marginStart: 5,
  },
  deleteButton: {
    backgroundColor: 'rgb(208, 81, 81)',
    paddingVertical: 7,
    paddingHorizontal: 148,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center', 
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    color: '#a0a0a0',
    fontSize: 15,
    marginTop: 50,
  },
});