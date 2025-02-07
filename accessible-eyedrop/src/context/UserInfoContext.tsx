import { createContext, useContext, useState, ReactNode } from 'react';
import { getUserBasicInfo, updateUserData } from '../firebase/api';

interface UserInfo {
  name: string;
  age: number;
  medical_history: string;
}

interface UserInfoContextType {
  userInfo: UserInfo | null;
  loading: boolean;
  error: string | null;
  fetchUserInfo: (userId: string) => Promise<void>;
  updateUserInfo: (userId: string, data: Partial<UserInfo>) => Promise<void>;
}

const UserInfoContext = createContext<UserInfoContextType | undefined>(undefined);

export function UserInfoProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async (userId: string) => {
    try {
      setLoading(true);
      setError(null);
      const userData = await getUserBasicInfo(userId);
      console.log('User Data:', userData);
      
      if (!userData) {
        setError('User not found');
        setUserInfo(null);
        return;
      }

      // Validate required fields
      if (!userData.name || typeof userData.age !== 'number' || !userData.medical_history) {
        setError('Invalid user data format');
        setUserInfo(null);
        return;
      }

      setUserInfo(userData as UserInfo);
    } catch (err) {
      setError('Failed to fetch user information');
      setUserInfo(null);
      console.error('Error fetching user info:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (userId: string, data: Partial<UserInfo>) => {
    try {
      setLoading(true);
      setError(null);
      await updateUserData(userId, data);
      // Update local state after successful update
      setUserInfo(prev => prev ? { ...prev, ...data } : null);
    } catch (err) {
      setError('Failed to update user information');
      console.error('Error updating user info:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserInfoContext.Provider 
      value={{ 
        userInfo, 
        loading, 
        error, 
        fetchUserInfo, 
        updateUserInfo 
      }}
    >
      {children}
    </UserInfoContext.Provider>
  );
}

// Custom hook to use the UserInfo context
export function useUserInfo() {
  const context = useContext(UserInfoContext);
  if (context === undefined) {
    throw new Error('useUserInfo must be used within a UserInfoProvider');
  }
  return context;
}
