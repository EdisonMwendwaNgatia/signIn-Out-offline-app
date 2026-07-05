import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export type FilterType = "ALL" | "PENDING" | "SIGNED_IN" | "ABSENT";

interface Props {
  selected: FilterType;
  onChange: (filter: FilterType) => void;
}

export default function FilterBar({ selected, onChange }: Props) {
  const filters: FilterType[] = ["ALL", "PENDING", "SIGNED_IN", "ABSENT"];

  return (
    <View style={styles.container}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter}
          style={[styles.button, selected === filter && styles.activeButton]}
          onPress={() => onChange(filter)}
        >
          <Text style={[styles.text, selected === filter && styles.activeText]}>
            {filter.replace("_", " ")}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginHorizontal: 15,
    marginBottom: 12,
  },

  button: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  activeButton: {
    backgroundColor: "#1B47FA",
  },

  text: {
    fontWeight: "600",
    color: "#333",
  },

  activeText: {
    color: "#fff",
  },
});
