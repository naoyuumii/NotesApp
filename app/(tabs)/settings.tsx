import { Ionicons } from '@expo/vector-icons';
import { useNoteStore } from '../../store/notestorage';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function SettingsScreen() {
  const notes = useNoteStore((state) => state.notes);
  const clearAllNotes = useNoteStore(
    (state) => state.clearAllNotes
  );

  const handleClearAllNotes = () => {
    if (notes.length === 0) {
      Alert.alert(
        'No notes',
        'There are no notes to delete.'
      );
      return;
    }

    Alert.alert(
      'Clear all notes',
      `Are you sure you want to delete all ${notes.length} ${
        notes.length === 1 ? 'note' : 'notes'}? This action cannot be undone.`,
      [{text: 'Cancel',style: 'cancel',},
        {text: 'Delete All',style: 'destructive',
        onPress: () => {clearAllNotes();
            Alert.alert('Notes cleared',
            'All notes have been deleted.');
          },},]);};

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
              Settings
            </Text>

            <Text style={styles.subtitle}>
              Manage your NotesApp preferences.
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="settings-outline"
              size={24}
              color="#4F46E5"
            />
          </View>
        </View>

        {/* App Information */}
        <Text style={styles.sectionTitle}>
          App Information
        </Text>

        <View style={styles.card}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color="#4F46E5"
              />
            </View>

            <View style={styles.infoText}>
              <Text style={styles.infoTitle}>
                NotesApp
              </Text>

              <Text style={styles.infoSubtitle}>
                Simple mobile note-taking application
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Version
            </Text>

            <Text style={styles.detailValue}>
              0.0.1
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>
              Notes stored
            </Text>

            <Text style={styles.detailValue}>
              {notes.length}
            </Text>
          </View>
        </View>

        {/* Data */}
        <Text style={styles.sectionTitle}>
          Data
        </Text>

        <View style={styles.card}>
          <Pressable
            style={({ pressed }) => [
              styles.deleteRow,
              pressed && styles.rowPressed,
            ]}
            onPress={handleClearAllNotes}
            accessibilityLabel="Clear all notes"
          >
            <View style={styles.deleteIconContainer}>
              <Ionicons
                name="trash-outline"
                size={22}
                color="#EF4444"
              />
            </View>

            <View style={styles.deleteText}>
              <Text style={styles.deleteTitle}>
                Clear All Notes
              </Text>

              <Text style={styles.deleteSubtitle}>
                Permanently remove all saved notes
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#94A3B8"
            />
          </Pressable>
        </View>

        {/* About */}
        <Text style={styles.sectionTitle}>
          About
        </Text>

        <View style={styles.aboutCard}>
          <Ionicons
            name="information-circle-outline"
            size={26}
            color="#4F46E5"
          />

          <Text style={styles.aboutText}>
            Notes app is an app on mobile that was made :D
          </Text>
        </View>
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
    paddingBottom: 50,
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
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
    marginTop: 8,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 18,
    marginBottom: 26,
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoText: {
    flex: 1,
    marginLeft: 14,
  },

  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },

  infoSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 16,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },

  detailLabel: {
    fontSize: 14,
    color: '#64748B',
  },

  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },

  deleteRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  rowPressed: {
    opacity: 0.65,
  },

  deleteIconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#FEF2F2',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    flex: 1,
    marginLeft: 14,
    marginRight: 10,
  },

  deleteTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },

  deleteSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
  },

  aboutCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: 18,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },

  aboutText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
    marginLeft: 12,
  },
});