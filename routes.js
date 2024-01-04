import TestComponentPage from "./src/pages/TestComponentPage.js";
import Homepage from "./src/pages/Homepage.js";
import LocationDetailPage from "./src/pages/LocationDetailPage.js";
import SpotDetailPage from "./src/pages/SpotDetailPage.js";
import FAQPage from "./src/pages/FAQPage.js";

export default {
  "/": new Homepage(),
  "/lieu": new LocationDetailPage(),
  "/lieu/spot": new SpotDetailPage(),
  "/TestComponentPage": new TestComponentPage().render(),
  "/faq": new FAQPage(),
};
