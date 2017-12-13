
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import axios from 'axios';
import {Container, Content} from 'native-base';
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-native-elements'

class GoldTab extends Component {

  constructor(props) {
    super(props);

    this.state = { goldData: [],
                   fill: 35,
                   data: [],
                   selectedIndex: 0,
                };
      this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  componentWillMount() {
    axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=latest_entrypoint_stoploss_closepoint_deta&category=SPX')
      .then(response => {
        this.setState( {goldData: response.data.data} );
      });

      axios.get('http://115.85.17.56/wg/api/get_latest_trade_alerts/gold')
       .then(response => {
         this.setState( {data: response.data} );
       });

  }

  render() {
    const size = 300;
    const width = 15;
    const cropDegree = 180;

    const {backgroundImage, container, letftContainer, rightContainer, midContainer, arrowImage} = styles;
    const buttons = ['3-7 days' , '7-15 days', '30 days', '90 days', '1 year'];


    return(
      <View style = {container}>
        <Image style = {{flex: 1}} source = {require('../../components/Images/bg_new.png') }/>

        <View style = {letftContainer}>
            <Image style = {{width: 50, height: 52}} source = {require('../../components/Images/bear.png')} />
        </View>

        <View style = {midContainer}>
          <Image style = {{flex: 1}} source = {require('../../components/Images/barom.png')}  />
        </View>

        <View style = {{position: 'absolute', marginTop: 120, marginLeft: 120}} >
          <Image source = {require('../../components/Images/arrow_handler.png')}  />
        </View>

        <ButtonGroup
          onPress = {this.updateIndex}
          selectedIndex = {this.state.selectedIndex}
          buttons = {buttons}
          selectedBackgroundColor = 'gold'
          textStyle = {{color: '#e5be42'}}
          containerStyle = {{position: 'absolute', height: 30, width: 340, marginTop: 190, backgroundColor: '#000'}}>
        </ButtonGroup>

        <View style = {rightContainer} >
          <Image style = {{width: 51, height: 52}} source = {require('../../components/Images/bull.png')} />
        </View>

        <View style = {{flex: 1, position: 'absolute', marginTop: 250, marginLeft: 10}}>

          <ImageBackground
            style = {{width: 50, height: 29, marginTop: 10, marginLeft: 20}}
            source = {require('../../components/Images/entry_point.png') } >
              {this.state.data.map(datas => (
                  <Text key = {datas.id} style = {{marginLeft: 2, marginTop: 6}}> { datas.entry_point }  </Text>
                ))
              }
          </ImageBackground>
          <Text style = {{color: '#fff', marginLeft: 15}}> Entry Point </Text>

          <ImageBackground
            style = {{width: 50, height: 29, marginTop: 10, marginLeft: 20}}
            source = {require('../../components/Images/entry_loss.png') } >
            {this.state.data.map(datas => (
                <Text key = {datas.id} style = {{marginLeft: 4, marginTop: 6}}> { datas.stop_loss }  </Text>
              ))
            }
          </ImageBackground>
          <Text style = {{color: '#fff', marginLeft: 20}}> Stop Loss </Text>

          <ImageBackground
            style = {{width: 50, height: 29, marginTop: 10, marginLeft: 20}}
            source = {require('../../components/Images/entry_loss.png') } >
            {this.state.data.map(datas => (
                <Text key = {datas.id} style = {{marginLeft: 8, marginTop: 6}}> { datas.profit_target }  </Text>
              ))
            }
          </ImageBackground>
          <Text style = {{color: '#fff', marginLeft: 15}}> Profit Target </Text>
        </View>

        <View style = {{flex: 1, position: 'absolute', marginTop: 250, marginLeft: 290, marginRight: 10}}>
          <Image source = {require('../../components/Images/temp.png') } />
        </View>

        <View style = {{flex: 1, position: 'absolute', alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
          <Text style = {{color: '#e5be42', marginLeft: 25, marginTop: 360}}> Risk Ratio </Text>

          <Button
            title='1250'
            buttonStyle = {{width: 80, height: 10}} />
        </View>

        <View style = {{position: 'absolute'}} >
          <Image source = {require('../../components/Images/risk_ratio.png')} style = {{marginTop: 360, marginLeft: 190}} />
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  letftContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginTop: 10
  },
  midContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 5,
  },
  rightContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: 0,
    marginRight: 10,
    marginTop: 10
  },
  arrowImage: {
    position: 'absolute',
    paddingTop: 30
  },
  backgroundImage: {
    width: 500,
  },
  textView: {
    position: 'absolute',
    top: 30,
    left: 15,
    width: 270,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GoldTab
