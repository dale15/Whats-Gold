
import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Container, Header, Left, Right, Body, Icon, Button, Title, Drawer, Content, Footer, FooterTab } from 'native-base';
import axios from 'axios';
import SideBar from './SideBar'

class HitRate extends Component {
  constructor(props) {
    super(props);

    this.state = {
                  trendTab: false,
                  hitRateTab: false,
                  recordTab: false,
                  riskRateTab: true,
                  navigation: props.navigation
                };

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
      this.state.navigation.navigate("MyRecord", {navigation: this.state.navigation});
    }

    toggleRiskRateTab() {
      this.setState({
        trendTab: false,
        hitRateTab: false,
        recordTab: false,
        riskRateTab: true
      });
    }

  render() {
    const {footerStyle, tabStyle} = styles;

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
          <Header hasTabs style = {tabStyle}>
            <Left>
              <Button transparent onPress = {() => openDrawer()} >
                <Icon name='menu' />
              </Button>
            </Left>
            <Body>
              <Title> Risk Ratio </Title>
            </Body>
            <Right>
              <Button transparent >
                <Icon name='share' />
              </Button>
            </Right>
          </Header>
        </Container>

        <Footer>
          <FooterTab  style = {footerStyle}>
            <Button active = {this.state.trendTab} onPress = { () => this.toggleTrendTab() }>
              <Text>Trend</Text>
            </Button>
            <Button active = {this.state.hitRateTab} onPress = { () => this.toggleHitRateTab() } >
              <Text>Hit Rate</Text>
            </Button>
            <Button active = {this.state.recordTab} onPress = { () => this.toggleRecordTab() }>
              <Text>My Record</Text>
            </Button>
            <Button active = {this.state.riskRateTab} onPress = { () => this.toggleRiskRateTab() }>
              <Text>Risk Ratio</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Drawer>

    );
  }
}

const styles = StyleSheet.create ({
    tabStyle: {
      backgroundColor: "#e5be42"
    },

    footerStyle: {
      backgroundColor: "#e5be42"
    }
});

export default HitRate
