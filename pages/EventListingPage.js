import { Component } from "../core/MiniReact.js";
import EventCard from "../components/Events/EventCard.js";
import Footer from "../components/Footer.js";
import Navbar from "../components/Navbar.js";
import SearchSection from "../components/Sections/SearchSection.js";
import SeeMoreSection from "../components/Sections/SeeMoreSection.js";

const testEvents = [
  {
    sport: "Foot",
    name: "Pieds balle",
    place: "Paris",
    date: "21-10-2024",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReXErzBS7diUM2lu4rTnNbst2v_eFbbgAyiYTx7k3MFA&s",
  },
  {
    sport: "Tennis",
    name: "Rot lent Garros",
    place: "Marseille",
    date: "02-04-2032",
    img: "https://openseauserdata.com/files/b261626a159edf64a8a92aa7306053b8.png",
  },
  {
    sport: "Boxe",
    name: "Fight club",
    place: "Lyon",
    date: "12-14-2021",
    img: "https://images.unsplash.com/photo-1494253109108-2e30c049369b?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhbmRvbXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

class EventListingPage extends Component {
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
            class="content-start flex-wrap self-center w-[894px] max-w-full mt-10 px-5"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 flex max-md:flex-col max-md:items-stretch">
              ${testEvents.map((sportEvent) => new EventCard({sportEvent: sportEvent}).toString()).join('')}
            </div>
          </section>
          ${new SearchSection().toString()}
        </main>
        ${new Footer().toString()}
      </div>`
  }
}

export default EventListingPage;