import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import particlesconfig from "./particles-config";
import Clarifai from "clarifai";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const app = new Clarifai.App({
  apiKey: "b2750d116a31461bbdd26e3621c66bbd"
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      route: "signIn"
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFaces = data.outputs[0].data.regions.map(face => {
      const faceBoxCoordinates = face.region_info.bounding_box;
      const image = document.getElementById("inputImg");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: faceBoxCoordinates.left_col * width,
        topRow: faceBoxCoordinates.top_row * height,
        rightCol: width - faceBoxCoordinates.right_col * width,
        bottomRow: height - faceBoxCoordinates.bottom_row * height
      };
    });

    this.setState({ boxes: clarifaiFaces });
  };

  onInputChange = e => {
    this.setState({
      input: e.target.value,
      imageUrl: ""
    });
  };

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.calculateFaceLocation(response))
      .catch(error => console.log(error));
  };

  onRouteChange = route => {
    this.setState({
      route: route
    });
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesconfig} />
        {this.state.route === "home" ? (
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
            />
            <FaceRecognition
              boxes={this.state.boxes}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "register" ? (
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <Register onRouteChange={this.onRouteChange} />
          </div>
        ) : (
          <div>
            <Navigation onRouteChange={this.onRouteChange} />
            <SignIn onRouteChange={this.onRouteChange} />
          </div>
        )}
      </div>
    );
  }
}

export default App;
