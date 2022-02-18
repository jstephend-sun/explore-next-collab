import React from 'react';
import Image from 'next/image';
import { NavItem } from './NavItem';

type Props = {};
const Navbar = (props: Props) => {
  return (
    <>
      <div className="navbar m-4 shadow-lg bg-neutral text-neutral-content rounded-box">
        <div className="px-2 mx-2 navbar-start">
          <span className="text-lg font-bold">Project OJT</span>
        </div>
        <div className="hidden px-2 mx-2 navbar-center lg:flex">
          <div className="flex items-stretch">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/users">Users</NavItem>
            <NavItem href="/users_v2">Users v2</NavItem>
            <NavItem href="/posts">Posts</NavItem>
          </div>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="avatar m-1 btn">
              <p className="mr-2">Coolkid</p>
              <div className="rounded-full w-10 h-10 m-1">
                <Image
                  src="https://i.pravatar.cc/500?img=64"
                  alt="Picture ni user"
                  height={50}
                  width={50}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Propayl</a>
              </li>
              <li>
                <a>Lagawt</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
