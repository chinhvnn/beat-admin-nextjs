import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { useRouter } from 'next/router';
import { QueryClient, useQueryClient, useQuery, useMutation } from 'react-query';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentWrapper from './ContentWrapper';
import useViewport from '@/hooks/useViewport';
import LoginPage from '@/pages/login';
import { getAuthUser } from '@/services/AuthService';

export interface IAdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout(props: IAdminLayoutProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { vw, vh } = useViewport() as any;
  const [showSidebar, setShowSidebar] = useState(vw >= 990);
  const [user, setUser] = useState<any>();
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  const { isError, error, mutate } = useMutation(getAuthUser, {
    onMutate(variables) {
      setIsLoadingAuth(true);
    },
    onSuccess(data, variables, context) {
      setIsLoadingAuth(false);
      if (data.status === 200) {
        setUser(data.data);
      } else {
        onLogout();
      }
    },
  });

  useEffect(() => {}, []);

  useEffect(() => {
    console.log('111 muate useEffect', router.asPath, user?.id);
    if (router.asPath === '/login') {
      setIsLoadingAuth(false);
      if (user?.id) {
        router.push('/orders');
      }
      return;
    }

    mutate();
  }, [router.asPath]);

  const toggleMenu = (): void => {
    setShowSidebar(!showSidebar);
  };

  const onLogout = (): void => {
    setUser({});
    localStorage.clear();
    Router.push('login');
  };

  if (isLoadingAuth) {
    return <div>...LOADING</div>;
  }
  if (!isLoadingAuth && user?.id) {
    return (
      <div className="root-wrapper min-h-screen flex">
        <div
          className="sidebar-mask fixed z-[1000] h-screen w-screen bg-gray-500 opacity-50"
          hidden={vw >= 990 || !showSidebar}
          onClick={() => toggleMenu()}
        ></div>
        <Header screenSize={{ vw, vh }} toggleMenu={toggleMenu} onLogout={onLogout} />
        <Sidebar screenSize={{ vw, vh }} showSidebar={showSidebar} />
        <ContentWrapper>{props.children}</ContentWrapper>
      </div>
    );
  } else {
    return <LoginPage />;
  }
}
