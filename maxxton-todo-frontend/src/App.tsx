import { Provider } from 'react-redux'; // provide redux store to react component
import Home from './components/homePage/home';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Home/>
      </div>
    </Provider>
  );
}

export default App;
