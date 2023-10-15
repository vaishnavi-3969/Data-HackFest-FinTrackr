import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import app from '../db/Firebase';
import { getDatabase } from 'firebase/database';

const Documents = () => {
  const { user } = useAuth0();
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  // const storage = getStorage(app);
  // const db = app.firestore();
  const db = getFirestore(app);
  const storage = getStorage(app);

  // const database = getDatabase(app);
  useEffect(() => {
    const fetchDocuments = async () => {
      if (user) {
        const documentsRef = collection(db, `users/${user.sub}/documents`);
        const querySnapshot = await getDocs(documentsRef);
        const docs = [];

        querySnapshot.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });

        setDocuments(docs);
      }
    };

    fetchDocuments();
  }, [user, db]);

  const handleFileUpload = async () => {
    if (user && selectedFile) {
      const storageRef = ref(storage, `users/${user.sub}/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      const downloadURL = await getDownloadURL(storageRef);

      const documentsRef = collection(db, `users/${user.sub}/documents`);
      const newDocument = {
        name: selectedFile.name,
        url: downloadURL,
        timestamp: new Date(),
      };

      const docRef = await addDoc(documentsRef, newDocument);
      setDocuments([...documents, { id: docRef.id, ...newDocument }]);
    }
  };

  const handleFileSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleDeleteDocument = async (documentId) => {
    if (user) {
      const documentsRef = collection(db, `users/${user.sub}/documents`);
      const documentRef = doc(documentsRef, documentId);

      try {
        const documentData = (await documentRef.get()).data();

        if (documentData) {
          const storageRef = ref(storage, documentData.url);
          await deleteDoc(documentRef);
          await deleteDoc(storageRef);

          // Update the documents state by removing the deleted document
          setDocuments(documents.filter((doc) => doc.id !== documentId));
        } else {
          console.error('Document does not exist.');
        }
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  return (
    <div>
      <h2>Documents</h2>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleFileUpload}>Upload Document</button>
      <div className="documents-container">
        {documents.map((document) => (
          <div className="document" key={document.id}>
            <a href={document.url} target="_blank" rel="noopener noreferrer">
              {document.name}
            </a>
            <button onClick={() => handleDeleteDocument(document.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
