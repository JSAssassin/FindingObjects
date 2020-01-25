import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './components/home';
import CameraScreen from './components/camera';

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
