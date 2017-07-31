import { StackNavigator } from 'react-navigation';

import * as Pages from 'bakareader/src/pages';

export default StackNavigator({
  home: {
    screen: Pages.Home,
  },
  infos: {
    screen: Pages.Infos,
  },
}, {
  initialRouteName: 'home',
});
