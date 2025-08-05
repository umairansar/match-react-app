import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import  MatchScoreCard  from "./pages/play-match"
import RadioGroupDemo from "./pages/select-players"
import './App.css'

function App1(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/game-setup" replace/>}/>
        <Route path="/game-setup" element={<RadioGroupDemo />}/>
        <Route path="/game-play" element={<MatchScoreCard />}/>
      </Routes>
      </Router> 
  );
}

export default App1;