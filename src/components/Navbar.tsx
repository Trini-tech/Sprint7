import React from 'react';
import logo from '../assets/logo.png';
import { Tiktok } from 'react-bootstrap-icons';
import { Twitter } from 'react-bootstrap-icons';
import { Instagram } from 'react-bootstrap-icons';
import { Facebook } from 'react-bootstrap-icons';
import { Youtube } from 'react-bootstrap-icons';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import { AuthData } from '../contexts/authContextProvider';

interface CustomLinkProps {
  to: string;
  children: React.ReactNode;
}

export default function Navbar(): JSX.Element {
  const { user, logout } = AuthData();

  return (
    <nav className="nav">
      <div className="grid grid-cols-3">
        <div className="socialmedia grid content-center justify-center ">
          <div className="socialmedia h-8 grid grid-cols-5 gap-3">
            <Tiktok color="white" size={20} />
            <Twitter color="white" size={20} />
            <Instagram color="white" size={20} />
            <Facebook color="white" size={20} />
            <Youtube color="white" size={20} />
          </div>
        </div>
        <div className="nav-logo h-28 flex justify-center ">
          <Link to="/">
            <img className="h-full p-5" src={logo} alt="Star Wars logo" />
          </Link>
        </div>
        <div className="login grid content-center">
          {user.isAuthenticated ? (
            <div className="menuItem flex">
              <div className="pe-3">{user.email}</div>
              <Link to={'#'} onClick={logout}>
                Log out
              </Link>
            </div>
          ) : (
            <div className="flex justify-center gap-3">
              <Link to="/login">
                <button className="btn bg-neutral border-0">Login</button>
              </Link>
              <Link to="/register">
                <button className="btn bg-secondary-content">Sign up</button>
              </Link>
            </div>
          )}
        </div>
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
