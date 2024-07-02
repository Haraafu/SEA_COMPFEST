import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Reservation from './page/Reservation';
import AdminDashboard from './page/AdminDashboard';
import './index.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reservation" element={<Reservation />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}
