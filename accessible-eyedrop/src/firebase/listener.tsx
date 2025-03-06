import { useEffect, useState } from 'react';
import { 
  collection, 
  query, 
  onSnapshot,
  orderBy, 
  startAfter,
  limit,
  getDocs,
  Timestamp,
  DocumentData 
} from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Hook that listens for only new documents added to a collection
 * @param collectionPath Path to the collection to monitor
 * @param orderByField Field to order documents by (typically a timestamp field)
 */
export function useNewDocumentsListener(
  collectionPath: string,
  orderByField: string = 'timestamp'
) {
  const [newDocuments, setNewDocuments] = useState<DocumentData[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: () => void;

    const setupListener = async () => {
      try {
        // Get the timestamp of the most recent document
        const collectionRef = collection(db, collectionPath);
        const initialQuery = query(
          collectionRef,
          orderBy(orderByField, 'desc'),
          limit(1)
        );

        const querySnapshot = await getDocs(initialQuery);
        let lastTimestamp: Timestamp | number | Date | null = null;
        
        // If there are existing documents, get the timestamp of the most recent one
        if (!querySnapshot.empty) {
          const latestDoc = querySnapshot.docs[0];
          lastTimestamp = latestDoc.data()[orderByField];
        } else {
          // If no documents exist, use current time as the start point
          lastTimestamp = Timestamp.now();
        }

        // Set up a listener for only new documents added after the latest timestamp
        const newDocsQuery = query(
          collectionRef,
          orderBy(orderByField, 'desc'),
          startAfter(lastTimestamp)
        );
        
        unsubscribe = onSnapshot(newDocsQuery, (snapshot) => {
          // This will only trigger for documents that are added after our initial query
          const newDocs = snapshot.docChanges()
            .filter(change => change.type === 'added')
            .map(change => ({
              id: change.doc.id,
              ...change.doc.data()
            }));
          
          if (newDocs.length > 0) {
            setNewDocuments(prev => [...newDocs, ...prev]);
          }
        }, (err) => {
          setError(`Error listening for new documents: ${err.message}`);
          console.error('Error in document listener:', err);
        });

        setIsListening(true);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        setError(`Failed to set up document listener: ${errorMessage}`);
        console.error('Error setting up document listener:', err);
      }
    };

    setupListener();

    // Cleanup function to unsubscribe when component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [collectionPath, orderByField]);

  return { newDocuments, isListening, error };
}