import AsyncStorage from "@react-native-async-storage/async-storage"; // Importation du module AsyncStorage pour stocker localement des données

// Fonction pour sauvegarder une note dans le stockage local
export const saveNote = async (note) => {
  const notes = await getNotes(); // Récupère toutes les notes enregistrées
  const existingIndex = notes.findIndex((n) => n.id === note.id); // Vérifie si la note existe déjà

  if (existingIndex !== -1) {
    notes[existingIndex] = note; // Met à jour la note existante
  } else {
    notes.push(note); // Ajoute une nouvelle note
  }
  
  await AsyncStorage.setItem("notes", JSON.stringify(notes)); // Sauvegarde la liste des notes mise à jour
};

// Fonction pour récupérer toutes les notes stockées
export const getNotes = async () => {
  const data = await AsyncStorage.getItem("notes"); // Récupère les notes depuis le stockage local
  return data ? JSON.parse(data) : []; // Convertit les données JSON en objet JavaScript ou retourne un tableau vide
};

// Fonction pour supprimer une note via son ID
export const deleteNote = async (id) => {
  const notes = await getNotes(); // Récupère toutes les notes
  const filteredNotes = notes.filter((note) => note.id !== id); // Filtre les notes pour supprimer celle correspondant à l'ID

  await AsyncStorage.setItem("notes", JSON.stringify(filteredNotes)); // Sauvegarde les notes mises à jour après suppression
};
