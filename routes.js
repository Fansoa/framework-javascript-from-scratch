import TestPage from "./src/pages/TestPage.js";
import TestPageTwo from "./src/pages/TestPageTwo.js";
import Homepage from "./src/pages/Homepage.js";
import LocationDetailPage from "./src/pages/LocationDetailPage.js";

export default {
  "/": new Homepage(),
  "/testpage": new TestPage(),
  "/testpagetwo": new TestPageTwo(),
  "/lieu": new LocationDetailPage(),
};
