import React from 'react';
import './App.css';
import {Header} from './Header';
import {Main} from './Main';
class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Main/>

            </div>
        );
    }
}

export default App;
