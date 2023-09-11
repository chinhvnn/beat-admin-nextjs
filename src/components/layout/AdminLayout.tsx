import React, { useEffect, useState } from 'react';
import { QueryClient, useQueryClient, useQuery } from 'react-query';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentWrapper from './ContentWrapper';
import useViewport from '@/hooks/useViewport';
import { redirect } from 'next/navigation';
import LoginPage from '@/pages/login';

export interface IAdminLayoutProps {
  children: any;
}

export default function AdminLayout(props: IAdminLayoutProps) {
  const queryClient = useQueryClient();
  const { vw, vh } = useViewport() as any;
  const [showSidebar, setShowSidebar] = useState(vw >= 990);

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  if (!'user' || !'authenticated') {
    return <LoginPage />;
  } else {
    return (
      <div className="root-wrapper min-h-screen flex">
        <div
          className="sidebar-mask fixed z-[1000] h-screen w-screen bg-gray-500 opacity-50"
          hidden={vw >= 990 || !showSidebar}
          onClick={() => toggleMenu()}
        ></div>
        <Header screenSize={{ vw, vh }} toggleMenu={toggleMenu} />
        <Sidebar screenSize={{ vw, vh }} showSidebar={showSidebar} />
        <ContentWrapper>{props.children}</ContentWrapper>
      </div>
    );
  }
}
