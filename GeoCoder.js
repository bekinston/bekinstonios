import React, {Component} from 'react';
import {Alert, View, TextInput, Text} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

export default class GeoCoder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currInput: '',
      currMatch: [],
    };
  }

  textInput(text) {
    this.setState({
      currMatch: this.props.data.filter((feature) =>
        feature.properties.name.startsWith(text),
      ),
    });
  }

  render() {
    let styles = {
      geocoder: {
        width: 200,
      },
      input: {
        borderColor: 'rgba(201,201,201,0.16)',
        backgroundColor: '#ffffff',
      },
    };
    const matches = this.state.currMatch.map((feature) => (
      <Text onPress={() => this.props.flyTo(feature.geometry.coordinates)}>
        {feature.properties.name + '\n'}
      </Text>
    ));
    return (
      <View style={styles.geocoder}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.textInput(text)}
        />

        {matches}
      </View>
    );
  }
}
