import { useEffect, useState } from 'react';
import { 
  collection, 
  query, 
  onSnapshot,
  orderBy, 
  startAfter,
  limit,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Hook that listens for only new documents added to a collection after the component mounts
 * @param collectionPath Path to the Firestore collection to monitor
 * @param orderByField Field to order documents by (typically a timestamp field)
 */
export function useDeviceDataListener(
  collectionPath: string,
  orderByField: string = 'timestamp'
) {
  const [latestDocument, setLatestDocument] = useState<DocumentData | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    const setupListener = () => {
      try {
        // Get the current timestamp
        const startTimestamp = Timestamp.now();
        console.log('Starting listener from timestamp:', startTimestamp.toDate());
        
        // Create collection reference
        const collectionRef = collection(db, collectionPath);
        
        // Create a query for documents created after now
        const newDocsQuery = query(
          collectionRef,
          orderBy(orderByField, 'desc'),
          startAfter(startTimestamp),
          limit(1) // Only get the most recent document
        );
        
        // Set up the real-time listener
        unsubscribe = onSnapshot(newDocsQuery, (snapshot) => {
          // Process only newly added documents
          const changes = snapshot.docChanges().filter(change => change.type === 'added');
          
          if (changes.length > 0) {
            // Get the most recent document
            const newDocument = {
              id: changes[0].doc.id,
              ...changes[0].doc.data()
            };
            
            console.log('New device data received:', newDocument);
            setLatestDocument(newDocument);
          }
        }, (err) => {
          setError(`Error listening for device data: ${err.message}`);
          console.error('Error in device data listener:', err);
        });

        setIsListening(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to set up device data listener: ${errorMessage}`);
        console.error('Error setting up device data listener:', err);
      }
    };

    // Set up the listener when the component mounts
    setupListener();

    // Clean up the listener when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
        console.log('Device data listener unsubscribed');
      }
    };
  }, [collectionPath, orderByField]);

  return { latestDocument, isListening, error };
}