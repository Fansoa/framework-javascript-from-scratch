import MiniReact from "../../core/MiniReact.js";

const example = MiniReact.createElement(
  "div",
  {
    style: {
      "background-color": "red",
    },
    prop1: "prop1",
    prop2: "prop2",
  },
  MiniReact.createElement(
    "button",
    {
      style: {
        "background-color": "red",
      },
    },
    MiniReact.createElement("TEXT_NODE", {
      text: "label",
    }),
  ),
  MiniReact.createElement(
    "button",
    {
      style: {
        "background-color": "blue",
      },
    },
    MiniReact.createElement("TEXT_NODE", {
      text: "label",
    }),
  ),
);

export default example;
