import Button from "./components/Button.js";
import page1 from "./pages/page1.js";
import page2 from "./pages/page2.js";

const button = new Button({onClick: function(){console.log('Button is clicked')}, title: 'Bouton'})

export default {
  "/": button.render(),
  "/page1": page1,
  "/page2": page2,
};
