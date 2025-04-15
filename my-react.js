var MyReact = MyReact || {};
var MyReactDOM = MyReactDOM || {};

(function () {
  let currentComponent = null;
  let hookIndex = 0;

  MyReact.useState = function (initialValue) {
    const hooks = currentComponent.__hooks || (currentComponent.__hooks = []);
    const stateIndex = hookIndex++;

    if (hooks[stateIndex] === undefined) {
      hooks[stateIndex] = typeof initialValue === 'function' ? initialValue() : initialValue;
    }

    const setState = (newValue) => {
      hooks[stateIndex] = typeof newValue === 'function' ? newValue(hooks[stateIndex]) : newValue;
      MyReactDOM.render(currentComponent, MyReactDOM.__Container__);
    };

    return [hooks[stateIndex], setState];
  };

  MyReact.useEffect = function (callback, deps) {
    const hooks = currentComponent.__hooks || (currentComponent.__hooks = []);
    const effectIndex = hookIndex++;
    const oldDeps = hooks[effectIndex];

    let hasChanged = true;

    if (oldDeps) {
      hasChanged = deps.some((dep, i) => dep !== oldDeps[i]);
    }

    if (hasChanged) {
      setTimeout(callback); // mimic async lifecycle
      hooks[effectIndex] = deps;
    }
  };

  MyReact.Component = class Component {
    constructor() {
      this.state = {};
      this.__hooks = [];
    }

    setState(partialState) {
      Object.assign(this.state, partialState);
      MyReactDOM.render(this, MyReactDOM.__Container__);
    }

    componentDidMount() {}
  };
})();

(function () {
  function createElement(node) {
    if (typeof node === 'string') return document.createTextNode(node);

    const element = document.createElement(node.type);

    if (node.className) {
      element.className = node.className;
    }

    Object.keys(node).forEach((key) => {
      if (key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase();
        element.addEventListener(eventType, node[key]);
      }
    });

    if (node.text) {
      element.textContent = node.text;
    }

    if (node.children) {
      node.children.forEach(child => {
        element.appendChild(createElement(child));
      });
    }

    return element;
  }

  MyReactDOM.render = function render(ComponentInstance, Container) {
    MyReactDOM.__Container__ = Container;
    currentComponent = ComponentInstance;
    hookIndex = 0;

    const vdom = ComponentInstance.render();
    const dom = createElement(vdom);

    Container.innerHTML = "";
    Container.appendChild(dom);

    setTimeout(() => ComponentInstance.componentDidMount(), 0);
  };
})();
