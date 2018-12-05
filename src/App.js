import React, { Component } from 'react';
import 'babel-polyfill';
import axios from "axios";
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Notifications from './Notifications';

import './App.css';


class App extends Component {
  state = {
    lat: 44.92,
    lng: 16.98,
    zoom: 7,
    stations: [],
    showNotifications: false,
    station: [],
    loading: false
  };

  componentWillMount() {
    this.getAllStations();
  }

  //get all stations
  getAllStations = () => {
    axios
      .get("https://api.carpo.staging.draxis.gr/v1/stations")
      .then(response => {
        this.setState({ stations: response.data, loading: true });
      })
      .catch(error => console.log(error));
  };


  //get station with {id}
  getStation = (id) => {
    axios
      .get(`https://api.carpo.staging.draxis.gr/v1/stations/${id}/measurements?variables=carpo_temp_avg`)
      .then(response => {
        this.setState({ station: response.data });
      })
      .catch(error => console.log(error));
  }

  //show notifications for the station with {id}
  showNotifications = (id) => {
    this.getStation(id);
  }

  render() {
    if (this.state.loading) {
      const position = [this.state.lat, this.state.lng];
      const notifs = this.state.station.map(x => x.notifications);

      return (
        <div className="container">
          <div className="row">
            {/*
             1. initialize map. centered at bonsia coordinates and set zoom
             2. render the markers on the map
             3. on marker click display the name of the station in the popup
             4. on marker click display display the notifications of the station
        */}
            <Map className="map" center={position} zoom={this.state.zoom}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {this.state.stations.map((station, i) => {
                return (
                  <Marker key={i} position={[station.lat, station.lon]} onClick={() => this.showNotifications(station.id)}>
                    <Popup><p>{station.name}</p></Popup>
                  </Marker>
                )
              })}
            </Map>
          </div>
          <div className="row">
            {notifs.map((notif, i) => {
              return (<Notifications key={i} {...notif} />);
            })
            }
          </div>
        </div>
      )
    } else {
      return (<div className="loader"></div>);
    }

  }
}

export default App;
