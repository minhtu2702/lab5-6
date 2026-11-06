import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Subject from "./components/Subject";

function App() {
    return (
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/subject" element={<Subject />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App;