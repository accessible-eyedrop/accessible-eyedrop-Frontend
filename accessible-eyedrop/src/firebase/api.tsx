import { db } from './config'; // Assuming you have Firebase config setup
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  DocumentData
} from 'firebase/firestore';

// Interface for User data
interface UserData {
  name: string;
  age: number;
  medical_history: string;
}

// Interface for Administration Record
interface AdministrationRecord {
  date: string;
  time: string;
  drops_left_eye: number;
  drops_right_eye: number;
  success: boolean;
}

// Interface for Prescription
interface Prescription {
  dosage: string;
  end_date: string;
  frequency: string;
  medicine_name: string;
  start_date: string;
}

// Create/Update user data
export const updateUserData = async (
  userId: string, 
  userData: Partial<UserData>
): Promise<void> => {
  try {
    const userRef = doc(db, 'Users', userId);
    await setDoc(userRef, userData, { merge: true });
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Fetch user data
export const getUserData = async (
  userId: string
): Promise<UserData | null> => {
  try {
    const userRef = doc(db, 'Users', userId);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      const userData = userSnap.data() as UserData;
      return userData;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Add administration record
export const addAdministrationRecord = async (
  userId: string,
  record: AdministrationRecord
): Promise<void> => {
  try {
    const recordRef = doc(collection(db, `Users/${userId}/Administration_records`));
    await setDoc(recordRef, record);
  } catch (error) {
    console.error('Error adding administration record:', error);
    throw error;
  }
};

// Add prescription
export const addPrescription = async (
  userId: string,
  prescription: Prescription
): Promise<void> => {
  try {
    const prescriptionRef = doc(collection(db, `Users/${userId}/Prescription`));
    await setDoc(prescriptionRef, prescription);
  } catch (error) {
    console.error('Error adding prescription:', error);
    throw error;
  }
};

// Example usage of how to fetch specific fields
export const getUserBasicInfo = async (
  userId: string
): Promise<Partial<UserData> | null> => {
  try {
    const userRef = doc(db, 'Users', userId);
    const userSnap = await getDoc(userRef);
    console.log('User Snap:', userSnap.data());
    if (userSnap.exists()) {
      const data = userSnap.data();
      return {
        name: data.name,
        age: data.age,
        medical_history: data.medical_history
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching user basic info:', error);
    throw error;
  }
};
