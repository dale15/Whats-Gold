import React, {Component} from "react";
import { Text, Image, View, Alert, AsyncStorage } from "react-native";
import { Container, Button, Content, List, ListItem, Left, Body, Right } from "native-base";

class SideBar extends Component {
  render() {
    return (
      <Container>
          <Content style={{
                  backgroundColor: "#e5be42"
              }}>
                  <Text
                      style = {{
                          marginTop: 10,
                          color: "#FFFFFF",
                          fontSize: 16,
                          fontWeight: "bold"
                      }} >
                  </Text>
          </Content>
      </Container>
    );
  }
}

export default SideBar;
