import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Worker } from "../../../app/services/workers";

interface Props {
  workers: Worker[];
  selectedWorker: Worker | null;
  onSelect: (worker: Worker) => void;
}

export default function WorkerPicker({
  workers,
  selectedWorker,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Worker</Text>

      <FlatList
        data={workers}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedWorker?.id === item.id && styles.selectedCard,
            ]}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.number}>{item.worker_number}</Text>

            <Text style={styles.name}>{item.full_name}</Text>

            <Text style={styles.work}>{item.work_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginBottom: 15,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  list: {
    maxHeight: 250,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 8,
    borderRadius: 10,
    elevation: 2,
  },

  selectedCard: {
    borderWidth: 2,
    borderColor: "#1B47FA",
  },

  number: {
    color: "#1B47FA",
    fontWeight: "bold",
    fontSize: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 3,
  },

  work: {
    marginTop: 4,
    color: "#666",
  },
});
