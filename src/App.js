import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
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
      facesCoordinates: [],
      box: {}
    };
  }

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    //const clarifaiFaces = data.outputs[0].data.regions;
    //console.log("clarifaiFaces: ", clarifaiFaces);

    const clarifaiFaces = data.outputs[0].data.regions.map(face => { 
      const faceBoxCoordinates = face.region_info.bounding_box;
      const image = document.getElementById('inputImg');
      const width = Number(image.width);
      const height = Number(image.height);
      console.log(width, height);
      return {
        leftCol: faceBoxCoordinates.left_col * width,
        topRow: faceBoxCoordinates.top_row * height,
        rightCol: width - faceBoxCoordinates.right_col * width,
        bottomRow: height - faceBoxCoordinates.bottom_row * height
      };
    })

    this.setState({ facesCoordinates: clarifaiFaces });

    //console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
    const image = document.getElementById('inputImg');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    };
  };

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

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
      .then(response => {this.displayFaceBox(this.calculateFaceLocation(response))
      console.log('response: ', response)})
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesconfig} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onSubmit}
        />
        <FaceRecognition
          facesCoordinates={this.state.facesCoordinates}
          box={this.state.box}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

export default App;
