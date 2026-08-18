import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useNoteStore } from '../store/notestorage';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const categories = [
  'Personal',
  'University',
  'Work',
  'Ideas',
  'Other',
];

export default function NoteEditorScreen() {
  const { id } = useLocalSearchParams();

  const noteId =
    typeof id === 'string' ? id : undefined;

  const notes = useNoteStore((state) => state.notes);
  const addNote = useNoteStore((state) => state.addNote);
  const updateNote = useNoteStore(
    (state) => state.updateNote
  );

  const existingNote = notes.find(
    (note) => note.id === noteId
  );

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal');
  const [isFavourite, setIsFavourite] = useState(false);

  // Load existing note when editing
  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setCategory(existingNote.category);
      setIsFavourite(existingNote.isFavourite);
    }
  }, [existingNote]);

  const isEditing = !!noteId;

  const handleSave = () => {
    if (title.trim() === '') {
      Alert.alert(
        'Missing title',
        'Please enter a title for your note.'
      );
      return;
    }

    if (content.trim() === '') {
      Alert.alert(
        'Missing content',
        'Please enter some content for your note.'
      );
      return;
    }

    if (isEditing && existingNote) {
      updateNote(existingNote.id, {
        title: title.trim(),
        content: content.trim(),
        category,
        isFavourite,
      });

      Alert.alert(
        'Note updated',
        'Your note has been updated successfully.',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );

      return;
    }

    const newNote = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category,
      isFavourite,
      createdAt: new Date().toISOString(),
    };

    addNote(newNote);

    Alert.alert(
      'Note saved',
      'Your note has been saved successfully.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityLabel="Go back"
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#111827"
            />
          </Pressable>

          <Text style={styles.headerTitle}>
            {isEditing ? 'Edit Note' : 'New Note'}
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        {/* Title */}
        <Text style={styles.label}>Title</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter note title"
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        {/* Category */}
        <Text style={styles.label}>Category</Text>

        <View style={styles.categoryGrid}>
          {categories.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategory(item)}
              style={[
                styles.categoryButton,
                category === item &&
                  styles.categoryButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === item &&
                    styles.categoryButtonTextSelected,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Content */}
        <Text style={styles.label}>Content</Text>

        <TextInput
          style={styles.contentInput}
          placeholder="Write your note here..."
          placeholderTextColor="#94A3B8"
          value={content}
          onChangeText={setContent}
          multiline
          textAlignVertical="top"
        />

        {/* Favourite */}
        <Pressable
          style={styles.favouriteRow}
          onPress={() =>
            setIsFavourite(!isFavourite)
          }
          accessibilityLabel="Toggle favourite"
        >
          <Ionicons
            name={
              isFavourite
                ? 'star'
                : 'star-outline'
            }
            size={24}
            color={
              isFavourite
                ? '#F59E0B'
                : '#64748B'
            }
          />

          <Text style={styles.favouriteText}>
            {isFavourite
              ? 'Added to favourites'
              : 'Add to favourites'}
          </Text>
        </Pressable>

        {/* Save */}
        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={handleSave}
          accessibilityLabel={
            isEditing
              ? 'Update note'
              : 'Save note'
          }
        >
          <Ionicons
            name={
              isEditing
                ? 'checkmark-circle'
                : 'checkmark'
            }
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.saveButtonText}>
            {isEditing
              ? 'Update Note'
              : 'Save Note'}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    padding: 24,
    paddingTop: 55,
    paddingBottom: 50,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },

  headerSpacer: {
    width: 44,
  },

  label: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 9,
    marginTop: 18,
  },

  input: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111827',
  },

  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  categoryButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },

  categoryButtonSelected: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },

  categoryButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },

  categoryButtonTextSelected: {
    color: '#FFFFFF',
  },

  contentInput: {
    minHeight: 180,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 16,
    fontSize: 15,
    color: '#111827',
  },

  favouriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 22,
    paddingVertical: 10,
  },

  favouriteText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#475569',
    fontWeight: '600',
  },

  saveButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: '#4F46E5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },

  saveButtonPressed: {
    opacity: 0.8,
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});