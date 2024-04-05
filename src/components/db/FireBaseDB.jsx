import { initializeApp } from 'firebase/app';
import { getDatabase, ref, orderByChild, equalTo, get, query, push } from 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkQarnpdU_I2yfOTcBs5wnUN73K_jX2UE",
  authDomain: "artschain-171a8.firebaseapp.com",
  databaseURL: "https://artschain-171a8-default-rtdb.firebaseio.com",
  projectId: "artschain-171a8",
  storageBucket: "artschain-171a8.appspot.com",
  messagingSenderId: "234150637012",
  appId: "1:234150637012:web:6198dafebb81a1974a7a41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Référence à la base de données Firebase
const database = getDatabase(app);

const saveHash = (artworkId, hash) => {
  if (artworkId && hash) {
    const badIdsRef = ref(database, 'badIds');
    push(badIdsRef, {
      artworkId: artworkId,
      hash: hash
    }).then((newRef) => {
      console.log("ID associé avec succès avec le hash :", newRef.key);
    }).catch((error) => {
      console.error("Erreur lors de l'association de l'ID avec le hash :", error);
    });
  } else {
    console.error("Les paramètres artworkId et hash ne peuvent pas être vides.");
  }
};

const getHash = async (artworkId) => {
  if (artworkId) {
    const badIdsRef = ref(database, 'badIds');
    const queryRef = query(badIdsRef, orderByChild('artworkId'), equalTo(artworkId));
    const snapshot = await get(queryRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      const firstKey = Object.keys(data)[0];
      return data[firstKey].hash;
    } else {
      console.log("Aucun hash trouvé pour l'artworkId spécifié.");
      return null;
    }
  } else {
    console.error("L'artworkId ne peut pas être vide.");
    return null;
  }
};

export {saveHash, getHash};
