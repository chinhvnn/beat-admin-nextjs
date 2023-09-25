import React, { Dispatch, SetStateAction } from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import BrandName from '../common/BrandName';
import { APP_ROUTES } from '@/constant/APP_ROUTES';
import { INavItem } from '@/types/UI';

export interface ISidebarProps {
  screenSize: any;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar(props: ISidebarProps) {
  const NAV_ITEM: INavItem[] = [
    {
      name: 'Orders',
      link: APP_ROUTES.ORDERS,
      icon: <ShoppingOutlined />,
    },
    {
      name: 'Cities',
      link: APP_ROUTES.CITIES,
      icon: <ShoppingOutlined />,
    },
    {
      name: 'Customers',
      link: APP_ROUTES.CUSTOMERS,
      icon: <ShoppingOutlined />,
    },
  ];

  const navItemClicked = (navItem: INavItem) => {
    props.setShowSidebar(false);
  };

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
        {NAV_ITEM.map((navItem) => (
          <div key={navItem.name}>
            <Link
              href={navItem.link}
              onClick={() => navItemClicked(navItem)}
              className="nav-item m-1 px-5 py-2 flex items-center rounded-md hover:bg-gray-300 cursor-pointer"
            >
              <div className="nav-item__icon flex">{navItem.icon}</div>
              <div className="nav-item__name pl-3">{navItem.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </aside>
  );
}
