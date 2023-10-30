import { PatientFormValues, Gender, Diagnosis } from "./types";


const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error("Incorrect or missing gender: " + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error("Incorrect or missing occupation");
    }
    return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
        throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const findDiagnosisByCode = (diagnoses: Diagnosis[], code: string): Diagnosis | undefined => {
    return diagnoses.find((diagnosis) => diagnosis.code === code);
  };

const toNewPatientEntry = (object: unknown): PatientFormValues => {
    if ( !object || typeof object !== "object" ) {
        throw new Error("Incorrect or missing data");
    }

    if ("name" in object && "occupation" in object && "gender" in object && "ssn" in object && "dateOfBirth" in object) {    
        const newEntry: PatientFormValues = {
            name: parseName(object.name),
            occupation: parseOccupation(object.occupation),
            gender: parseGender(object.gender),
            ssn: parseSsn(object.ssn),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth)
        };

        return newEntry;
    }

    throw new Error('Incorrect data: some fields are missing');
};


export default {
    findDiagnosisByCode,
    toNewPatientEntry
};