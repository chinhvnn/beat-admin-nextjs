import React from 'react';
import { CaretDownFilled, GithubOutlined, MenuFoldOutlined } from '@ant-design/icons';
import BrandName from '../common/BrandName';

export interface IHeaderProps {
  screenSize: any;
  toggleMenu: () => void;
  onLogout: () => void;
}

export default function Header(props: IHeaderProps) {
  return (
    <header className="fixed z-[999] h-16 w-screen bg-white drop-shadow flex justify-between items-center px-6 py-2">
      <div>
        {props.screenSize?.vw >= 990 ? (
          <BrandName />
        ) : (
          <div
            className="flex rounded p-2 cursor-pointer hover:bg-slate-300"
            onClick={props.toggleMenu}
          >
            <MenuFoldOutlined style={{ fontSize: '1.5rem' }} />
          </div>
        )}
      </div>
      <div className="information-header">
        <div className="information-header__country"></div>
        <div id="user-dropdownbtn" className="information-header__user relative items-center">
          <div className="flex hover:cursor-pointer">
            <div className="name pr-2 items-center">User</div>
            <div className="user-icon flex items-center">
              <GithubOutlined />
            </div>
            <div className="flex items-center">
              <CaretDownFilled />
            </div>
          </div>
          <div id="user-dropdown" className="absolute hidden pt-1 right-0">
            <div className="bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
              <div
                className="px-5 py-2 hover:bg-gray-300 cursor-pointer rounded-lg"
                onClick={props.onLogout}
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
