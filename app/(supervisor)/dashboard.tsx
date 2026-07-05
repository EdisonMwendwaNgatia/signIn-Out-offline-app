// dashboard.tsx
import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import AttendanceHistory from "../../src/components/supervisor/AttendanceHistory";
import DateRangePicker from "../../src/components/supervisor/DateRangePicker";
import ReportButtons from "../../src/components/supervisor/ReportButtons";
import SearchBar from "../../src/components/supervisor/SearchBar";
import WorkerPicker from "../../src/components/supervisor/WorkerPicker";
import { exportAttendanceCSV } from "../../src/utils/csv";
import {
  AttendanceRecord,
  getAttendanceHistory,
  getWorkers,
} from "../services/supervisor";

import { Worker } from "../services/workers";

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

export default function SupervisorDashboard() {
  const [search, setSearch] = useState("");
  const [workers] = useState(getWorkers());
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const filteredWorkers = useMemo(() => {
    if (search.trim() === "") {
      return workers;
    }

    return workers.filter(
      (worker) =>
        worker.full_name.toLowerCase().includes(search.toLowerCase()) ||
        worker.worker_number.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, workers]);

  function handleWorkerSelect(worker: Worker) {
    setSelectedWorker(worker);

    if (fromDate && toDate) {
      setRecords(
        getAttendanceHistory(
          worker.id,
          formatDate(fromDate),
          formatDate(toDate),
        ),
      );
    } else {
      setRecords(getAttendanceHistory(worker.id));
    }
  }

  function refreshHistory() {
    if (!selectedWorker) {
      Alert.alert("No Worker Selected", "Please select a worker.");
      return;
    }

    if (fromDate && toDate) {
      setRecords(
        getAttendanceHistory(
          selectedWorker.id,
          formatDate(fromDate),
          formatDate(toDate),
        ),
      );
    } else {
      setRecords(getAttendanceHistory(selectedWorker.id));
    }
  }

  // function generatePDF() {
  //   if (!selectedWorker) {
  //     Alert.alert("Select Worker", "Please select a worker first.");
  //     return;
  //   }

  //   Alert.alert("Coming Soon", "PDF generation will be implemented next.");
  // }

  async function generateExcel() {
    if (!selectedWorker) {
      Alert.alert("Select Worker", "Please select a worker first.");
      return;
    }

    try {
      await exportAttendanceCSV(selectedWorker.full_name, records);
    } catch (error) {
      Alert.alert("Error", "Failed to export CSV.");
    }
  }

  // Render header content
  const renderHeader = () => (
    <>
      <Text style={styles.title}>Supervisor Dashboard</Text>

      <SearchBar value={search} onChangeText={setSearch} />

      <WorkerPicker
        workers={filteredWorkers}
        selectedWorker={selectedWorker}
        onSelect={handleWorkerSelect}
      />

      <DateRangePicker
        fromDate={fromDate}
        toDate={toDate}
        onFromDateChange={setFromDate}
        onToDateChange={setToDate}
      />

      <TouchableOpacity style={styles.filterButton} onPress={refreshHistory}>
        <Text style={styles.filterText}>Load Attendance</Text>
      </TouchableOpacity>

      <AttendanceHistory records={records} />

      <ReportButtons
        // onGeneratePDF={generatePDF}
        onGenerateExcel={generateExcel}
      />

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.replace("/(auth)/login")}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </>
  );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
      data={[]} // Empty data since we're using ListHeaderComponent
      renderItem={null}
      ListHeaderComponent={renderHeader}
      showsVerticalScrollIndicator={true}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    paddingTop: 60,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  filterButton: {
    backgroundColor: "#1B47FA",
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },

  filterText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  logout: {
    marginHorizontal: 15,
    marginTop: 15,
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
