import { NavLink } from 'react-router-dom';

const links = [
  { to: '/sorting', label: 'Sorting' },
  { to: '/graphs', label: 'Pathfinding' },
  { to: '/dp', label: 'DP Table' },
  { to: '/recursion', label: 'Recursion' },
];

export default function Sidebar() {
  return (
    <aside className="w-full md:w-56 shrink-0 bg-slate-950 p-4 md:p-6">
      <h1 className="text-xl font-bold mb-3 md:mb-6">AlgoViz Studio</h1>
      <nav className="flex flex-row flex-wrap md:flex-col gap-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? 'bg-sky-600' : 'hover:bg-slate-800'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}