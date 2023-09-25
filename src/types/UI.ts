import { ReactElement } from 'react';

export interface IScreenSize {
  vw: number; //view width
  vh: number; //view height
}

export interface INavItem {
  name: string;
  icon: ReactElement<any, any>;
  link: string;
}
