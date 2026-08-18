## Notes App
### By: Aishath Nuhza Masood | UWE ID: 24019755

Notes App is a mobile applicztion that was developed using React Native and Expo. It allows the user to create, edit and delete notes. There are organizational features such as seaching and favouriting also included in this app and all of this data is stored locally on the device. 
---

## Features of the App

### Creating Notes
- Users can create notes by entering a title, content and category.
- Notes can also be marked as favourites when they are created.

### Editing  Notes
- Existing notes can be opened and edited. 
- Users can change the title, content, category and favourite status.

### Delete Notes
- Users can delete individual notes.
- Once user confirms the note will be deleted.

### Search
The search feature allows users to search notes by:
- Title
- Content
- Category

### Categories
Notes can be organised into:
- Personal
- University
- Work
- Ideas
- Other

### Favourites
- Users can mark notes as favourites and view their favourite notes from the Favourites screen.

### Persistent Storage
- Notes are stored locally using AsyncStorage. Notes, edits and favourite states remain available after restarting the application.

### State Management
- Zustand is used to manage the application's note state.

### Settings
The Settings screen provides:

- Application information
- Application version
- Number of stored notes
- Clear all notes functionality

### Validation
The application prevents users from saving notes without:
- A title
- Note content

### Empty State
- When no notes exist, the application displays an informative empty-state message encouraging the user to create their first note.

---

## Screenshots

### Home / Notes

![Home Screen](assets/screenshots/homescreen.jpg)

### Search

![Search Screen](assets/screenshots/searched.jpg)

### New Note

![New Note](assets/screenshots/newnote.jpg)

### Edit Note

![Edit Note](assets/screenshots/editnote.jpg)

### Favourites

![Favourites](assets/screenshots/favourites.jpg)

### Settings

![Settings](assets/screenshots/settings.jpg)

### Delete Confirmation

![Delete Confirmation](assets/screenshots/clearall.jpg)

### Empty State

![Empty State](assets/screenshots/blankscreen.jpg)



