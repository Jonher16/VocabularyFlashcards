import "./App.css";
import Flashcards from "./components/Flashcards";
import Navbar from "./components/Navbar";
import NewCard from "./components/NewCard";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
import Login from "./components/Login";

function App() {
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: actionTypes.SET_USER,
          user: user,
        });
      }
    });
  }, []);
  return (
    <>
      {!user ? (
        <>
          <Navbar />
          <Login />
        </>
      ) : (
        <Router>
          <Navbar />
          <Switch>
            <Route path="/newcard">
              <NewCard />
            </Route>
            <Route path="/">
              <Flashcards />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
