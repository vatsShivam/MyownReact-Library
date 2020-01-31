class MyComponent extends MyReact.Component {
    constructor(props) {
      super(props);
      this.state = { count: 0, text: 'abc' };
  
    }
  
    componentDidMount() {
      console.log('hjk');
    }
  
    onClick = () => {
      this.setState({
        count: this.state.count + 1,
      });
    }
  
    onDecrease = () => {
      this.setState({
        count: this.state.count - 1,
      });
    }
  
    render() {
      return {
        type: "div",
        children: [{
          type: "h3",
          text: "State Example",
        }, {
          type: "button",
          text: "Increase Counter",
          onClick: this.onClick,
        }, {
          type: "button",
          text: "Decrease Counter",
          onClick: this.onDecrease,
  
        }, {
          type: "span",
          className: "result",
          onBlur: () => console.log("You're not fucking gtting it"),
          text: `Clicked ${this.state.count} times`,
        }],
      };
    }
  }
  
  MyReactDOM.render(
    new MyComponent(),
    document.getElementById("container"),
    
  );
  
  