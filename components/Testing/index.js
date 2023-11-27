import { Component } from "../../core/MiniReact.js";

export default class Testing extends Component {
    constructor(props) {
        super(props);
        this.state = { test: 'miaou' };
        this.key = this.generateKey();
    }

    render() {
      return this.createElement(
          'button',
          null,
          null,
          [
              this.createElement('TEXT_NODE', null, this.props.label, null, this.state),
          ],
          this.state,
          this.generateKey(),
      );
    }
}