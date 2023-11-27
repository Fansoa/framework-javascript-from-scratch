import { Component } from "../../core/MiniReact.js";

export default class Testing extends Component {
    constructor(props) {
        super(props);
        this.state = { test: 'miaou' };
        this.componentKey = this.generateComponentKey();
    }

    handleClickTesting() {
      this.setState(prev => ({ test: prev.test + 'S' }))
    }

    render() {
      return this.createElement(
          'button',
          { onClick: () => this.handleClickTesting() },
          null,
          [
              this.createElement('TEXT_NODE', null, `${this.props.label} ${this.state.test}`, null, this.state),
          ],
          this.state,
          this.componentKey,
      );
    }
}