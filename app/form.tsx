import { useRouter, useLocalSearchParams } from "expo-router"; // Importation de la navigation et récupération des paramètres
import { useState, useEffect } from "react"; // Importation des hooks React pour gérer l'état et les effets
import { View, TextInput, Button, Text, TouchableOpacity } from "react-native"; // Importation des composants UI de React Native
import { saveNote, getNotes } from "../src/utils/storage"; // Importation des fonctions de gestion des notes (sauvegarde et récupération)
import { colors } from "../src/utils/styles"; // Importation des styles prédéfinis

export default function FormScreen() {
  const { id } = useLocalSearchParams(); // Récupère l'ID de la note depuis les paramètres de l'URL
  const router = useRouter(); // Initialisation de la navigation
  const [title, setTitle] = useState(""); // État local pour le titre de la note
  const [content, setContent] = useState(""); // État local pour le contenu de la note
  const [priority, setPriority] = useState("normal"); // État local pour la priorité de la note

  // Effet de récupération de la note existante si un ID est fourni
  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        const notes = await getNotes(); // Récupération de toutes les notes
        const existingNote = notes.find((note) => note.id === Number(id)); // Recherche de la note correspondant à l'ID
        if (existingNote) {
          setTitle(existingNote.title); // Pré-remplissage du titre
          setContent(existingNote.content); // Pré-remplissage du contenu
          setPriority(existingNote.priority); // Pré-remplissage de la priorité
        }
      };
      fetchNote();
    }
  }, [id]);

  return (
    <View style={{ padding: 20 }}>
      {/* Champ de saisie pour le titre de la note */}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      
      {/* Champ de saisie pour le contenu de la note */}
      <TextInput
        placeholder="Content"
        value={content}
        onChangeText={setContent}
        multiline
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      {/* Sélection de la priorité de la note */}
      <Text style={{ fontSize: 18, marginTop: 10 }}>Select Priority:</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginVertical: 10 }}>
        {["important", "normal", "reminder"].map((level) => (
          <TouchableOpacity
            key={level}
            onPress={() => setPriority(level)}
            style={{
              backgroundColor: colors[level], // Couleur associée à la priorité
              padding: 10,
              borderRadius: 5,
              flex: 1,
              marginHorizontal: 5,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>{level.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Bouton de sauvegarde de la note */}
      <Button
        title="Save"
        onPress={async () => {
          const note = {
            id: id ? Number(id) : Date.now(), // Si un ID existe, on le réutilise, sinon on génère un nouvel ID
            title,
            content,
            date: new Date().toLocaleDateString(), // Ajout de la date actuelle
            priority,
          };
          await saveNote(note); // Sauvegarde de la note dans le stockage
          router.push("/"); // Redirection vers l'écran d'accueil après sauvegarde
        }}
      />
    </View>
  );
}
