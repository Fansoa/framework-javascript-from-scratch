import { Component } from "../core/MiniReact.js";
import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";
import SearchSection from "../components/Sections/SearchSection.js";
import SeeMoreSection from "../components/Sections/SeeMoreSection.js";
import EventDetail from "../components/Events/EventDetail.js";

const testEvent={
    sport: "Boxe",
    name: "Fight club",
    place: "Lyon",
    address: "3 rue des peupliers",
    date: "12-14-2021",
    imgDetail: "https://cdn.builder.io/api/v1/image/assets/TEMP/7b19f880-0be6-4692-a969-10f0cab454ac?apiKey=6abfd9a8b9514122a12bdd9d84df704a",
    img: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex",
};

export default class EventDetailPage extends Component {
  render() {
    return super.render(
      this.toString()
    );
  }

  toString() {
    return `<div class="page">
        ${new Navbar().toString()}
        <main class="bg-white flex flex-col">
          ${new SeeMoreSection().toString()}
          <section
            class="mt-10 px-5"
          >
            ${new EventDetail({eventDetails: testEvent}).toString()}
          </section>
          ${new SearchSection().toString()}
        </main>
        ${new Footer().toString()}
      </div>`
  }
}