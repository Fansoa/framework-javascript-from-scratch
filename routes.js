import page1 from "./pages/page1.js";
import page2 from "./pages/page2.js";

export default {
  "/": new page2().render(),
  "/page1": page1,
};
