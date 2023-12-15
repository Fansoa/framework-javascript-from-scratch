import { getComponentsData, parseHTML } from "../core/HtmlParser.js";
import { MiniReact } from "../core/MiniReact.js";
import FooterNew from "../components/FooterNew.js";

function TestPageTwo() {
  const footer = FooterNew();
  const components = getComponentsData({
    footer
  });
  const element = {
    content: null,
    functions: {},
  }

  element.content = parseHTML(`<section>
    <h1>TestPageTwo</h1>
    ${components.content.footer}
  </section>`);

  return MiniReact.createElement(...element.content);
}

export default TestPageTwo;