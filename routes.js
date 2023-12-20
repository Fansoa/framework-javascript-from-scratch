import TestComponentPage from "./src/pages/TestComponentPage.js";
import TestPageTwo from "./src/pages/TestPageTwo.js";
import Homepage from "./src/pages/Homepage.js";
import LocationDetailPage from "./src/pages/LocationDetailPage.js";
import SpotDetailPage from "./src/pages/SpotDetailPage.js";

export default {
  "/": new Homepage(),
  "/testpage": new TestPage(),
  "/testpagetwo": new TestPageTwo(),
  "/lieu": new LocationDetailPage(),
  "/lieu/spot": new SpotDetailPage(),
  "/TestComponentPage": new TestComponentPage().render(),
};
