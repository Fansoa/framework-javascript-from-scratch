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
      onClick: () => console.log("Button 1 is clicked"),
    },
    MiniReact.createElement("TEXT_NODE", {
      text: "Button 1",
    }),
  ),
  MiniReact.createElement(
    "button",
    {
      style: {
        "background-color": "blue",
      },
      onClick: () => console.log("Button 2 is clicked"),
    },
    MiniReact.createElement("TEXT_NODE", {
      text: "Button 2",
    }),
  ),
);

export default example;
