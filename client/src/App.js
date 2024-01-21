import { ConfirmModal, NavigationScroll, ScrollToTop, Toastify } from './components/base';
import Routes from './routes';

const App = () => {
  return (
    <>
      <ConfirmModal />
      <Toastify />
      <ScrollToTop />
      <NavigationScroll>
        <Routes />
      </NavigationScroll>
    </>
  );
};

export default App;
