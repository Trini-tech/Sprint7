import React from 'react';
import logo from '../assets/logo.png';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

export default function Navbar(): JSX.Element {
  return (
    <nav className="nav">
      <div className="nav-logo h-32 flex justify-center ">
        <Link to="/">
          <img className="h-full p-5" src={logo} alt="Star Wars logo" />
        </Link>
      </div>
      <div className="nav-links border-y border-slate-400 align-middle">
        <ul className="nav-links flex gap-3 justify-center">
          <CustomLink to="/">Home</CustomLink>
          <CustomLink to="/starships">Starships</CustomLink>
        </ul>
      </div>
    </nav>
  );
}

function CustomLink({ to, children, ...props }: CustomLinkProps): JSX.Element {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? 'border-b-2 border-blue-400' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
