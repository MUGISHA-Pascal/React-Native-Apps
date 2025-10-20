import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { View, Text } from 'react-native';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ padding: 20, borderBottomWidth: 1, borderColor: '#eee' }}>
        <Text style={{ fontSize: 18, fontWeight: '700' }}>Welcome, User</Text>
      </View>

      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('Home')}
      />
      <DrawerItem
        label="Settings"
        onPress={() => props.navigation.navigate('Settings')}
      />

      {/* optional bottom area */}
      <View style={{ flex: 1 }} />
      <DrawerItem
        label="Sign Out"
        onPress={() => {
          // handle sign out
        }}
      />
    </DrawerContentScrollView>
  );
}
