import { FlatList } from "react-native";
import { Worker } from "../../../app/services/workers";
import WorkerCard from "./WorkerCard";

interface Props {
  workers: Worker[];
  signedInWorkers: number[];
  absentWorkers: number[];
  onSignIn: (workerId: number) => void;
  onSignOut: (workerId: number) => void;
  onMarkAbsent: (workerId: number) => void;
}

export default function WorkerList({
  workers,
  signedInWorkers,
  absentWorkers,
  onSignIn,
  onSignOut,
  onMarkAbsent,
}: Props) {
  return (
    <FlatList
      data={workers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <WorkerCard
          worker={item}
          signedIn={signedInWorkers.includes(item.id)}
          absent={absentWorkers.includes(item.id)}
          onSignIn={onSignIn}
          onSignOut={onSignOut}
          onMarkAbsent={onMarkAbsent}
        />
      )}
    />
  );
}
