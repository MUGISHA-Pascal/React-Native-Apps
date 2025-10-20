import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DrawerParamList } from '../navigation/DrawerNavigator';
import { DrawerScreenProps } from '@react-navigation/drawer';

type Props = DrawerScreenProps<DrawerParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 20 }}>Home Screen</Text>
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Button title="Go to Settings" onPress={() => navigation.navigate('Settings')} />
    </View>
  );
}
