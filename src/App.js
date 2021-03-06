import React, { Component } from "react";
import Particles from "react-particles-js";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Rank from "./components/Rank/Rank";
import particlesconfig from "./particles-config";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: ""
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

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
    fetch('https://lit-springs-28979.herokuapp.com/imageurl', {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if(response){
          fetch('https://lit-springs-28979.herokuapp.com/image', {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(
                Object.assign(this.state.user, { entries: count })
              );
            });
        }
        this.calculateFaceLocation(response)
      })
      .catch(error => console.log(error));
  };

  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, boxes, route, imageUrl } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesconfig} />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onSubmit}
            />
            <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </div>
    );
  }
}

export default App;
