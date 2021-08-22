import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Animated, NativeEventEmitter } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Header from '~/components/Header';
import Tabs from '~/components/Tabs';
import Menu from '~/components/Menu';
import {
  Container,
  Content,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  Title,
  Description,
  Annotation,
} from './style';

export default function Main() {
  let offset = 0;
  const translateY = new Animated.Value(0);
  const animateEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  );
  function onHandlerStateChanged(event) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      let opened = false;
      const { translationY } = event.nativeEvent;

      offset += translationY;

      if (translationY >= 100) {
        opened = true;
      } else {
        translateY.setValue(offset);
        translateY.setOffset(0);
        offset = 0;
      }
      Animated.timing(translateY, {
        toValue: opened ? 400 : 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        offset = opened ? 400 : 0;
        translateY.setOffset(offset);
        translateY.setValue(0);
      });
    }
  }
  return (
    <Container>
      <Header />
      <Content>
        <Menu translateY={translateY} />
        <PanGestureHandler
          onGestureEvent={animateEvent}
          onHandlerStateChange={onHandlerStateChanged}
        >
          <Card
            style={{
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [-350, 0, 400],
                    outputRange: [-20, 0, 400],
                    extrapolate: 'clamp',
                  }),
                },
              ],
            }}
          >
            <CardHeader>
              <Icon name="attach-money" size={28} color="#666" />
              <Icon name="visibility-off" size={28} color="#666" />
            </CardHeader>
            <CardContent>
              <Title>Saldo disponível</Title>
              <Description>R$ 7.611,65</Description>
            </CardContent>
            <CardFooter>
              <Annotation>Trasnferencia de R$ 20,00 Recebida de Cadu hoje às 06:00hr</Annotation>
            </CardFooter>
          </Card>
        </PanGestureHandler>
      </Content>

      <Tabs translateY={translateY} />
    </Container>
  );
}
