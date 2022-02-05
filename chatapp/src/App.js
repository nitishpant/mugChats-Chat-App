import react,  { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Join from './component/Join/Join';
import Chat from './component/Chat/Chat';


function App() {

  return (
    <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element = {<Join/>}/>
            <Route exact path="/Chat" element = {<Chat/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
