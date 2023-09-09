import React from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import BrandName from '../common/BrandName';

export interface ISidebarProps {
  screenSize: any;
  showSidebar: boolean;
}

export default function Sidebar(props: ISidebarProps) {
  const renderSidebarClassName = (): string => {
    if (props.screenSize?.vw < 990) {
      let className = 'z-[1000] fixed h-screen mt-0 pt-0';
      if (props.showSidebar) {
        return className + ' w-52';
      } else {
        return className + ' w-0';
      }
    }
    return 'w-52 mt-16 pt-3';
  };

  return (
    <aside
      className={`sidebar drop-shadow-md bg-white transition-all duration-300 overflow-hidden ${renderSidebarClassName()}`}
      // hidden={props.screenSize?.vw < 990 && !props.showSidebar}
    >
      <div
        className="h-16 px-5 py-2 border-b flex items-center"
        hidden={props.screenSize?.vw >= 990}
      >
        <BrandName />
      </div>
      <div className="sidebar__nav-item-list">
        <Link
          href={'/orders'}
          className="nav-item m-1 px-5 py-2 flex items-center rounded-md hover:bg-gray-300 cursor-pointer"
        >
          <div className="nav-item__icon flex">
            <ShoppingOutlined />
          </div>
          <div className="nav-item__name pl-3">Orders</div>
        </Link>
        <Link
          href={'/customers'}
          className="nav-item m-1 px-5 py-2 flex items-center rounded-md hover:bg-gray-300 cursor-pointer"
        >
          <div className="nav-item__icon flex">
            <ShoppingOutlined />
          </div>
          <div className="nav-item__name pl-3">Customers</div>
        </Link>
        <Link
          href={'/cities'}
          className="nav-item m-1 px-5 py-2 flex items-center rounded-md hover:bg-gray-300 cursor-pointer"
        >
          <div className="nav-item__icon flex">
            <ShoppingOutlined />
          </div>
          <div className="nav-item__name pl-3">Cities</div>
        </Link>
      </div>
    </aside>
  );
}
