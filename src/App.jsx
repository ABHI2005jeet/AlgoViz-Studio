import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Sorting from './pages/Sorting';
import Graphs from './pages/Graphs';
import DP from './pages/DP';
import Recursion from './pages/Recursion';

export default function App() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-900 text-white">
      <Sidebar />
      <main className="flex-1 min-w-0 p-4 md:p-8">
        <Routes>
          <Route path="/" element={<Navigate to="/sorting" replace />} />
          <Route path="/sorting" element={<Sorting />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/dp" element={<DP />} />
          <Route path="/recursion" element={<Recursion />} />
        </Routes>
      </main>
    </div>
  );
}