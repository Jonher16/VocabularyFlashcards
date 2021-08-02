import React, { forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./Flashcard.css";
import "../fonts/hkgokukaikk.ttf";
import { IconButton } from "@material-ui/core";
import {db} from "../firebase"
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActions from "@material-ui/core/CardActions"


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxHeight: "200vh",
    display: "flex",
    flexDirection: "row",
    marginBottom: "5vh",
    marginTop: "5vh",
    padding: 5,
    marginLeft:"1.5vw",
    marginRight:"1.5vw"
  },
  desc: {
    fontSize: "0.75rem",
    marginBottom: 0,
  },
  title: {
    fontSize: "5rem",
    fontFamily: "hkgokukaikk",
    textAlign: "center",
  },
  hiragana: {
    fontSize: "2rem",
    fontFamily: "hkgokukaikk",
    textAlign: "center",
  },
  romaji: {
    fontSize: "0.75rem",
    color: "grey",
    textAlign: "center",
  
  },
  meaning: {
    marginTop: "1vh",
    fontSize: "1rem"
  },
  word__japanese: {
    borderRight: "1px solid black",
    minWidth: "30vw"
  },

  word__english: {
    minWidth: "50vw",
  },
});
const Flashcard = forwardRef(({id, username, timestamp, isFaved, kanji, hiragana, romaji, list, wordType, meaning}, ref) => {
  const classes = useStyles();
  const removeCard = () => {
    db.collection("users/"+ username +"/"+ list).doc(id).delete()
}
const favCard = () => {
  const favedCard = db.collection("cards").doc(id)
  favedCard.get().then(doc=>favedCard.update({
      isFaved: !doc.data().isFaved
      
  }
  
  ))
  alert(isFaved)
}
  return (
    <Card className={classes.root} variant="outlined" ref={ref}>
      <CardContent className={classes.word__japanese}>
        
        <Typography className={classes.title} variant="h1" component="h1">
          {kanji}
        </Typography>
        <Typography className={classes.hiragana} variant="h2" component="h2">
          {hiragana}
        </Typography>
        <Typography className={classes.romaji} variant="h3" component="h3">
         {romaji}
        </Typography>
      </CardContent>
      <CardContent className={classes.word__english}>
      <Typography className={classes.desc} color="textSecondary" gutterBottom>
          Added: {timestamp.seconds}
        </Typography>
      <Typography className={classes.desc} color="textSecondary" gutterBottom>
          List: {list}
        </Typography>
        <Typography className={classes.desc} color="textSecondary">
          Type: {wordType}
        </Typography>
        <Typography className={classes.meaning} variant="body2" component="p">
          Meaning: {meaning}
        </Typography>
        <Typography className={classes.meaning} variant="body2" component="p">
          User: {username}
        </Typography>
      </CardContent>
      <CardActions>
      <IconButton onClick={removeCard}>
          <DeleteIcon />
      </IconButton>
      <IconButton onClick={favCard} color={isFaved ? "primary" : ""}>
          <StarIcon />
      </IconButton>
      </CardActions>
    </Card>
  );
});
export default Flashcard;
