import Homepage from "./src/pages/Homepage.js";
import LocationDetailPage from "./src/pages/LocationDetailPage.js";
import SpotDetailPage from "./src/pages/SpotDetailPage.js";

export default {
  "/": new Homepage(),
  "/lieu": new LocationDetailPage(),
  "/lieu/spot": new SpotDetailPage(),
};
