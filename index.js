import MiniReactDOM from "./core/MiniReactDOM.js";
// import HomePage from "./pages/HomePage.js";
import TestPage from "./pages/TestPage.js";

const root = document.getElementById("root");

MiniReactDOM.render(
  root,
  MiniReactDOM.renderStructure(new TestPage().render()),
);
