// import page1 from "./pages/page1.js";
import IncrementButton from "./components/IncrementButton/index.js";

export default {
  "/": new IncrementButton({ label: 'bouton', onClick: () => console.log('Button is clicked')}).render(),
  // "/": page1,
  // "/page1": page1,
};
