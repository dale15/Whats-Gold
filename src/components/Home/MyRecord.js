
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Container, Header, Left, Right, Body, Icon, Button, Title, Drawer, Content, Footer, FooterTab } from 'native-base';
import axios from 'axios';
import SideBar from './SideBar';
import { ButtonGroup } from 'react-native-elements';

class HitRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
                  trendTab: false,
                  hitRateTab: false,
                  recordTab: true,
                  riskRateTab: false,
                  navigation: props.navigation,
                  selectedIndex: 0
                };
      this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex (selectedIndex) {
      this.setState({selectedIndex})
    }

    toggleTrendTab() {
      this.setState({
        trendTab: true,
        hitRateTab: false,
        recordTab: false,
        riskRateTab: false
      });
      this.state.navigation.navigate("HomeActivity", {screen: "HomeActivity"});
    }

    toggleHitRateTab() {
      this.setState({
        trendTab: false,
        hitRateTab: true,
        recordTab: false,
        riskRateTab: false
      });
      this.state.navigation.navigate("HitRate", {navigation: this.state.navigation});
    }

    toggleRecordTab() {
      this.setState({
        trendTab: false,
        hitRateTab: false,
        recordTab: true,
        riskRateTab: false
      });
    }

    toggleRiskRateTab() {
      this.setState({
        trendTab: false,
        hitRateTab: false,
        recordTab: false,
        riskRateTab: true
      });
      this.state.navigation.navigate("MyRecord", {navigation: this.state.navigation});
    }

    componentWillMount() {
      axios.get("")
      .then();
    }

  render() {
    const {footerStyle, tabStyle} = styles;
    const buttons = ['OPEN TRADES' , 'CLOSED TRADES'];

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };

    return(
      <Drawer
      ref={ (ref) => { this.drawer = ref; } }
      content={ <SideBar navigator = {this.navigator} /> }
      onClose={() => closeDrawer()} >

        <Container>
          <View style = {{flex: 0.15}}>

            <View style = {tabStyle}>
              <Image style = {{flex: 1, resizeMode: "stretch"}} source = {require('../../components/Images/action_bar_bg.png')} />
            </View>

            <Header hasTabs style = {{backgroundColor: 'transparent'}} >
              <Left>
                <Button transparent onPress = {() => openDrawer()} >
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Title> MY RECORD </Title>
              </Body>
              <Right>
                <Button transparent >
                  <Icon name='share' />
                </Button>
              </Right>
            </Header>
          </View>

          <View style = {{flex: 1}}>
            <View style = {{position: 'absolute'}}>
              <Image source = {require('../../components/Images/bg_all.png') } />
            </View>

            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
              <Text style = {{fontSize: 20, color: '#e5be42', marginTop: 10}}> YOU HAVE PURCHASED 0 TRADES </Text>
            </View>

            <View style = {{flexDirection: 'row'}}>
              <ImageBackground
                style = {{width: 200, height: 120, marginTop: 10, marginLeft: 20}}
                source = {require('../../components/Images/bubble.png') } >
                <Text style = {{marginTop: 40, marginLeft: 25, fontWeight: 'bold'}}> YOU HAVE PURCHASED 0.00% SUCCESSFUL TRADES </Text>
              </ImageBackground>
              <View style = {{flex: 1, flexDirection: 'column'}}>
                <Image source = {require('../../components/Images/hand.png') } style = {{width: 100, height: 100, marginLeft: 20, marginTop: 10 }} />
                <Text style = {{fontSize: 12, color: '#e5be42', marginLeft: 10, marginTop: 5}}> You have earned 0 pips </Text>
              </View>
            </View>

            <View style = {{flexDirection: 'column', marginTop: 20}}>
              <ButtonGroup
                onPress = {this.updateIndex}
                selectedIndex = {this.state.selectedIndex}
                buttons = {buttons}
                containerStyle = {{height: 50}}>

              </ButtonGroup>
            </View>

          </View>

          <View style = {{flex: 0.10}}>

            <View style = {{position: 'absolute'}}>
                <Image style = {{flex: 1, resizeMode: "stretch"}} source = {require('../../components/Images/bottom_bar_bg.png')} />
            </View>

            <Footer style = {{backgroundColor: 'transparent'}}>
              <FooterTab  style = {footerStyle}>
                <Button active = {this.state.trendTab} onPress = { () => this.toggleTrendTab() }>
                  <Text>Trend</Text>
                </Button >
                <Button active = {this.state.hitRateTab} onPress = { () => this.toggleHitRateTab() } >
                  <Text>Our Record</Text>
                </Button>
                <Button active = {this.state.recordTab} onPress = { () => this.toggleRecordTab() }>
                  <Text>My Record</Text>
                </Button>
                <Button active = {this.state.riskRateTab} onPress = { () => this.toggleRiskRateTab() }>
                  <Text>Risk Ratio</Text>
                </Button>
              </FooterTab>
            </Footer>

          </View>

        </Container>

      </Drawer>
    );
  }
}

const styles = StyleSheet.create ({
  tabStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

    footerStyle: {
      backgroundColor: "transparent"
    }
});

export default HitRate
