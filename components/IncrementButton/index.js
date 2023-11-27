import { Component, createElement } from "../../core/MiniReact.js";

class IncrementButton extends Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.handleClick = this.handleClick.bind(this);
    }
 
    handleClick() {
        // this.setState((state) => {
        //     return {count: state.count + 1};
        // });
        console.log("toto")
        this.setState(prev => prev.count+1)
        console.log(this.state)
        
    }
 
 
    render() {
        console.log(this.props)
        // return [
        //     <button key="1" onClick={this.handleClick}>Update counter</button>,
        //     <span key="2">{this.state.count}</span>
        // ]
        return createElement('button', { onClick: () => this.handleClick()}, null, [createElement('TEXT_NODE', null, this.props.label+this.state.count, null)])
    }
}

export default IncrementButton;