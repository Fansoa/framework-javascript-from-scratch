import TestPage from "./src/pages/TestPage.js";
import TestPageTwo from "./src/pages/TestPageTwo.js";
import InteractiveMapPage from "./src/pages/InteractiveMapPage.js";

export default {
  "/": new InteractiveMapPage().render(),
  "/testpage": new TestPage().render(),
  "/testpagetwo": new TestPageTwo().render(),
};
