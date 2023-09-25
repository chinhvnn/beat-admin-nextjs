import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { QueryClient, useQueryClient, useQuery, useMutation } from 'react-query';
import Header from './Header';
import Sidebar from './Sidebar';
import ContentWrapper from './ContentWrapper';
import useViewport from '@/hooks/useViewport';
import LoginPage from '@/pages/login';
import { getAuthUser } from '@/services/AuthService';
import { IScreenSize } from '@/types/UI';
import { APP_ROUTES } from '@/constant/APP_ROUTES';
import { LoadingOutlined } from '@ant-design/icons';

export interface IAdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout(props: IAdminLayoutProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { vw, vh } = useViewport() as IScreenSize;
  const [showSidebar, setShowSidebar] = useState(vw >= 990);
  const [authUser, setAuthUser] = useState<any>();
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  const {
    isError,
    error,
    mutate: authMutate,
  } = useMutation(getAuthUser, {
    onMutate(variables) {
      setIsLoadingAuth(true);
    },
    onSuccess(data, variables, context) {
      if (data.status === 200) {
        setAuthUser(data.data);
      } else {
        onLogout();
      }

      setIsLoadingAuth(false);
    },
  });

  useEffect(() => {
    if (router.asPath === '/login') {
      setIsLoadingAuth(false);
      return;
    }

    authMutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMenu = (): void => {
    setShowSidebar(!showSidebar);
  };

  const onLogout = (): void => {
    router.push(APP_ROUTES.LOGIN);
    setAuthUser({});
    localStorage.clear();
  };

  if (isLoadingAuth) {
    return (
      <div className="loading-page">
        <LoadingOutlined />
      </div>
    );
  }
  if (!isLoadingAuth && authUser?.id) {
    return (
      <div className="root-wrapper min-h-screen flex">
        <div
          className="sidebar-mask fixed z-[1000] h-screen w-screen bg-gray-500 opacity-50"
          hidden={vw >= 990 || !showSidebar}
          onClick={() => toggleMenu()}
        ></div>
        <Header
          authUser={authUser}
          screenSize={{ vw, vh }}
          toggleMenu={toggleMenu}
          onLogout={onLogout}
        />
        <Sidebar
          screenSize={{ vw, vh }}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
        <ContentWrapper>{props.children}</ContentWrapper>
      </div>
    );
  } else {
    return (
      <LoginPage setIsLoadingAuth={setIsLoadingAuth} authUser={authUser} authMutate={authMutate} />
    );
  }
}
