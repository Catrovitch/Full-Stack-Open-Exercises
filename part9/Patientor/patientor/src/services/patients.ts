import axios from "axios";
import { PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (patient: PatientFormValues) => {
  console.log("Patient before send of:", patient);
  const { data } = await axios.post<PatientFormValues>(
    `${apiBaseUrl}/patients`,
    patient
  );
  console.log('data coming back:', data);
  return data;
};

export default {
  getAll, create
};

