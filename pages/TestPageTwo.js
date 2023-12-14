import { parseHTML } from "../core/HtmlParser.js";
import { MiniReact } from "../core/MiniReact.js";

function TestPageTwo() {
  const element = {
    content: null,
    functions: {},
  }

  element.content = parseHTML(`<section>
    <h1>TestPageTwo</h1>
  </section>`);

  return MiniReact.createElement(...element.content);
}

export default TestPageTwo;