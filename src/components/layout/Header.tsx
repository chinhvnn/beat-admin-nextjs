import React from 'react';
import { CaretDownFilled, GithubOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { IScreenSize } from '@/types/UI';
import BrandName from '../common/BrandName';
import Image from 'next/image';
import DefaultAvatar from '../../../public/img/default-avatar.png';

export interface IHeaderProps {
  screenSize: IScreenSize;
  authUser: any;
  toggleMenu: () => void;
  onLogout: () => void;
}

export default function Header(props: IHeaderProps) {
  console.log('111', props.authUser);

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
        <div id="user-dropdown-btn" className="information-header__user relative items-center">
          <div className="flex hover:cursor-pointer">
            <div className="name pr-2 items-center">{props.authUser?.username}</div>
            <div className="user-avatar pr-2 flex items-center">
              <Image
                src={props.authUser?.avatar || DefaultAvatar}
                alt="avatar"
                className="rounded-full"
                width={30}
                height={30}
              />
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
