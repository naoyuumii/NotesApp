import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useNoteStore } from '../../store/notestorage';
import { useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function NotesScreen() {

  const [searchQuery, setSearchQuery] = useState('');

  const notes = useNoteStore((state) => state.notes);

  const toggleFavourite = useNoteStore(
  (state) => state.toggleFavourite);

  const deleteNote = useNoteStore(
  (state) => state.deleteNote);

  const handleDeleteNote = (id: string, title: string) => {
  Alert.alert('Delete note', `Are you sure you want to delete "${title}"?`,[
      {text: 'Cancel', style: 'cancel',},
      {text: 'Delete', style: 'destructive',
      onPress: () => deleteNote(id),},
    ]);};

  const filteredNotes = notes.filter((note) => {
  const query = searchQuery.toLowerCase().trim();

  if (!query) {
    return true;
  }

  return (
    note.title.toLowerCase().includes(query) ||
    note.content.toLowerCase().includes(query) ||
    note.category.toLowerCase().includes(query)
  );
});

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>NotesApp</Text>
            <Text style={styles.subtitle}>
              Your notes, all in one place.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="document-text-outline"
              size={24}
              color="#4F46E5"
            />
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#64748B" />

          <TextInput
            style={styles.searchInput}
            placeholder="Search notes..."
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
            accessibilityLabel="Search notes"
          />
        </View>

        {/* Section title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>My Notes</Text>

          <Text style={styles.noteCount}>
            {filteredNotes.length}{' '}
            {filteredNotes.length === 1 ? 'note' : 'notes'}
          </Text>
        </View>

        {/* Notes */}
         {filteredNotes.map((note) => (
          <Pressable
          key={note.id}
          style={({ pressed }) => [
            styles.noteCard,
            pressed && styles.noteCardPressed,
          ]}

          onPress={() =>
            router.push({
              pathname: '/note-editor',
              params: { id: note.id },
            })
            }
          >
          <View style={styles.noteTopRow}>
            <Text style={styles.noteTitle} numberOfLines={1}
            >
            {note.title}
            </Text>
            <View style={styles.noteActions}>
            <Pressable
              onPress={() => toggleFavourite(note.id)}
              accessibilityLabel={
                note.isFavourite
                  ? `Remove ${note.title} from favourites`
                  : `Add ${note.title} to favourites`
              }
              hitSlop={10}
            >
          <Ionicons
            name={note.isFavourite ? 'star' : 'star-outline'}
            size={21}
            color={note.isFavourite ? '#F59E0B' : '#94A3B8'}
          />
          </Pressable>
          <Pressable
            onPress={() =>
              handleDeleteNote(note.id, note.title)
            }
            accessibilityLabel={`Delete ${note.title}`}
            hitSlop={10}
          >
          <Ionicons
            name="trash-outline"
            size={21}
            color="#EF4444"
          />
          </Pressable>
          </View>
          </View>

          <Text style={styles.noteContent} numberOfLines={2}>
            {note.content}
          </Text>

          <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>
            {note.category}
          </Text>
          </View>
          </Pressable>
        ))}

        {filteredNotes.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="document-text-outline"
            size={50}
            color="#CBD5E1"
          />

          <Text style={styles.emptyTitle}>
            {notes.length === 0
              ? 'No notes yet'
              : 'No matching notes'}
          </Text>

          <Text style={styles.emptyText}>
            {notes.length === 0
              ? 'Tap the + button to create your first note.'
              : 'Try a different search term.'}
          </Text>
        </View>
        )}

      </ScrollView>
      {/* Add button */}
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
        onPress={() => router.push('/note-editor')}
        accessibilityLabel="Add new note"
      >
      <Ionicons name="add" size={30} color="#FFFFFF" />
      </Pressable>
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
    paddingTop: 65,
    paddingBottom: 120,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 5,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  searchContainer: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 28,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111827',
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  noteCount: {
    fontSize: 13,
    color: '#64748B',
  },

  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },

  noteCardPressed: {
    opacity: 0.75,
  },

  noteTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  noteTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
    marginRight: 10,
  },

  noteContent: {
    fontSize: 14,
    lineHeight: 21,
    color: '#64748B',
    marginBottom: 14,
  },

  categoryContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4F46E5',
  },

  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 92,
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',

    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  addButtonPressed: {
    transform: [{ scale: 0.95 }],
  },
  emptyContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 70,
},

emptyTitle: {
  fontSize: 18,
  fontWeight: '700',
  color: '#475569',
  marginTop: 14,
},

emptyText: {
  fontSize: 14,
  color: '#94A3B8',
  textAlign: 'center',
  marginTop: 6,
  paddingHorizontal: 30,
},

noteActions: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 16,
},
});