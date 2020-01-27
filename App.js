import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './components/home';
import CameraScreen from './components/camera';
import WinScreen from './components/endscreen';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen,
    End: WinScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);

export default createAppContainer(AppNavigator);
