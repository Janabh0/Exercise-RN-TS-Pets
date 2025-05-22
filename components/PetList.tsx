import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import pets from "@/data/pets";
import PetItem from "./PetItem";

const PetList = () => {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [adoptedPets, setAdoptedPets] = useState<number[]>([]);

  const handleAdopt = (petId: number) => {
    setAdoptedPets([...adoptedPets, petId]);
    console.log("Pet adopted:", petId);
  };

  // Filter pets based on search query, type, and adoption status
  const filteredPets = pets
    .filter(
      (pet) =>
        pet.name.toLowerCase().includes(query.toLowerCase()) &&
        (type === "All" || pet.type === type) &&
        !adoptedPets.includes(pet.id)
    )
    .map((pet) => (
      <PetItem key={pet.id} pet={pet} onAdopt={() => handleAdopt(pet.id)} />
    ));

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.containerStyle}
    >
      {/* Search Input */}
      <TextInput
        placeholder="Search for a pet"
        style={styles.searchInput}
        onChangeText={(text) => {
          setQuery(text);
          console.log("Search query:", text);
        }}
      />

      {/* Filter by type */}
      <ScrollView horizontal contentContainerStyle={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, type === "All" && styles.activeFilter]}
          onPress={() => {
            setType("All");
            console.log("Selected type: All");
          }}
        >
          <Text>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, type === "Cat" && styles.activeFilter]}
          onPress={() => {
            setType("Cat");
            console.log("Selected type: Cat");
          }}
        >
          <Text>Cat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, type === "Dog" && styles.activeFilter]}
          onPress={() => {
            setType("Dog");
            console.log("Selected type: Dog");
          }}
        >
          <Text>Dog</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            type === "Rabbit" && styles.activeFilter,
          ]}
          onPress={() => {
            setType("Rabbit");
            console.log("Selected type: Rabbit");
          }}
        >
          <Text>Rabbit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pet List */}
      {filteredPets}
    </ScrollView>
  );
};

export default PetList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerStyle: {
    backgroundColor: "#f9e3be",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderColor: "#000",
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    gap: 10,
  },
  filterButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  activeFilter: {
    backgroundColor: "#4ade80",
    borderColor: "#4ade80",
  },
});
