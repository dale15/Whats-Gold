
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground, TouchableHighlight} from 'react-native';
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
    axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=latest_entrypoint_stoploss_closepoint_deta&category=NASDAQ')
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

    const {mainContainer, leftRedBearStyle, rightGreenBullStyle, midContainer} = styles;
    const buttons = ['3-7 days' , '7-15 days', '30 days', '90 days', '1 year'];


    return(
      <View style = {{flex: 1, flexDirection: 'column'}}>

        <View style = {{flex: 1}}>
          <ImageBackground
            source = {require('../../components/Images/bg_new.png')}
            style = {mainContainer}>

              <View style = {leftRedBearStyle}>
                <Image style = {{width: 50, height: 52}} source = {require('../../components/Images/bear.png')} />
              </View>

              <View style = {midContainer}>
                <Image source = {require('../../components/Images/barom.png')}  />
                <View style = {{flex: 1, position: 'absolute' }}>
                  <Image style = {{marginTop: 190}} source = {require('../../components/Images/arrow_handler.png')}  />
                </View>
              </View>

              <View style = {rightGreenBullStyle} >
                <Image style = {{width: 51, height: 52}} source = {require('../../components/Images/bull.png')} />
              </View>

              <View style = {{flex: 1, position: 'absolute'}}>
                <ButtonGroup
                  onPress = {this.updateIndex}
                  selectedIndex = {this.state.selectedIndex}
                  buttons = {buttons}
                  selectedBackgroundColor = 'gold'
                  textStyle = {{color: '#e5be42'}}
                  containerStyle = {{height: 20, width: 340, marginTop: 195, backgroundColor: '#000'}}>
                </ButtonGroup>

              </View>

            </ImageBackground>
        </View>

        <View style = {{position: 'absolute', bottom: -10, left: -20, flexDirection: 'row'}}>

          <ImageBackground
            style = {{width: 150, height: 200}}
            source = {require('../../components/Images/under_color.png') } >
              <ImageBackground
                style = {{width: 50, height: 29, marginTop: 20, marginLeft: 50}}
                source = {require('../../components/Images/entry_point.png') } >
                  {this.state.data.map(datas => (
                      <Text key = {datas.id} style = {{marginLeft: 2, marginTop: 6}}> { datas.entry_point }  </Text>
                    ))
                  }
              </ImageBackground>
              <Text style = {{color: '#fff', marginLeft: 50}}> Entry Point </Text>

              <ImageBackground
                style = {{width: 50, height: 29, marginTop: 10, marginLeft: 50}}
                source = {require('../../components/Images/entry_loss.png') } >
                {this.state.data.map(datas => (
                    <Text key = {datas.id} style = {{marginLeft: 5, marginTop: 6}}> { datas.stop_loss }  </Text>
                  ))
                }
              </ImageBackground>
              <Text style = {{color: '#fff', marginLeft: 50}}> Stop Loss </Text>

              <ImageBackground
                style = {{width: 50, height: 29, marginTop: 10, marginLeft: 50}}
                source = {require('../../components/Images/entry_loss.png') } >
                {this.state.data.map(datas => (
                    <Text key = {datas.id} style = {{marginLeft: 8, marginTop: 6}}> { datas.profit_target }  </Text>
                  ))
                }
              </ImageBackground>
              <Text style = {{color: '#fff', marginLeft: 40}}> Profit Target </Text>

          </ImageBackground>

          <View style = {{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', bottom: -20, right: -30}}>
            <ImageBackground
              style = {{width: 150, height: 200}}
              source = {require('../../components/Images/under_color.png') } >
                <Image source = {require('../../components/Images/temp_high.png') } style = {{marginLeft: 60}} />
                <Text style = {{color: '#e5be42', marginLeft: 40}}> Risk Ratio </Text>
                <Text style = {{color: '#e5be42', marginLeft: 80, marginTop: 20, position: 'absolute',}}> High </Text>
                <Text style = {{color: '#e5be42', marginLeft: 80, marginTop: 60, position: 'absolute',}}> Low </Text>

                {this.state.data.map(datas =>
                  <Button
                    key = {datas.id}
                    title={datas.risk_ratio}
                    buttonStyle = {{backgroundColor: '#e5be42', width: 80, height: 10, marginLeft: 15}} />
                  )
                }
            </ImageBackground>

          </View>

            <TouchableHighlight
              style = {{width: 80, height: 50, position: 'absolute', marginLeft: 200, marginTop: 135}}
              onPress = { () => this.goBtnRiskRatio() }>
                <Image source = {require('../../components/Images/risk_ratio.png')} />
            </TouchableHighlight>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create ({
  mainContainer: {
    flex: 1,
    width: 375,
    height: null,
  },
  leftRedBearStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 10,
    marginTop: 10
  },
  rightGreenBullStyle: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    top: 0,
    right: 0,
    marginRight: 30,
    marginTop: 10,
  },
  midContainer: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 20,
      marginTop: 10,
  },
});

export default GoldTab
