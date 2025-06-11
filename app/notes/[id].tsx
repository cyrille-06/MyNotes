import { useLocalSearchParams, useRouter } from "expo-router"; // Importation des outils de navigation et des paramètres
import { View, Text, Alert } from "react-native"; // Importation des composants UI de React Native
import { useEffect, useState } from "react"; // Importation des hooks React pour la gestion de l'état et les effets
import { deleteNote, getNotes } from "../../src/utils/storage"; // Fonctions de gestion des notes (suppression et récupération)
import { colors, Title, ButtonContainer, DeleteButton, EditButton, ButtonText } from "../../src/utils/styles"; // Styles prédéfinis pour l'affichage

export default function NoteScreen() {
  const { id } = useLocalSearchParams(); // Récupération de l'ID de la note à partir des paramètres de l'URL
  const [note, setNote] = useState(null); // État local pour stocker la note récupérée
  const router = useRouter(); // Initialisation de la navigation

  // Effet de récupération des notes à chaque changement d'ID
  useEffect(() => {
    const fetchNote = async () => {
      const notes = await getNotes(); // Récupération de toutes les notes stockées
      const selectedNote = notes.find((note) => note.id === Number(id)); // Recherche de la note correspondant à l'ID
      setNote(selectedNote); // Mise à jour de l'état avec la note récupérée
    };
    fetchNote();
  }, [id]);

  // Affichage d'un message de chargement si la note n'est pas encore disponible
  if (!note) return <Text>Loading...</Text>;

  // Fonction pour gérer la suppression d'une note
  const handleDelete = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?", // Message de confirmation
      [
        { text: "Cancel", style: "cancel" }, // Bouton pour annuler
        {
          text: "Delete",
          onPress: async () => {
            await deleteNote(note.id); // Suppression de la note
            router.push("/"); // Redirection vers l'écran d'accueil après suppression
          },
          style: "destructive", // Style du bouton rouge pour indiquer une action risquée
        },
      ]
    );
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Affichage du titre de la note */}
      <Title>{note.title}</Title>
      {/* Affichage de la date de la note */}
      <Text>{note.date}</Text>
      {/* Affichage du contenu de la note */}
      <Text>{note.content}</Text>
      {/* Indication de la priorité avec un fond coloré */}
      <View style={{ backgroundColor: colors[note.priority], padding: 5, borderRadius: 5 }}>
        <Text>Priority: {note.priority}</Text>
      </View>
      {/* Conteneur pour les boutons Modifier et Supprimer */}
      <ButtonContainer>
        {/* Bouton pour modifier la note, redirige vers le formulaire */}
        <EditButton onPress={() => router.push(`/form?id=${note.id}`)}>
          <ButtonText>Edit</ButtonText>
        </EditButton>
        {/* Bouton pour supprimer la note */}
        <DeleteButton onPress={handleDelete}>
          <ButtonText>Delete</ButtonText>
        </DeleteButton>
      </ButtonContainer>
    </View>
  );
}
