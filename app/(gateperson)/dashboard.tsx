import { router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import SearchBar from "../../src/components/gateperson/SearchBar";
import WorkerList from "../../src/components/gateperson/WorkerList";

import {
  getAbsentWorkersToday,
  getSignedInWorkersToday,
  markWorkerAbsent,
  signInWorker,
  signOutWorker,
} from "../services/attendance";

import AttendanceSummary from "../../src/components/gateperson/AttendanceSummary";
import { getDashboardSummary } from "../services/dashboard";

import FilterBar, {
  FilterType,
} from "../../src/components/gateperson/FilterBar";
import { getAvailableWorkers } from "../services/gateperson";
import { Worker } from "../services/workers";

export default function GatepersonDashboard() {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [signedInWorkers, setSignedInWorkers] = useState<number[]>([]);
  const [absentWorkers, setAbsentWorkers] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("ALL");
  const [summary, setSummary] = useState({
    total: 0,
    pending: 0,
    signedIn: 0,
    signedOut: 0,
    absent: 0,
    late: 0,
  });

  useEffect(() => {
    loadWorkers();
  }, []);

  function loadWorkers() {
    setWorkers(getAvailableWorkers());

    setSignedInWorkers(getSignedInWorkersToday());

    setAbsentWorkers(getAbsentWorkersToday());

    setSummary(getDashboardSummary());
  }

  // ==========================
  // SIGN IN
  // ==========================

  function handleSignIn(workerId: number) {
    try {
      // Gateperson user id
      signInWorker(workerId, 2);

      loadWorkers();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  // ==========================
  // SIGN OUT
  // ==========================

  function handleSignOut(workerId: number) {
    try {
      signOutWorker(workerId);

      loadWorkers();
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  }

  // ==========================
  // MARK ABSENT
  // ==========================

  function handleMarkAbsent(workerId: number) {
    Alert.alert(
      "Mark Absent",
      "Are you sure you want to mark this worker absent?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            try {
              markWorkerAbsent(workerId, 2);

              loadWorkers();
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
    );
  }

  function handleLogout() {
    router.replace("/(auth)/login");
  }

  const filteredWorkers = useMemo(() => {
    let result = workers;

    // Search
    if (search.trim() !== "") {
      result = result.filter(
        (worker) =>
          worker.full_name.toLowerCase().includes(search.toLowerCase()) ||
          worker.worker_number.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter
    switch (filter) {
      case "SIGNED_IN":
        return result.filter((worker) => signedInWorkers.includes(worker.id));

      case "ABSENT":
        return result.filter((worker) => absentWorkers.includes(worker.id));

      case "PENDING":
        return result.filter(
          (worker) =>
            !signedInWorkers.includes(worker.id) &&
            !absentWorkers.includes(worker.id),
        );

      default:
        return result;
    }
  }, [workers, search, filter, signedInWorkers, absentWorkers]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gateperson Dashboard</Text>

      <SearchBar value={search} onChangeText={setSearch} />
      <AttendanceSummary
        total={summary.total}
        pending={summary.pending}
        signedIn={summary.signedIn}
        signedOut={summary.signedOut}
        absent={summary.absent}
        late={summary.late}
      />
      <FilterBar selected={filter} onChange={setFilter} />

      <WorkerList
        workers={filteredWorkers}
        signedInWorkers={signedInWorkers}
        absentWorkers={absentWorkers}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
        onMarkAbsent={handleMarkAbsent}
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingTop: 60,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  logoutButton: {
    margin: 20,
    backgroundColor: "#D32F2F",
    padding: 15,
    borderRadius: 10,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
