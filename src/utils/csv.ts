import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

import { AttendanceRecord } from "../../app/services/supervisor";

export async function exportAttendanceCSV(
  workerName: string,
  records: AttendanceRecord[],
) {
  let csv = "";

  // Header row
  csv += "Date,Worker Name,Sign In,Sign Out,Status\n";

  // Attendance rows
  records.forEach((record) => {
    csv += [
      record.date,
      `${workerName}`,
      record.time_in ?? "-",
      record.time_out ?? "-",
      record.attendance_status,
    ].join(",");

    csv += "\n";
  });

  const file = new FileSystem.File(
    FileSystem.Paths.document,
    `${workerName.replace(/\s+/g, "_")}_Attendance.csv`,
  );

  await file.write(csv);

  await Sharing.shareAsync(file.uri);
}
