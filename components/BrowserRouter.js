import routes from "../routes.js";

const BrowserService = {
  getRoute() {
    const path = location.pathname === '/index.html' ? '/' : location.pathname;
    return path;
  },

  getRouteStructure() {
    return routes[this.getRoute()]
  }
}

const BrowserRouter = function (routes, rootElement) {
  const generatePage = () => {
    const path = BrowserService.getRoute();
    
    const structure = BrowserService.getRouteStructure();
    this.savedTree = structure;

    if (rootElement.childNodes.length) {
      rootElement.replaceChild(
        this.renderStructure(structure),
        rootElement.childNodes[0]
      );
    } else {
      rootElement.appendChild(this.renderStructure(structure))
    };
  };
  
  generatePage();

  const oldPushState = history.pushState;
  history.pushState = function (state, title, url) {
    oldPushState.call(history, state, title, url);
    window.dispatchEvent(new Event("popstate"));
  };
  window.onpopstate = generatePage;
};

export const BrowserLink = function (props) {
  return {
    type: "a",
    props: {
      href: props.to,
    },
    events: {
      click: [
        function (event) {
          event.preventDefault();
          history.pushState(null, null, props.to);
        },
      ],
    },
    children: [
      {
        type: "TEXT_NODE",
        content: props.title,
      },
    ],
  };
};

export {
  BrowserRouter,
  BrowserService
};
