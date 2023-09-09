import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentWrapper from './ContentWrapper';

export interface IAdminLayoutProps {
  children: any;
}

export default function AdminLayout(props: IAdminLayoutProps) {
  const [screenSize, setScreenSize] = useState() as any;
  const [showSidebar, setShowSidebar] = useState(screenSize?.width >= 990);

  useEffect(() => {
    checkingScreenSize();
    window.addEventListener('resize', checkingScreenSize);
    return () => {
      window.removeEventListener('resize', checkingScreenSize);
    };
  }, []);

  const checkingScreenSize = () => {
    setScreenSize({ height: window.innerHeight, width: window.innerWidth });
  };

  const toggleMenu = () => {
    setShowSidebar(!showSidebar);
  };
  console.log('111', showSidebar);

  return (
    <div className="root-wrapper min-h-screen flex">
      <div
        className="sidebar-mask fixed z-[1000] h-screen w-screen bg-gray-500 opacity-50"
        hidden={screenSize?.width >= 990 || !showSidebar}
        onClick={() => toggleMenu()}
      ></div>
      <Header screenSize={screenSize} toggleMenu={toggleMenu} />
      <Sidebar screenSize={screenSize} showSidebar={showSidebar} />
      <ContentWrapper>{props.children}</ContentWrapper>
    </div>
  );
}
