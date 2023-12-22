import Homepage from "./pages/Homepage.js";
import LocationDetailPage from "./pages/LocationDetailPage.js";
import SpotDetailPage from "./pages/SpotDetailPage.js";

export default {
  "/": new Homepage(),
  "/lieu": new LocationDetailPage(),
  "/lieu/spot": new SpotDetailPage(),
};
