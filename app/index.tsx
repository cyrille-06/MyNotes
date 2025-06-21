import { useEffect, useState } from "react"; // Importation des hooks React pour gérer l'état et les effets
import { View, FlatList, Button, Text } from "react-native"; // Importation des composants UI de React Native
import { getNotes } from "../src/utils/storage"; // Fonction utilitaire pour récupérer les notes stockées
import NoteCard from "../src/components/NoteCard"; // Composant personnalisé pour afficher une note
import { useRouter } from "expo-router"; // Importation du système de navigation

export default function Dashboard() {
  const [notes, setNotes] = useState([]); // État local pour stocker les notes
  const router = useRouter(); // Initialisation de la navigation

  // Effet de récupération des notes stockées au démarrage du composant
  useEffect(() => {
    const fetchNotes = async () => {
      const savedNotes = await getNotes(); // Récupération de toutes les notes
      setNotes(savedNotes); // Mise à jour de l'état avec les notes récupérées
    };
    fetchNotes();
  }, []);

  return (
    <View style={{ padding: 20, flex: 1 }}>
      {/* Header "My Notes" */}
      <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
        My Notes
      </Text>

      {/* Affichage d'un message si aucune note n'est disponible */}
      {notes.length === 0 ? (
        <Text style={{ textAlign: "center", fontSize: 18, marginTop: 20 }}>
          No notes available. Click "Add" to create one.
        </Text>
      ) : (
        /* Liste des notes affichées sous forme de cartes */
        <FlatList
          data={notes} // Liste des notes à afficher
          keyExtractor={(item) => item.id.toString()} // Définition d'une clé unique pour chaque élément
          renderItem={({ item }) => (
            <NoteCard
              note={item} // Passage des données de la note au composant NoteCard
              onPress={() => router.push(`/notes/${item.id}`)} // Redirection vers l'écran détaillé de la note
            />
          )}
        />
      )}
      
      {/* Bouton permettant d'ajouter une nouvelle note */}
      <Button title="Add Note" onPress={() => router.push("/form")} />
    </View>
  );
}
