import React, {Component} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {Container, Header, Left, Right, Body, Icon, Button, Title, Drawer, Content, Footer, FooterTab, Segment} from 'native-base';
import HitRateAll from '../Tabs/HitRateAll';
import GoldTab from '../Tabs/GoldTab';


class HitRateList extends Component {
  constructor(props) {
    super(props);
    this.state = {
        posts: props.datas,
        hitratesData: [],
        selectedTab: "All",
    };

  }

  render() {
    const {textHitRateStyle} = styles;

    return(
      <Container style = {{backgroundColor: "#fff"}}>

        <View style = {{position: 'absolute'}}>
          <Image source = {require('../../components/Images/bg_all.png') } />
        </View>

        <View style = {{alignItems: "center", justifyContent: "center"}}>
          {this.state.selectedTab == "All" &&
            this.props.datas.map(hitrate => (
              (hitrate.category == "Sizzling" &&
                <Text style = {textHitRateStyle}> {hitrate.hitrate} </Text>
              )
            ))
          }

          {this.state.selectedTab == "Sizzling" &&
            this.props.datas.map(hitrate => (
              (hitrate.category == "Sizzling" &&
                <Text style = {textHitRateStyle}> {hitrate.hitrate} </Text>
              )
            ))
          }

          {this.state.selectedTab == "Hot" &&
            this.props.datas.map(hitrate => (
              (hitrate.category == "Hot" &&
                <Text style = {textHitRateStyle}> {hitrate.hitrate} </Text>
              )
            ))
          }

          {this.state.selectedTab == "Warm" &&
            this.props.datas.map(hitrate => (
              (hitrate.category == "Warm" &&
                <Text style = {textHitRateStyle}> {hitrate.hitrate} </Text>
              )
            ))
          }

          {this.state.selectedTab == "Cautious" &&
            this.props.datas.map(hitrate => (
              (hitrate.category == "Cautious" &&
                <Text style = {textHitRateStyle}> {hitrate.hitrate} </Text>
              )
            ))
          }
        </View>

        <View>
          <Segment style = {{backgroundColor: 'transparent', marginLeft: 10}}>

            <Button
                active  = { ("All" == this.state.selectedTab ? true : false) }
                onPress = { () => this.setState({selectedTab: "All"}) }>
              <Text> All </Text>
            </Button>

            {this.props.datas.map(hits => (
                <Button
                  key = {hits.category}
                  active  = { (hits.category == this.state.selectedTab ? true : false) }
                  onPress = { () => this.setState({selectedTab: hits.category}) }>
                  <Text> {hits.category} </Text>
                </Button>
              ))
            }

          </Segment>
        </View>

        <Content>
          <View>
            {this.state.selectedTab == "All" &&
              <HitRateAll allData = {this.props.allDatas} />
            }

            {this.state.selectedTab == "Sizzling" &&
              <GoldTab />
            }

            {this.state.selectedTab == "Hot" &&
              <GoldTab />
            }

            {this.state.selectedTab == "Warm" &&
              <GoldTab />
            }

            {this.state.selectedTab == "Cautious" &&
              <GoldTab />
            }

          </View>
        </Content>

      </Container>
    );
  }

}

const styles = StyleSheet.create ({
  textHitRateStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    marginTop: 5,
    marginBottom: 5
  }
});

export default HitRateList
