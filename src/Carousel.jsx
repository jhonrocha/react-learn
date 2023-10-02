import React from "react";
import { Component } from "react";

export default class Carousel extends Component {
  state = { active: 0 };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  setActive = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            <img
              src={photo}
              data-index={index}
              alt="pet thumb"
              onClick={this.setActive}
              className={index === active ? "active" : ""}
              key={photo}
            />
          ))}
        </div>
      </div>
    );
  }
}
