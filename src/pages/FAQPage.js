import MiniReact from "../../core/MiniReact.js";

import Accordion from "../../components/Accordion/index.js";
import PageTopper from "../../components/PageTopper/index.js";
import SectionTitle from "../../components/SectionTitle/index.js";
import Footer from "../../components/Footer/index.js";
import Navbar from "../../components/Navbar/index.js";

export default class Homepage extends MiniReact.Component {
  render() {
    const navbar = new Navbar().renderComponent();
    const pageTopper = new PageTopper({
      title: "",
      src: "../../assets/images/faq/faq_section_image.png",
      alt: "FAQ",
    }).renderComponent();

    const Title = new SectionTitle({
      title: "Questions fréquentes",
    }).renderComponent();

    const accordion = new Accordion({
      data: [
      {
        title: "Comment utiliser la carte interactive ?",
        content: `<p class='text-base text-zinc-800 mt-3'>Pour utiliser la carte interactive, il vous suffit de cliquer sur les points d'intérêts qui vous intéressent. Vous pourrez ainsi découvrir les spots de surf, les lieux de location de matériel, les écoles de surf, les évènements et les commerces de la ville de Lacanau.</p>`,
      },
      {
        title: "Combien y'aura-t-il de participants aux courses du Marathon Pour Tous ?",
        content: `<p class='text-base text-zinc-800 mt-3'>Il y aura 20 024 participants pour le format marathon et 20 024 participants pour le format 10 kilomètres.</p>`,
      },
      {
        title: "Quel est le prix d'inscription pour le Marathon Pour Tous ?",
        content: `<p class='text-base text-zinc-800 mt-3'>Le prix d'inscription est de 50€ pour le format marathon et de 30€ pour le format 10 kilomètres.</p>`,
      },
      {
        title: "Comment puis-je être tenu au courant des actualités sur la billetterie ?",
        content: `<p class='text-base text-zinc-800 mt-3'>Vous pouvez dès maintenant vous inscrire sur &nbsp;<a href='https://club.paris2024.org/fr/accueil'>Le Club Paris 2024</a>&nbsp; pour avoir toutes les informations sur la billetterie et tenter de remporter un accès prioritaire à la billetterie lors de l'ouverture des ventes. 
                  </p><p><a href='https://tickets.paris2024.org'>Lien vers le site Billetterie</a></p>`,
      },
      {
        title: "Comment pourra-t-on assister à la cérémonie d'ouverture des Jeux Olympiques de Paris 2024 ?",
        content: "Parisiens, Dyonisiens, Franciliens, spectateurs venus de toute la France et du monde entier, tout le monde est convié à la fête. Les places payantes seront situées sur les quais bas et sur certains ponts, aux abords les plus proches de la Seine pour vivre une expérience inoubliable et partagée, au plus près des spectacles et de la déambulation fluviale des athlètes. Intégrées au cœur même du décor de cette cérémonie d'ouverture, mêlant histoire et architecture ces places permettront aux spectateurs de vivre un moment unique."+
                  "Tout le long du parcours, les quais hauts seront ouverts au public avec des accès gratuits. 80 écrans géants situés tout au long du parcours permettront de ne rien manquer de l'intégralité du spectacle.",
      }
    ]}).renderComponent();

    const pageFooter = new Footer().renderComponent();

    this.components = this.getComponentsData({
      accordion,
      navbar,
      pageTopper,
      Title,
      pageFooter,
    });

    this.data.content = this.parseHTML(
      `<main>
        {{ components.content.navbar }}
        {{ components.content.pageTopper }}
        <div class="py-3 pl-10">
          {{ components.content.Title }}

          {{ components.content.accordion }}
        </div>

        <div class="mt-10">
          {{ components.content.pageFooter }}
        </div>
      </main>`.interpolate(this),
    );

    this.data.functions = this.components.functions;
    this.parseEvents(this.data.content, this.data.functions);

    return this.createElement(...this.data.content);
  }
}
