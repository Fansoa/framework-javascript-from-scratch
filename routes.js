import Homepage from "./pages/Homepage.js";
import EventListingPage from "./pages/EventListingPage.js";
import EventDetailPage from "./pages/EventDetailPage.js";

export default {
  "/": new Homepage().render(),
  "/listing-events": new EventListingPage().render(),
  "/event-detail": new EventDetailPage().render(),
};
