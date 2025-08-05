import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import  MatchScoreCard  from "./pages/play-match"
import './App.css'

function App1(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/play" replace/>}/>
        <Route path="/play" element={<MatchScoreCard />}/>
        <Route path="/match" element={<MatchScoreCard />}/>
      </Routes>
      </Router> 
  );
}

export default App1;