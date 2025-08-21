import Site from './Site.jsx'
import ApplyForm from './ApplyForm.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {     
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Site />} />
                <Route path="/apply" element={<ApplyForm />} />
                <Route path="/thanks" element={<div>Thank you for applying!</div>} />
            </Routes>
        </Router>
) }
