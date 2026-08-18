import { Ionicons } from '@expo/vector-icons';
import { useNoteStore } from '../../store/notestorage';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function FavouritesScreen() {

  const notes = useNoteStore((state) => state.notes);

  const toggleFavourite = useNoteStore(
    (state) => state.toggleFavourite);

  const favouriteNotes = notes.filter(
    (note) => note.isFavourite);

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Favourites</Text>

            <Text style={styles.subtitle}>
              Your favourite notes.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="star"
              size={24}
              color="#F59E0B"
            />
          </View>
        </View>

        {/* Count */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Favourite Notes
          </Text>

          <Text style={styles.noteCount}>
            {favouriteNotes.length}{' '}
            {favouriteNotes.length === 1 ? 'note' : 'notes'}
          </Text>
        </View>

        {/* Favourite notes */}
        {favouriteNotes.map((note) => (
          <View
            key={note.id}
            style={styles.noteCard}
          >

            <View style={styles.noteTopRow}>
              <Text
                style={styles.noteTitle}
                numberOfLines={1}
              >
                {note.title}
              </Text>

              <Pressable
                onPress={() => toggleFavourite(note.id)}
                accessibilityLabel={`Remove ${note.title} from favourites`}
              >
                <Ionicons
                  name="star"
                  size={22}
                  color="#F59E0B"
                />
              </Pressable>
            </View>

            <Text
              style={styles.noteContent}
              numberOfLines={3}
            >
              {note.content}
            </Text>

            <View style={styles.categoryContainer}>
              <Text style={styles.categoryText}>
                {note.category}
              </Text>
            </View>
          </View>
        ))}

        {/* Empty state */}
        {favouriteNotes.length === 0 && (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="star-outline"
              size={55}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No favourites yet
            </Text>

            <Text style={styles.emptyText}>
              Mark a note as a favourite and it will appear
              here.
            </Text>
          </View>
        )}
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
    paddingTop: 65,
    paddingBottom: 40,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
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
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
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

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 100,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#475569',
    marginTop: 15,
  },

  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 7,
    paddingHorizontal: 30,
    lineHeight: 21,
  },
});