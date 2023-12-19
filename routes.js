import TestComponentPage from "./src/pages/TestComponentPage.js";
import TestPageTwo from "./src/pages/TestPageTwo.js";

export default {
  "/": new TestComponentPage().render(),
  "/testpagetwo": new TestPageTwo().render(),
};
