import React from 'react';
import { GithubOutlined, MenuFoldOutlined } from '@ant-design/icons';
import BrandName from '../common/BrandName';

export interface IHeaderProps {
  screenSize: any;
  toggleMenu: any;
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
        <div className="information-header__user flex items-center">
          <div className="name pr-2">User</div>
          <div className="icon flex">
            <GithubOutlined />
          </div>
        </div>
      </div>
    </header>
  );
}
