import MiniReactDOM from "./MiniReactDOM.js";

export default (routes, rootElement) => {
  const getRoute = () => {
    const path = location.pathname === "/index.html" ? "/" : location.pathname;
    return path;
  };

  const generatePage = () => {
    const path = getRoute();
    const page = MiniReactDOM.renderStructure(routes[path]);

    MiniReactDOM.render(rootElement, page);
  };

  generatePage();
  const oldPushState = history.pushState;
  history.pushState = (state, title, url) => {
    oldPushState.call(history, state, title, url);
    window.dispatchEvent(new Event("popstate"));
  };
  window.onpopstate = generatePage;
};
