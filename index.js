import MiniReactDOM from "./core/MiniReactDOM.js";
import HomePage from "./pages/HomePage.js";

const root = document.getElementById("root");

MiniReactDOM.render(
  root,
  MiniReactDOM.renderStructure(new HomePage().render()),
);
