import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import GeoCoder from './GeoCoder';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'white',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minning: true,
      production: true,
      processing: true,
      el2: true,
      'Железные Дороги': true,
      Дороги: true,
      ЛЭП: true,
    };
    this.changeVal = this.changeVal.bind(this);
  }

  changeVal(name, lineOrSymbol) {
    let tmp = {};
    tmp[name] = !this.state[name];
    console.log(tmp);
    if (tmp[name] && lineOrSymbol) {
      this.props.enableLineLayer(name);
    } else if (!tmp[name] && lineOrSymbol) {
      this.props.disableLineLayer(name);
    } else if (tmp[name] && !lineOrSymbol) {
      this.props.enableSymbolLayer(name);
    } else if (!tmp[name] && !lineOrSymbol) {
      this.props.disableSymbolLayer(name);
    }
    this.setState(tmp);
  }

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <Text>{'Производство'}</Text>
        <CheckBox
          value={this.state.production}
          onValueChange={() => this.changeVal('production', 0)}
        />
        <Text>{'Месторождение'}</Text>
        <CheckBox
          value={this.state.minning}
          onValueChange={() => this.changeVal('minning', 0)}
        />
        <Text>{'Энергетика'}</Text>
        <CheckBox
          value={this.state.energy}
          onValueChange={() => this.changeVal('energy', 0)}
        />
        <Text>{'Переработа'}</Text>
        <CheckBox
          value={this.state.processing}
          onValueChange={() => this.changeVal('processing', 0)}
        />
        <Text>{'ЛЭП'}</Text>
        <CheckBox
          value={this.state['ЛЭП']}
          onValueChange={() => this.changeVal('ЛЭП', 1)}
        />
        <Text>{'Дороги'}</Text>
        <CheckBox
          value={this.state['Дороги']}
          onValueChange={() => this.changeVal('Дороги', 1)}
        />
        <Text>{'Железные Дороги'}</Text>
        <CheckBox
          value={this.state['Железные Дороги']}
          onValueChange={() => this.changeVal('Железные Дороги', 1)}
        />
        <GeoCoder flyTo={this.props.flyTo} data={this.props.data} />
      </ScrollView>
    );
  }
}
