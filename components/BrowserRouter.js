import routes from "../routes.js";

export const BrowserService = {
  getRoute() {
    const path = location.pathname === '/index.html' ? '/' : location.pathname;
    return path;
  },

  getRouteStructure() {
    return routes[this.getRoute()];
  },
}

export const BrowserRouter = function (routes, rootElement) {
  const getRoute = () => {
    const path = location.pathname === '/index.html' ? '/' : location.pathname;
    return path;
  }

  const generatePage = () => {
    const path = getRoute();
    this.renderPage(rootElement, routes[path])

    this.savedTree = routes[path];
    this.currentFiber = routes[path];
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