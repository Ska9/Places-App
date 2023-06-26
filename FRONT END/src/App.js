import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// SHARED COMPONENTS
import MainNavigation from "./shared/components/Navigation/MainNavigation";
// PAGES
import Users from "./user/pages/Users";
import UserPlaces from "./places/pages/UserPlaces";
import NewPlace from "./places/pages/NewPlace";
import UpdatePlace from "./places/pages/UpdatePlace";
// CSS
import "./App.css";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" element={<Users />} exact />
          <Route path="/:userId/places" element={<UserPlaces />} exact />
          <Route path="/places/new" element={<NewPlace />} exact />
          <Route path="/places/:placeId" element={<UpdatePlace />} exact />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
