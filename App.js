
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";
import SideMenu from 'react-native-side-menu'


import {data} from './data';

import Menu from "./Menu";
//import GeoCoder from "./GeoCoder";

MapboxGL.setAccessToken(
    "pk.eyJ1IjoiYmVrdGFsZ2F0MSIsImEiOiJjazhwcmUyZDgwMXA4M2VxZW10Zmx1eXZ6In0.p6-S6e_jogCGmYxO2qo3OA"
);



const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: "white"
  },
  map: {
    flex: 1
  }
});


export default class App extends Component {

  state = {
    'centerCoordinate':  [ 69.155, 46.957 ],
    'line_layers': ['Железные Дороги', 'ЛЭП', 'Дороги'],
    'symbol_layers': ['minning', 'production', 'energy', 'processing'],
  }


  constructor(props) {
    super(props);

    this.centerCoordinate =
        this.bounds = {
          sw: [ 46.519, 38.800],
          ne: [ 87.575, 55.785],
        };

    let line_list = data['features'].filter((feature) => feature.geometry.type == 'LineString');
    let point_list = data['features'].filter((feature) => feature.geometry.type == 'Point');
    line_list.forEach((feature) => {
      feature.type='Feature';
    });
    point_list.forEach((feature) => {
      feature.type='Feature';
    });


    this.line_data = {
      'type': 'FeatureCollection',
      'features': line_list,
    };

    this.point_data = {
      'type': 'FeatureCollection',
      'features': point_list,
    };

    this.pointLayerStyle = {
      iconImage: ['get', 'icon'],
      textField: ['get', 'name'],
      textSize: 15,
      iconAllowOverlap: true,
      iconSize: 0.5
    };
    this.lineLayerStyle = {
      lineColor: ['get', 'color'],
      lineWidth: ['get', 'stroke-width']
    };
    this.flyTo = this.flyTo.bind(this);
    this.disableLineLayer = this.disableLineLayer.bind(this);
    this.disableSymbolLayer = this.disableSymbolLayer.bind(this);
    this.enableLineLayer = this.enableLineLayer.bind(this);
    this.enableSymbolLayer = this.enableSymbolLayer.bind(this);
    const menu = <Menu data={this.point_data.features} flyTo={this.flyTo}  enableLineLayer={this.enableLineLayer} enableSymbolLayer={this.enableSymbolLayer} disableSymbolLayer={this.disableSymbolLayer} disableLineLayer={this.disableLineLayer} />

    this.menu = menu;
  }

  flyTo(coor){
    this.setState({"centerCoordinate": coor});
  }

  disableLineLayer(name){
    this.setState({'line_layers': this.state.line_layers.filter(e => e !== name)});
  }
  disableSymbolLayer(name){
    this.setState({'symbol_layers': this.state.symbol_layers.filter(e => e !== name)});
  }
  enableLineLayer(name){
    if(this.state.line_layers.indexOf(name) === -1)
      this.setState({'line_layers': this.state.line_layers.concat(name)});
  }
  enableSymbolLayer(name){
    if(this.state.symbol_layers.indexOf(name) === -1)
      this.setState({'symbol_layers': this.state.symbol_layers.concat(name)});
  }




  componentDidMount() {
    MapboxGL.setTelemetryEnabled(false);
  }

  render() {
    //console.log(this.line_data);

    let lineLayers = this.state.line_layers.map((title) => <MapboxGL.LineLayer style={this.lineLayerStyle} key={title} id={title} filter={['==', 'title', title]}/>)
    let symbolLayers = this.state.symbol_layers.map((category) => <MapboxGL.SymbolLayer id={category} key={category} filter={['==', 'category', category]} style={this.pointLayerStyle}/>
    )
    //console.log(lineLayers);
    return (
        <SideMenu menu={this.menu}>
          <View style={styles.page}>

            <View style={styles.container}>
              <MapboxGL.MapView

                  style={styles.map}
                  styleURL="mapbox://styles/bektalgat1/ckc04fn8x356v1imnb4txweqx">

                <MapboxGL.Camera
                    centerCoordinate={this.state.centerCoordinate}
                    minZoomLevel={4}
                    zoomLevel={5}
                    animationMode={'flyTo'}
                    animationDuration={1000}
                    bounds={this.bounds}
                    maxBounds={this.bounds}
                />
                <MapboxGL.ShapeSource id="lines" shape={this.line_data} >
                  {lineLayers}
                </MapboxGL.ShapeSource>
                <MapboxGL.ShapeSource id="points" shape={this.point_data} >
                  {symbolLayers}
                </MapboxGL.ShapeSource>
              </MapboxGL.MapView >
            </View>


          </View>
        </SideMenu>
    );
  }
}
