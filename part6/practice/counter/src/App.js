// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        case 'ZERO':
            return 0;
        default:
            return state;
    }
};

const store = createStore(counterReducer);

const App = () => {
    return (
        <div>
            <div>{store.getState()}</div>
            <button onClick={e => store.dispatch({ type: 'INCREMENT' })}>
                plus
            </button>
            <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
                minus
            </button>
            <button onClick={e => store.dispatch({ type: 'ZERO' })}>
                zero
            </button>
        </div>
    );
};

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
