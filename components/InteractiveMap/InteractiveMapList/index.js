import MiniReact from "../../../core/MiniReact.js";
import InteractiveMapListItem from "./InteractiveMapListItem/index.js";

export default class InteractiveMapList extends MiniReact.Component {
  renderComponent() {
    const listItems = {};

    this.props.sports.forEach((sport, index) => {
      listItems[`listItem_${index}`] = new InteractiveMapListItem({
        sport,
        selectSport: this.props.selectSportString,
        selectedSport: this.props.selectedSport,
      }).renderComponent();
    });

    const components = this.getComponentsData({
      ...listItems,
    });

    this.data.content = Object.keys(components.content)
      .map((componentName) => {
        return components.content[componentName];
      })
      .join("");

    return this.data;
  }
}
