import * as React from 'react';
import { NavigationContainer, NavigationProp, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackHeaderProps } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import loadable from '@loadable/component';
import LoadingScreen from './screens/Loading';
import { Provider as PaperProvider, Appbar } from 'react-native-paper';
import { Image } from 'react-native';

const HomeScreen = loadable(() => import('./screens/Home'),{fallback: <LoadingScreen/>})
const ForumsScreen = loadable(() => import('./screens/Forums'),{fallback: <LoadingScreen/>})
const MoreScreen = loadable(() => import('./screens/More'),{fallback: <LoadingScreen/>})

type StackParams = {
  Root: undefined;
};
type TabParams = {
  Home: undefined;
  Forums: undefined;
  More: undefined;
};

const Tab = createMaterialBottomTabNavigator<TabParams>();

function getHeaderTitle(route: RouteProp<StackParams,"Root">&{state:any}): String {
  const routeName = route.state?.routes[route.state.index]?.name ?? "Home";

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Forums':
      return 'Forums';
    case 'More':
      return 'More';
    default:
      return 'Root';
  }
}

function RootScreen({ navigation, route }: { navigation: NavigationProp<StackParams>, route: RouteProp<StackParams,"Root">&{state:any} }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <Tab.Navigator
      initialRouteName="Home"
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
          tabBarColor: '#1976d2'
        }}
      />
      <Tab.Screen
        name="Forums"
        component={ForumsScreen}
        options={{
          tabBarLabel: 'Forums',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="chat" color={color} size={26} />
          ),
          tabBarBadge: 2,
          tabBarColor: '#1976d2'
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
          tabBarColor: '#1976d2'
        }}
      />
    </Tab.Navigator>
  );
}

function Header(props : StackHeaderProps) {
  return <Appbar.Header
    statusBarHeight={props.insets.top}
    style={{
      backgroundColor: '#1976d2',
      paddingLeft: props.insets.left,
      paddingRight: props.insets.right,
    }}
  >
    {props.navigation.canGoBack()&&<Appbar.BackAction
      onPress={()=>{}}
    />}
    <Appbar.Content
      title={props?.scene?.descriptor?.options?.headerTitle||">>"}
    />
    <Appbar.Action
      icon={({size})=><Image
        style={{height:size*1.5,width:size*1.5,marginLeft:-0.25*size,marginTop:-0.25*size}}
        source={{uri:"https://munzee.global.ssl.fastly.net/images/avatars/ua2p5m.png"}}
      />}
      onPress={()=>{}}
    />
    {/* <Appbar.Action icon="dots-vertical" onPress={()=>{}} /> */}
  </Appbar.Header>
}

const Stack = createStackNavigator<StackParams>();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: Header
          }}
        >
          <Stack.Screen name="Root" component={RootScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;