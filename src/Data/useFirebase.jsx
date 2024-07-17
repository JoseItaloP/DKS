import React, { useCallback, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  getStorage,
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBtgxK0LcOfMiDa4a8HAavu0OkpQe0PaXg",
  authDomain: "projetoforumdks.firebaseapp.com",
  projectId: "projetoforumdks",
  storageBucket: "projetoforumdks.appspot.com",
  messagingSenderId: "226429077471",
  appId: "1:226429077471:web:ba6994783a8782ad7b266a",
  measurementId: "G-C5LPRPDS7B",
});

const useFirebase = () => {
  const analytics = getAnalytics(firebaseApp);
  const Db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);
  const usersColecctionRef = collection(Db, "users");
  const DebateColecctionRef = collection(Db, "Debate");
  const GeneralColecctionRef = collection(Db, "General");
  const ResulmySystemColecctionRef = collection(Db, "ResulmySystem");
  const RuleColecctionRef = collection(Db, "Rule");
  const LocalId = localStorage.getItem("Logged");
  const [Logged, setLogged] = React.useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [update, setUpdate] = useState("");
  const [user, setUser] = useState([]);
  const [Debate, setDebate] = useState([]);
  const [General, setGeneral] = useState([]);
  const [Resulmy, setResulmy] = useState([]);
  const [Rule, setRule] = useState([]);
  const [comentsInUse, setComentsInUse] = useState([]);

  function LoginUser(username, password) {
    user.map((element) => {
      if (element.name === username && element.password === password) {
        localStorage.removeItem("Logged");
        localStorage.setItem("Logged", element.id);
        const log = localStorage.getItem("Logged")
        setLogged(log)
      }
    });

    if(Logged){
      alert('Login feito com sucesso!')
      location.reload()
    }else{
      alert('Login ou senha incorretas')
    }
  }

  const GetUpdate = (Value) => setUpdate(Value);

  async function CreatUser(email, name, password) {
    let valueOut = "ok";
    user.forEach((element) => {
      if (element.name === name) {
        return (valueOut = "name");
      }
      if (element.email === email) {
        return (valueOut = "email");
      }
      if (element.password === password) {
        return (valueOut = "password");
      }
    });
    if (valueOut === "ok") {
      await addDoc(usersColecctionRef, {
        email,
        name,
        password,
      });
    }
    return valueOut;
  }
  async function CreatDebatePost(TituloP, DebateTxT, UserName, UserId) {
    await addDoc(DebateColecctionRef, {
      TituloP,
      DebateTxT,
      UserName,
      UserId,
    });

    GetUpdate("DEBATE");
  }

  async function CreatResulmySystemPost(
    TituloP,
    ResumeTxT,
    CI,
    UserId,
    UserName,
    ImgUrl,
    GeS
  ) {
    console.log(ImgUrl, 'useFirebase')
    if (ImgUrl) {
      await addDoc(ResulmySystemColecctionRef, {
        TituloP,
        ResumeTxT,
        CI,
        UserId,
        UserName,
        ImgUrl,
        GeS,
      });
    } else {
      await addDoc(ResulmySystemColecctionRef, {
        TituloP,
        ResumeTxT,
        CI,
        UserId,
        UserName,
        GeS,
      });
    }
    GetUpdate("RESULMY");
  }

  async function CreatGeneralPost(
    TituloP,
    GeneralTxT,
    UserName,
    UserId,
    ImgUrl
  ) {
    console.log('Titulo',TituloP)
    console.log('Texto',GeneralTxT)
    if (ImgUrl) {
      await addDoc(GeneralColecctionRef, {
        TituloP,
        GeneralTxT,
        UserName,
        UserId,
        ImgUrl,
      });
    } else {
      await addDoc(GeneralColecctionRef, {
        TituloP,
        GeneralTxT,
        UserName,
        UserId,
      });
    }
    GetUpdate("GENERAL");
  }

  async function CreatRulePost(
    TituloP,
    RuleTxT,
    SyR,
    UserId,
    UserName,
    ImgUrl
  ) {
    if (imgUrl) {
      await addDoc(RuleColecctionRef, {
        TituloP,
        RuleTxT,
        SyR,
        UserId,
        UserName,
        ImgUrl,
      });
    } else {
      await addDoc(RuleColecctionRef, {
        TituloP,
        RuleTxT,
        SyR,
        UserId,
        UserName,
      });
    }
    GetUpdate("RULE");
  }

  async function deleteUser(id) {
    const userDoc = doc(Db, "users", id);
    await deleteDoc(userDoc);
  }

  async function UpdateNewUser(NewUser, Id) {
    const DocBuscado = doc(Db, "users", Id);
    await updateDoc(DocBuscado, {
      name: NewUser,
    });
  }

  async function NewPhoto(file, Name) {
    const storageRef = ref(storage, `images/${Name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progres = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progres);
      },
      (error) => {
        alert(error);
      },
      async () => {
        await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgUrl(url);
        });
      }
    );
  }

  async function updatePhoto(Id, URL) {
    const DocBuscado = doc(Db, "users", Id);
    await updateDoc(DocBuscado, {
      image: URL,
    });
    location.reload();
  }

  async function CancelNewPhoto() {
    const storageRef = ref(storage, imgUrl);
    await deleteObject(storageRef);
    setImgUrl("");
    setProgress(0);
  }

  async function UpdateResulmyPost(
    TituloP,
    ResumeTxT,
    CI,
    UserId,
    UserName,
    ImgUrl,
    GeS,
    Id
  ) {
    const ResumyDoc = doc(Db, "ResulmySystem", Id);
    try {
      await updateDoc(ResumyDoc, {
        TituloP: TituloP,
        ResumeTxT: ResumeTxT,
        CI: CI,
        UserId: UserId,
        UserName: UserName,
        ImgUrl: ImgUrl,
        GeS: GeS,
      });
    } catch (error) {
      console.error("Erro ao atualizar o documento de Resulmy:", error);
    }
  }

  async function UpdateDebatePost(TituloP, DebateTxT, id) {
    const DebatDoc = doc(Db, "Debate", id);
    try {
      await updateDoc(DebatDoc, {
        TituloP: TituloP,
        DebateTxT: DebateTxT,
      });
    } catch (error) {
      console.error("Erro ao atualizar o documento de debate:", error);
    }
  }

  async function UpdateRulePost(TituloP, RuleTxT, SyR, ImgUrl, id) {
    const RuleDoc = doc(Db, "Rule", id);

    try {
      await updateDoc(RuleDoc, {
        TituloP: TituloP,
        RuleTxT: RuleTxT,
        SyR: SyR,
        ImgUrl: ImgUrl,
      });
    } catch (error) {
      console.error("Erro ao atualizar o documento de Rule:", error);
    }
  }

  async function UpdateGeneralPost(TituloP, GeneralTxT, ImgUrl, id) {
    const GeneralDoc = doc(Db, "General", id);
    
    try {
      await updateDoc(GeneralDoc, {
        TituloP: TituloP,
        GeneralTxT: GeneralTxT,
        ImgUrl: ImgUrl,
      });
    } catch {
      console.error("Erro ao atualizar o documento de General:", error);
    }
  }

  async function DeleteSinglePost(id, table){
    const PostDoc = doc(Db, table, id);
    try {
      
    } catch (error) {
      
    }
    try{
      await deleteDoc(PostDoc);
    }catch(err){
      console.error(err)
    }finally{
      location.reload()
    }
  
  }

  async function NewComentOnPost(coment, table, id) {
    const docRef = doc(Db, table, id);
        try{
          await updateDoc(docRef, {
          Coments: arrayUnion(coment),
        });
        }catch(err){
          console.error(err)
        }
  }

  async function EditComentOnPost(Editedcoment, table, id, index) {
      const docRef = doc(Db, table, id);
        try{
          const docSnap = await getDoc(docRef)
          if(docSnap.exists()){
            const data = docSnap.data();
            let commentsArray = data.Coments || []
            if(index >= 0 && index <= commentsArray.length){
              commentsArray[index] = Editedcoment
              await updateDoc(docRef, {
                Coments: commentsArray,
              });
            }else{
              console.error('Índice inválido')
            }
          }else{
            console.error('Documento não econtrado.')
          }
        }catch(err){
          console.error(err)
        }
  }

  async function DeleteComente(table, id, index){
    const docRef = doc(Db, table, id);
    try{
      const docSnap = await getDoc(docRef)
      if(docSnap.exists()){
        const data = docSnap.data();
        let commentsArray = data.Coments || []
        if(index >= 0 && index <= commentsArray.length){
          const position = commentsArray.indexOf(commentsArray[index])
          if(position > -1){
            commentsArray.splice(position, 1)
            await updateDoc(docRef, {
              Coments: commentsArray,
            });
            location.reload()
          }else{
            console.error('Valor nao encontrado')
          }
        }else{
          console.error('Índice inválido')
        }
      }else{
        console.error('Documento não econtrado.')
      }
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    const getDebate = async () => {
      const data = await getDocs(DebateColecctionRef);
      setDebate(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    const getGeneral = async () => {
      setGeneral([]);
      const data = await getDocs(GeneralColecctionRef);
      setGeneral(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    const getResulmy = async () => {
      setResulmy([]);
      const data = await getDocs(ResulmySystemColecctionRef);
      setResulmy(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // updateComents("RESULMY");
    };

    const getRule = async () => {
      setRule([]);
      const data = await getDocs(RuleColecctionRef);
      setRule(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    if (update === "DEBATE") getDebate();
    if (update === "GENERAL") getGeneral();
    if (update === "RESULMY") getResulmy();
    if (update === "RULE") getRule();
  }, [update]);

 useEffect(() => {
    if (user) {
      const foundUser = user.find((element) => element.id === LocalId);
      if (foundUser) setLogged(foundUser.name);
    }
  }, [user, LocalId]);

  useEffect(() => {
    const getUsers = async () => {
      await getDocs(usersColecctionRef).then((doc) =>
        setUser(doc.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    };
    getUsers();
  }, []);

  return {
    firebaseApp,
    analytics,
    usersColecctionRef,
    user,
    storage,
    imgUrl,
    progress,
    Debate,
    General,
    Resulmy,
    Rule,
    comentsInUse,
    update,
    Logged,
    LocalId,
    setProgress,
    setImgUrl,
    GetUpdate,
    setUpdate,
    CreatUser,
    deleteUser,
    LoginUser,
    UpdateNewUser,
    NewPhoto,
    updatePhoto,
    CancelNewPhoto,
    CreatDebatePost,
    CreatGeneralPost,
    CreatResulmySystemPost,
    CreatRulePost,
    UpdateResulmyPost,
    UpdateDebatePost,
    UpdateRulePost,
    UpdateGeneralPost,
    NewComentOnPost,
    setComentsInUse,
    EditComentOnPost,
    DeleteSinglePost,
    DeleteComente,
  };
};

export default useFirebase;
