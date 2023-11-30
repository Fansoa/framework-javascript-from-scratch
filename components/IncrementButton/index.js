import { Component } from "../../core/MiniReact.js";
import Testing from "../Testing/index.js";

class IncrementButton extends Component {
    constructor(props) {
        const test = super(props);
        this.state = { count: 0, text: '' };
        this.handleClick = this.handleClick.bind(this);
        this.componentKey = this.generateComponentKey();
    }

    handleClick() {
        this.needsUpdate=true
        this.setState(prev => ( { ...prev, count: prev.count + 1 }))
    }

    handleClickText() {
        this.needsUpdate=true
        this.setState(prev => ( { ...prev, text: prev.text + '-' }))
    }

    render() {
        return this.createElement(
            'div',
            null,
            null,
            [
                this.createElement('TEXT_NODE', null, `${this.props.label} ${this.state.text} ${this.state.count} `, null, this.state),
                this.createElement('button',
                    { onClick: () => this.handleClick(), class: "bg-green-500" },
                    null,
                    [
                        this.createElement('TEXT_NODE', null, 'Increment state.count', null, this.state),
                    ],
                ),
                this.createElement('button',
                    { onClick: () => this.handleClickText(), class: "bg-red-500" },
                    null,
                    [
                        this.createElement('TEXT_NODE', null, 'Increment state.text', null, this.state),
                    ],
                ),
                // new Testing(
                //     { label: 'bouton'}
                // ).render()
                this.createElement(Testing, {label:'button'})
                /**
                 * tu fais un createElement, si c'est une classe tu l'instancie
                 * mais tu l'instancie que si ces props sont différent
                 * */
            ],
            this.state,
            this.componentKey,
        );
    }
}

export default IncrementButton;