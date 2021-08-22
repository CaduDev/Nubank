import React from 'react';
import QRcode from 'react-native-qrcode';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container, Code, Nav, NavItem, NavText, SingOutButton, SingOutButtonText,
} from './styles';

export default function Menu({ translateY }) {
  return (
    <Container
      style={{ opacity: translateY.interpolate({ inputRange: [0, 150], outputRange: [0, 1] }) }}
    >
      <Code />
      <Nav>
        <NavItem>
          <Icon name="help-outline" size={20} color="#fff" />
          <NavText>Me Ajuda</NavText>
        </NavItem>
        <NavItem>
          <Icon name="person-outline" size={20} color="#fff" />
          <NavText>Perfil</NavText>
        </NavItem>
        <NavItem>
          <Icon name="credit-card" size={20} color="#fff" />
          <NavText>Configurar cartão</NavText>
        </NavItem>
        <NavItem>
          <Icon name="smartphone" size={20} color="#fff" />
          <NavText>Configurações do app</NavText>
        </NavItem>
        <SingOutButton onPress={() => {}}>
          <SingOutButtonText>Sair da conta</SingOutButtonText>
        </SingOutButton>
      </Nav>
    </Container>
  );
}
