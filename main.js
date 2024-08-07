import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCdgAITXTldockRB_wgxOrbNUPKzSVBhDs",
  authDomain: "insan-cemerlang-c9554.firebaseapp.com",
  projectId: "insan-cemerlang-c9554",
  storageBucket: "insan-cemerlang-c9554.appspot.com",
  messagingSenderId: "753628555075",
  appId: "1:753628555075:web:7a72b2d1e8ae89716931f6",
  measurementId: "G-KMJZ5V0B8H"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export async function ambilDaftarMatapelajaran() {
  const refDokumen = collection(db, "matapelajaran");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      hari: dok.data().hari,
      jamke: dok.data().jamke,
      kelas: dok.data().kelas,
      matapelajaran: dok.data().matapelajaran,
      namaguru: dok.data().namaguru,
      waktu: dok.data().waktu,

    });
  });

return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahJadwal(hari, jamke, kelas, matapelajaran, namaguru, waktu, ) {
  try {
    const dokRef = await addDoc(collection(db, 'matapelajaran'), {
      hari: hari,
      jamke: jamke,
      kelas: kelas,
      matapelajaran: matapelajaran,
      namaguru: namaguru,
      waktu: waktu
    });
    console.log('berhasil menembah ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah ' + e);
  }
}

export async function hapusJadwal(docId) {
  await deleteDoc(doc(db, "matapelajaran", docId));
}

export async function ubahMatapelajaran(docId, hari, jamke, kelas, matapelajaran, namaguru, waktu,) {
  await updateDoc(doc(db, "matapelajaran", docId), {
    hari: hari,
    jamke: jamke,
    kelas: kelas,
    matapelajaran: matapelajaran,
    namaguru: namaguru,
    waktu: waktu,
  });
}

export async function ambilMatapelajaran(docId) {
  const docRef = await doc(db, "matapelajaran", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}