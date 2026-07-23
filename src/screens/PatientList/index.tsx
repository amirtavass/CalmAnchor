import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { RootStackParamList } from "../../types/navigation";
import { getAllPatients } from "../../services/supabase/patients";
import { Patient } from "../../types/patient";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import Avatar1 from "../../../docs/images/svgs/avatar1.svg";
import Avatar2 from "../../../docs/images/svgs/avatar2.svg";
import Avatar3 from "../../../docs/images/svgs/avatar3.svg";
import Avatar4 from "../../../docs/images/svgs/avatar4.svg";
import Avatar5 from "../../../docs/images/svgs/avatar5.svg";

const avatars = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar5];

export default function PatientListScreen() {
  //this line prevents wrong route name or missing params
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //this useEffect fetches the data of patients and need no dependancy arry

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllPatients();
        setPatients(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load patient catalog",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const renderPatientRow = ({
    item,
    index,
  }: {
    item: Patient;
    index: number;
  }) => {
    const AvatarComponent = avatars[index % avatars.length];
    return (
      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate("PatientDetail", { patientId: item.id })
        }
      >
        <View style={styles.avatarWrapper}>
          <AvatarComponent width={40} height={40} />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.patientName}>{item.full_name}</Text>
          <Text style={styles.subText}>View Medical Record</Text>
        </View>

        <View style={styles.actionIconContainer}>
          <Feather name="chevron-right" size={24} color="#CBD5E1" />
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) return <LoadingView message="Loading patient catalog..." />;
  if (error) return <ErrorView message={error} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={patients}
          keyExtractor={(item) => item.id}
          renderItem={renderPatientRow}
          ListEmptyComponent={() => (
            <View style={styles.centerContainer}>
              <Feather
                name="inbox"
                size={48}
                color="#CBD5E1"
                style={{ marginBottom: 16 }}
              />
              <Text style={styles.emptyText}>
                No registered patients found.
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}
