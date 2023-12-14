import { generateRandomKey } from "../core/ElementStructureUtils.js";

export default function BrowserLinkNEW(props) {
  const componentKey = generateRandomKey();
  const element = {
    content: null,
    functions: {},
  }

  function handleClick(event) {
    event.preventDefault();
    history.pushState(null, null, props.to);
  }
  element.functions[`handleClick_${componentKey}`] = handleClick;
  element.content = `<a href="" to="${props.to}" event.click="handleClick_${componentKey}">
    ${props.content}
  </a>`;

  return element;
}