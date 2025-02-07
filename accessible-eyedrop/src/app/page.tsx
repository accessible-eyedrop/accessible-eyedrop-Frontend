'use client'
import { UserInfoProvider } from '@/context/UserInfoContext';
import HomeContent from '@/components/HomeContent';

export default function Home() {
  return (
    <UserInfoProvider>
      <HomeContent />
    </UserInfoProvider>
  );
}
