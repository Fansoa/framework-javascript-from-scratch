const MiniReact = {
  createElement(type, config, ...children) {
    return {
      type,
      props: { ...config, children },
    };
  },
};

export default MiniReact;
