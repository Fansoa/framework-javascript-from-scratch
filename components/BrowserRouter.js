import { cache } from "../core/CachingService.js";

const BrowserRouter = function (routes, rootElement) {
  const getRoute = () => {
    const path = location.pathname === '/index.html' ? '/' : location.pathname;
    return path;
  }

  const generatePage = () => {
    const path = getRoute();
    
    if (rootElement.childNodes.length) {
      rootElement.replaceChild(
        this.renderStructure(routes[path]),
        rootElement.childNodes[0]
      );
    } else {
      rootElement.appendChild(this.renderStructure(routes[path]))
      this.savedTree = routes[path];
      cache.savedTree = routes[path]
      // console.error(cache)
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

export default BrowserRouter;
