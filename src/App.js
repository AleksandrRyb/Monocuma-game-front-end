import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Title from './Components/Title/Title';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Register from './Components/Register/Register';
import Signin from './Components/Signin/Signin';
import './App.css';
import Particles from 'react-particles-js';



const particleParams = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

const initialState = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    signedIn: false,
    user: {
      id: '',
      email: '',
      name: '',
      entries: 0,
      joined: ''
    }
  }

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width =  Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      email: data.email,
      name: data.name,
      entries: data.entries,
      joined: data.joined
    }})
    console.log(this.state)
  }



  onButtonChange = (event) => {
    this.setState({imageUrl: this.state.input});
    fetch("https://whispering-plains-95677.herokuapp.com/imageUrl", {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
     .then(response => response.json())
     .then(response => {
       if(response){
         fetch("https://whispering-plains-95677.herokuapp.com/image", {
           method: 'put',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({
             id: this.state.user.id
           })
         })
         .then(response => response.json())
         .then(count =>{
           this.setState(Object.assign(this.state.user, { entries : count}))
         })
       }
        this.displayFaceBox(this.calculateFaceLocation(response))
         })
        .catch(err => console.log(err));
}


  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

onRouteChange = (route) => {
console.log(this.state)
  if (route === 'signOut'){
    this.setState(initialState);
  } else if (route === 'home'){
    this.setState({signedIn: true})
  }
    this.setState({route: route});
}

  render() {
    return (
      <div className='App'>
        <Particles
          className='particles'
          params={particleParams}
        />
        <Navigation onRouteChange={this.onRouteChange}
                    signedIn = {this.state.signedIn}
        />
        { this.state.route === 'home'
      ? <div>
          <Title />
          <Rank name={this.state.user.name}
                entries={this.state.user.entries}
          />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonChange={this.onButtonChange}
          />
          <FaceRecognition box={this.state.box}
                          imageUrl={this.state.imageUrl}
          />
        </div>

        : (this.state.route === 'signin'
        ?<Signin onRouteChange={this.onRouteChange}
                 loadUser={this.loadUser}
          />
          :<Register loadUser={this.loadUser}
                    onRouteChange={this.onRouteChange}
            />
         )

      }
      </div>
    );
  }
}

export default App;
