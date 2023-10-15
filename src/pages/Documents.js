import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, getDocs, deleteDoc, doc, getFirestore } from 'firebase/firestore';
import app from '../db/Firebase';
import { FaFile, FaTrash, FaUpload } from 'react-icons/fa';

const Documents = () => {
  const { user } = useAuth0();
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const db = getFirestore(app);
  const storage = getStorage(app);

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
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Your Documents</h2>
      <input type="file" onChange={handleFileSelect} className="mb-4" />
      <button onClick={handleFileUpload} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        <FaUpload className="mr-2" /> Upload Document
      </button>
      <div className="mt-4">
        {documents.map((document) => (
          <div key={document.id} className="flex items-center justify-between p-3 bg-white shadow-md rounded-lg mb-2">
            <a href={document.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              <FaFile className="mr-2" /> {document.name}
            </a>
            <button onClick={() => handleDeleteDocument(document.id)} className="text-red-500">
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
