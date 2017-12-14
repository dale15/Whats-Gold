import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ImageBackground} from 'react-native';
import {Container, Header,Left, Right, Body,Icon,Button,Title, Drawer, Content, Footer,FooterTab, Tab, Tabs, ScrollableTab, Segment } from 'native-base';
import SideBar from './SideBar';
import axios from 'axios';
import GoldTab from '../Tabs/GoldTab';
import EurTab from '../Tabs/EurTab';
import SilverTab from '../Tabs/SilverTab';
import SpxTab from '../Tabs/SpxTab';
import WtiTab from '../Tabs/WtiTab';
import DowTab from '../Tabs/DowTab';
import NasdaqTab from '../Tabs/NasdaqTab';

class HomeActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
                  categories: [],
                  selectedTab: "GOLD",
                  trendTab: true,
                  hitRateTab: false,
                  recordTab: false,
                  riskRateTab: false,
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
    this.state.navigation.navigate("RiskRatio", {navigation: this.state.navigation});
  }

  componentWillMount() {
    axios.get('http://whatsgold.com/index.php?option=com_api&view=webservicess&task=trade_api')
    .then(response => this.setState({categories: response.data.data}));
  }

  render() {
    const {footerStyle, tabStyle, container, backgroundImage} = styles;

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };

    return (
      <Drawer
      ref={ (ref) => { this.drawer = ref; } }
      content={ <SideBar navigator = {this.navigator} /> }
      onClose={() => closeDrawer()} >

        <Container>
            <View style = {{flex: 0.35}}>
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
                    <Title> TREND </Title>
                  </Body>
                  <Right>
                    <Button transparent >
                      <Icon name='share' />
                    </Button>
                  </Right>
                </Header>

                <View style = {{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  {this.state.categories.map(cat => (
                        ( (cat.category == "GOLD" || cat.category == "EUR/USD" || cat.category == "WTI CRUDE" || cat.category == "SILVER") &&
                          <Button transparent
                              style = {{flex: 1, marginLeft: 5, marginRight: 10, height: 30, backgroundColor: '#e5be42'}}
                              key = {cat.category}
                              active  = { (cat.category == this.state.selectedTab ? true : false) }
                              onPress = { () => this.setState({selectedTab: cat.category}) }>
                            <Image style = { {flex: 1, position: 'absolute'}} source = {require('../../components/Images/button_bg.png')} />
                            <Text style = {{flex: 1, textAlign: 'center', marginTop: 0}}> {cat.category} </Text>
                          </Button>
                        )
                    ))
                  }
                </View>

              <View style = {{flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  {this.state.categories.map(cat => (
                        ( (cat.category == "DOW JONES" || cat.category == "SPX" || cat.category == "NASDAQ") &&
                          <Button transparent
                              style = {{flex: 1, marginLeft: 5, marginRight: 10, height: 30, backgroundColor: '#e5be42'}}
                              key = {cat.category}
                              active  = { (cat.category == this.state.selectedTab ? true : false) }
                              onPress = { () => this.setState({selectedTab: cat.category}) }>
                            <Image style = { {flex: 1, position: 'absolute', width: 110}} source = {require('../../components/Images/button_bg.png')} />
                            <Text style = {{flex: 1, textAlign: 'center', marginTop: 0}}> {cat.category} </Text>
                          </Button>
                        )
                    ))
                  }
              </View>

            </View>

            <View style = {{flex: 1}}>
              {this.state.selectedTab === "GOLD" &&
                <GoldTab navigation = {this.props.navigation} />
              }

              {this.state.selectedTab === "SILVER" &&
                <SilverTab />
              }

              {this.state.selectedTab === "WTI CRUDE" &&
                <WtiTab />
              }

              {this.state.selectedTab === "DOW JONES" &&
                <DowTab />
              }

              {this.state.selectedTab === "EUR/USD" &&
                <EurTab />
              }

              {this.state.selectedTab === "SPX" &&
                <SpxTab />
              }

              {this.state.selectedTab === "NASDAQ" &&
                <NasdaqTab />
              }
            </View>

          <View style = {{flex: 0.12}}>

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

export default HomeActivity
