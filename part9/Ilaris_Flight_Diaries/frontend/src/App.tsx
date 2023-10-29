import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DiaryList from "./components/DiaryList";
import DiaryForm from "./components/DiaryForm"; // Import your DiaryForm component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>
          <DiaryForm /> 
          <DiaryList /> 
        </div>} />
      </Routes>
    </Router>
  );
}

export default App;
