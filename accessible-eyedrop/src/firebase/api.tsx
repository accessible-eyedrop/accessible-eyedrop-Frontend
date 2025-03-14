import { db } from './config'; // Assuming you have Firebase config setup
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  collection,
  DocumentData,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore';

// Interface for User data
interface UserData {
  name: string;
  age: number;
  medical_history: string;
}

// Interface for Administration Record
interface AdministrationRecord {
  timestamp: string;
  drops_left_eye: number;
  success: boolean;
  angle: number;
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

// Function to listen to a specific administration record
export const subscribeToAdministrationRecord = (
  userId: string,
  recordId: string,
  onDataChange: (data: AdministrationRecord | null) => void,
  onError?: (error: Error) => void
) => {
  const recordRef = doc(db, `Users/${userId}/administration_records`, recordId);
  
  return onSnapshot(
    recordRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const record = {
          id: snapshot.id,
          ...snapshot.data() as AdministrationRecord
        };
        onDataChange(record);
      } else {
        onDataChange(null);
      }
    },
    (error) => {
      console.error('Error listening to administration record:', error);
      if (onError) {
        onError(error);
      }
    }
  );
};

// Function to get the latest administration record ID
export const getLatestAdministrationRecordId = async (userId: string): Promise<string | null> => {
  try {
    const recordsRef = collection(db, `Users/${userId}/Administration_records`);
    const q = query(recordsRef, orderBy('date', 'desc'), orderBy('time', 'desc'), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].id;
    }
    return null;
  } catch (error) {
    console.error('Error getting latest administration record:', error);
    throw error;
  }
};
