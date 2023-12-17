import TestPage from "./src/pages/TestPage.js";
import TestPageTwo from "./src/pages/TestPageTwo.js";

export default {
  "/": new TestPage().render(),
  "/testpagetwo": new TestPageTwo().render(),
};
