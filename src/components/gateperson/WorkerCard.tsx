import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Worker } from "../../../app/services/workers";

interface Props {
  worker: Worker;
  signedIn: boolean;
  absent: boolean;
  onSignIn: (workerId: number) => void;
  onSignOut: (workerId: number) => void;
  onMarkAbsent: (workerId: number) => void;
}

export default function WorkerCard({
  worker,
  signedIn,
  absent,
  onSignIn,
  onSignOut,
  onMarkAbsent,
}: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.number}>{worker.worker_number}</Text>

        <Text style={styles.name}>{worker.full_name}</Text>

        <Text style={styles.work}>{worker.work_name}</Text>
      </View>

      {absent ? (
        <View style={styles.absentBadge}>
          <Text style={styles.absentText}>ABSENT</Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[
              styles.button,
              signedIn ? styles.signOutButton : styles.signInButton,
            ]}
            onPress={() =>
              signedIn ? onSignOut(worker.id) : onSignIn(worker.id)
            }
          >
            <Text style={styles.buttonText}>
              {signedIn ? "Sign Out" : "Sign In"}
            </Text>
          </TouchableOpacity>

          {!signedIn && (
            <TouchableOpacity
              style={[styles.button, styles.absentButton]}
              onPress={() => onMarkAbsent(worker.id)}
            >
              <Text style={styles.buttonText}>Mark Absent</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 18,
    borderRadius: 12,
    elevation: 3,
  },

  infoContainer: {
    marginBottom: 15,
  },

  number: {
    color: "#2E7D32",
    fontWeight: "bold",
    fontSize: 16,
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 4,
  },

  work: {
    marginTop: 6,
    color: "#666",
    fontSize: 15,
  },

  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  signInButton: {
    backgroundColor: "#1B47FA",
  },

  signOutButton: {
    backgroundColor: "#D32F2F",
  },

  absentButton: {
    backgroundColor: "#555",
  },

  absentBadge: {
    backgroundColor: "#444",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },

  absentText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
