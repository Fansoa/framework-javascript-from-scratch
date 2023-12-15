import { parseHTML, parseEvents, getComponentsData } from "../core/HtmlParser.js";
import { generateRandomKey } from "../core/ElementStructureUtils.js";
import BrowserLinkNEW from "../components/BrowserLinkNEW.js";
// esgi_olympic.svg
// olympic_logo.png
export default function FooterNew(props) {
  const element = {
    content: null,
    functions: {},
  }

  element.content = `<footer className="w-full flex bg-indigo-400 font-inter text-sm text-white">
    <div className="bg-white rounded-r-full px-10">
      <img src="">
      LOGO ESGI + TEXTE
      <img src="">
      LOGO JO
    </div>
    <div className="py-5">
      <div className="grid md:grid-cols-3 grid-cols-1 w-full pb-5">
        <section>
          <h1 classname="font-nova-square text-xl pb-3">Informations légales</h1>
        </section>
        <section>
          <h1 classname="font-nova-square text-xl pb-3">Contact</h1>
          <p>35 impasse de Karl Marx 40 800</p>
          <p>Aire sur Goulag</p>
          <p>nomdusite@gmail.com</p>
        </section>
        <section>
          <h1 classname="font-nova-square text-xl pb-3">Retrouvez-nous</h1>
          <p>ESGI - Ecole supérieur du genie ingormatiaue</p>
          <p>Les fondateurs</p>
        </section>
      </div>
      <p className="py-5">© 2023 ESGI - Toute reproduction ou utilisation de l'œuvre est interdite sans l'autorisation de l'auteur.</p>
    </div>

  </footer>`;

  return element;
}