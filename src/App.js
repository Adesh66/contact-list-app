import "./App.css";
import "./stylesheet/main.scss";
import ContactCard from "./components/shared/ContactCard";
import ContactDetails from "./components/shared/ContactDetails";
import { Switch, Route } from "react-router-dom";
function App() {
  return (
    <main className="main-area">
      <Switch>
        <Route exact path="/">
          <ContactCard />
        </Route>
        <Route path="/contacts">
          <ContactCard />
        </Route>
        <Route path="/contact-details/:id">
          <ContactDetails />
        </Route>
      </Switch>
    </main>
  );
}

export default App;
