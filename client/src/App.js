import { NavigationScroll, ScrollToTop, Toastify } from './components/base';
import Routes from './routes';

const App = () => {
  return (
    <>
      <Toastify />
      <ScrollToTop />
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </>
  );
};

export default App;
