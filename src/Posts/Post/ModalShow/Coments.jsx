import React from "react";
import ReadMoreReact from "read-more-react/dist/components/ReadMoreReact";
import useFirebase from "../../../Data/useFirebase";

import styles from "./styles/Default.module.css";

const Coments = ({ coment, index, type }) => {
  const { LocalId, EditComentOnPost, DeleteComente, Logged } = useFirebase();
  const [editMode, setEditMode] = React.useState(false);
  const [newComent, setNewComent] = React.useState(coment.Coment)

  const DeleteComent = () =>{
    if(window.confirm('Deseja deletar este comentario?')){
      DeleteComente(type, coment.ElementId, index)
    }
  }

  function hamdleClick(){
    const CompleteComent = {
      name: Logged,
      UserId: LocalId,
      ElementId: coment.ElementId,
      Coment: newComent,
      timestamp: new Date(),
      edited: true,
    };
    EditComentOnPost(CompleteComent, type, coment.ElementId, index)
    setEditMode(false)
  }

  return (
    <div key={index} className={styles.Coment}>
      <div className={styles.DivNC}>
        <h5>{coment.name}</h5>
        {LocalId === coment.UserId ? (
          <div className={styles.topComent}>
            <p
              className={styles.EditB}
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              Editar
            </p>
            <p className={styles.EditB} onClick={DeleteComent}>
              Deletar
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
      <p className={styles.EditComent}>
        {editMode ? (
          <textarea
            name="Coment"
            id="Coment"
            rows="4"
            cols="50"
            placeholder="Comente Aqui"
            value={newComent}
            onChange={(e) => setNewComent(e.target.value)}
          />
        ) : (
          <ReadMoreReact
            text={newComent}
            min={80}
            readMoreText={"Ver Mais"}
          />
        )}
        {editMode && <button onClick={hamdleClick}>Save</button>}
      </p>
    </div>
  );
};

export default Coments;
