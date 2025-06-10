import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveNote = async (note) => {
  const notes = await getNotes();
  const existingIndex = notes.findIndex((n) => n.id === note.id);

  if (existingIndex !== -1) {
    notes[existingIndex] = note;
  } else {
    notes.push(note);
  }
  
  await AsyncStorage.setItem("notes", JSON.stringify(notes));
};

export const getNotes = async () => {
  const data = await AsyncStorage.getItem("notes");
  return data ? JSON.parse(data) : [];
};

export const deleteNote = async (id) => {
  const notes = await getNotes();
  const filteredNotes = notes.filter((note) => note.id !== id);
  await AsyncStorage.setItem("notes", JSON.stringify(filteredNotes));
};
