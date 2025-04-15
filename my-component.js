class MyComponent {
  render() {
    const [count, setCount] = MyReact.useState(0);
    const [text, setText] = MyReact.useState('Hello');

    MyReact.useEffect(() => {
      console.log("Component mounted or count changed:", count);
    }, [count]);

    return {
      type: "div",
      children: [
        { type: "h3", text: "Hook State Example" },
        {
          type: "button",
          text: "Increase",
          onClick: () => setCount(c => c + 1)
        },
        {
          type: "button",
          text: "Decrease",
          onClick: () => setCount(c => c - 1)
        },
        {
          type: "span",
          className: "result",
          text: `Clicked ${count} times`
        }
      ]
    };
  }
}

MyReactDOM.render(
  new MyComponent(),
  document.getElementById("container")
);
