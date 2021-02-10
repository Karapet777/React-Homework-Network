import React, { PureComponent } from "react";

import service from "api/service";
import ColorItem from "components/colorRequestItem/Item";

export default class ColorList extends PureComponent {
  state = {
    color: [],
  };
  componentDidMount() {
    service.getAllPhotos().then((data) => {
      this.setState({
        color: data,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.color.map((el) => (
          <ColorItem key={el.id} color={el} />
        ))}
      </div>
    );
  }
}
