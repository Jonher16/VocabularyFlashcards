import { Button, makeStyles, MenuItem, TextField } from "@material-ui/core";
import React, { useState } from "react";
import {db} from "../firebase";
import firebase from "firebase"
import * as wanakana from 'wanakana';
import { useStateValue } from "../StateProvider";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
  },
  text: {
    margin: "1rem",
  },
  button: {
    marginTop: "1rem",
  },
}));

const wordTypes = [
  {
    value: "Noun",
  },
  {
    value: "Verb",
  },
  {
    value: "Adjective",
  },
  {
    value: "Adverb",
  },
  {
    value: "Sentence",
  },
];
const NewCard = () => {
  const [{ user }, dispatch] = useStateValue();
  const classes = useStyles();
  const [input, setInput] = useState({
    kanji: "",
    hiragana: "",
    romaji: "",
    list: "",
    wordType: "",
    meaning: "",
  });
  const [lists, setLists] = useState([]);
  const [inputLists, setInputLists] = useState({value: ""});

  useEffect(()=>{
    db.collection("users/" + user.displayName + "/userlists").onSnapshot(snapshot=>setLists(snapshot.docs.map(doc=>({
      id: doc.id,
      data: doc.data(),
    }))))
  }, [])

  const handleNewList = (e) => {
    e.preventDefault();
    db.collection( "users/"+ user.displayName + "/userlists").add({value: inputLists.value});
    setInputLists({value: ""})
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection( "users/"+ user.displayName + "/" + input.list).add({
      kanji: input.kanji,
      hiragana: input.hiragana,
      romaji: input.romaji,
      list: input.list,
      wordType: input.wordType,
      meaning: input.meaning,
      isFaved: false,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      username: user.displayName
    })
    alert("Card was added succesfully")
    console.log(firebase.firestore.FieldValue.serverTimestamp())
    setInput({
      kanji: "",
      hiragana: "",
      romaji: "",
      list: "",
      wordType: "",
      meaning: "",
    });
  };

  return (
    <div>
      <form className={classes.form}>
        <TextField
          id="outlined-basic"
          className={classes.text}
          label="Kanji"
          value={input.kanji}
          onChange={(e) => setInput({ ...input, kanji: e.target.value, })}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          className={classes.text}
          label="Hiragana"
          value={input.hiragana}
          onChange={(e) => setInput({ ...input, hiragana: e.target.value, romaji: wanakana.toRomaji(e.target.value) })}
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          className={classes.text}
          label="Romaji"
          value={input.romaji}
          onChange={(e) => setInput({ ...input, romaji: e.target.value })}
          variant="outlined"
        />
      
        <TextField
          id="outlined-basic"
          className={classes.text}
          label="Meaning"
          value={input.meaning}
          onChange={(e) => setInput({ ...input, meaning: e.target.value })}
          variant="outlined"
        />
        <TextField
          id="standard-select-word-type"
          select
          variant="outlined"
          label="Select"
          value={input.wordType}
          onChange={(e) => setInput({ ...input, wordType: e.target.value })}
        >
          {wordTypes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
{/* 888888888 */}
        <TextField
          id="standard-select-word-type"
          select
          variant="outlined"
          label="Select"
          value={input.list}
          onChange={(e) => setInput({ ...input, list: e.target.value })}
        >
          {lists.sort().map(({id, data: {value}}) => (
            <MenuItem key={id} value={value}>
              {value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-basic"
          className={classes.text}
          label="New List name"
          value={inputLists.value}
          onChange={(e) => setInputLists({...inputLists, value: e.target.value})}
          variant="outlined"
        />
        <Button
          className={classes.button}
          type="submit"
          variant="outlined"
          onClick={handleNewList}
        >
          Add List
        </Button>
{/* 888888888 */}
        <Button
          className={classes.button}
          type="submit"
          onClick={handleSubmit}
          variant="outlined"
        >
          Add Card
        </Button>
      </form>
    </div>
  );
};

export default NewCard;
