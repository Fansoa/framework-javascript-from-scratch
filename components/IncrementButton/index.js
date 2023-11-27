import { Component } from "../../core/MiniReact.js";
import Testing from "../Testing/index.js";

class IncrementButton extends Component {
    constructor(props) {
        super(props);
        this.state = { count: 0 };
        this.handleClick = this.handleClick.bind(this);
        this.componentKey = this.generateComponentKey();
    }

    handleClick() {
        this.setState(prev => ({ count: prev.count + 1 }))
    }

    render() {
        return this.createElement(
            'div',
            null,
            null,
            [
                this.createElement('TEXT_NODE', null, `${this.props.label} ${this.state.count} `, null, this.state),
                this.createElement('button',
                    { onClick: () => this.handleClick(), class: "bg-red-500" },
                    null,
                    [
                        this.createElement('TEXT_NODE', null, 'CLICK ME', null, this.state),
                    ],
                ),
                new Testing(
                    { label: 'bouton'}
                ).render()
            ],
            this.state,
            this.componentKey,
        );
    }
}

export default IncrementButton;