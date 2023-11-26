import Homepage from "./pages/Homepage.js";
import EventListingPage from "./pages/EventListingPage.js";

export default {
  "/": new Homepage().render(),
  "/listing-events": new EventListingPage().render(),
};
