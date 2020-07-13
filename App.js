import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoiYmVrdGFsZ2F0MSIsImEiOiJja2FsNXNhYW8wcjl1Mndtd2kxZjl0ZnJlIn0.RftnfFx0YL2YmvwAP_1lMA',
);

console.disableYellowBox = true;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount();
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={styles.SubContainer}>
          <MapboxGL.MapView style={styles.Mapbox}>
            <MapboxGL.Camera
              zoomLevel={4}
              centerCoordinate={[69.155, 46.957]}
            />
            <MapboxGL.PointAnnotation coordinate={this.props} />
          </MapboxGL.MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  SubContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  Mapbox: {
    flex: 1,
  },
});
