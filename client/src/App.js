import { NavigationScroll, ScrollToTop } from './components/base';
import Routes from './routes';

const App = () => {
  return (
    <>
      <ScrollToTop />
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </>
  );
};

export default App;
