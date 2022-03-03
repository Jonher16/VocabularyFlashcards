import React, { useState } from "react";
import { useEffect } from "react";
import Flashcard from "./Flashcard";
import { db } from "../firebase";
import { useStateValue } from "../StateProvider";
import { IconButton, MenuItem, TextField, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
const Flashcards = () => {
  const [cards, setCards] = useState([]);
  const [listList, setListList] = useState([]);
  const [selectedList, setSelectedList] = useState({ value: null });
  const [{ user }, dispatch] = useStateValue();

  const classes = useStyles();
  useEffect(() => {
    db.collection("users/" + user.displayName + "/userlists").onSnapshot(
      (snapshot) =>
        setListList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
    );
    db.collection("users/" + user.displayName + "/" + selectedList.value)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setCards(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, [selectedList]);

  const removeList = () => {
    db.collection("users/" + user.displayName + "/userlists")
      .doc(
        listList.find((obj) => {
          return obj.data.value === selectedList.value;
        }).id
      )
      .delete();

    alert(
      selectedList.value +
        " and cards in " +
        selectedList.value +
        " were removed"
    );
    console.log(selectedList.value);
    console.log(
      listList.find((obj) => {
        return obj.data.value === selectedList.value;
      })
    );
  };
  return (
    <div className={classes.root}>
      <TextField
        id="standard-select-word-type"
        select
        variant="outlined"
        className={classes.selectList}
        label="Select list"
        value={selectedList.value}
        onChange={(e) =>
          setSelectedList({ ...selectedList, value: e.target.value })
        }
      >
        {listList.map(({ id, data: { value } }) => (
          <MenuItem key={id} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      {selectedList.value === null ? (
        ""
      ) : (
        <IconButton>
          <DeleteIcon onClick={removeList} />
        </IconButton>
      )}

      {cards
        .sort()
        .map(
          ({
            id,
            data: {
              username,
              timestamp,
              isFaved,
              kanji,
              hiragana,
              romaji,
              list,
              wordType,
              meaning,
            },
          }) => (
            <Flashcard
              key={id}
              id={id}
              kanji={kanji}
              hiragana={hiragana}
              romaji={romaji}
              list={list}
              wordType={wordType}
              meaning={meaning}
              isFaved={isFaved}
              timestamp={timestamp}
              username={username}
            />
          )
        )}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: "2vw",
    marginTop: "5vh",
    
  },
  selectList: {
    minWidth: "12vw",
  },
}));

export default Flashcards;
