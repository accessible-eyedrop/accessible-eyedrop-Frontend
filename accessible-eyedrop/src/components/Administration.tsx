interface AdministrationRecord {
    angle: number;
    drop_count: number;
    id?: string;
    date: string;
    time: string;
    drops_left_eye: number;
    drops_right_eye: number;
    success: boolean;
  }
  

import { useEffect, useState } from 'react';
import { subscribeToAdministrationRecord } from '../firebase/api';

function AdministrationPage() {
  const [record, setRecord] = useState<AdministrationRecord | null>(null);
  
  useEffect(() => {
    const userId = "user_123"; // Get this from your auth context or props
    const recordId = 'NqCan8qmIAFMTymj0Tux';

    const unsubscribe = subscribeToAdministrationRecord(
      userId,
      recordId,
      (record) => {
        if (record) {
          setRecord(record);
        } else {
          console.log('Record not found');
        }
      }
    );

    return () => unsubscribe();
  }, []);

  // Now you can use the record data in your JSX
  return (
    <div>
      {record ? (
        <div>
          <h2>Administration Record</h2>
          <p>Date: {record.date}</p>
          <p>Time: {record.time}</p>
          <p>Left Eye Drops: {record.drops_left_eye}</p>
          <p>Right Eye Drops: {record.drops_right_eye}</p>
          <p>Success: {record.success ? 'Yes' : 'No'}</p>
          <p>Angle: {record.angle}</p>
          <p>Drop Count: {record.drop_count}</p>
        </div>
      ) : (
        <p>Loading record...</p>
      )}
    </div>
  );
}

export default AdministrationPage;