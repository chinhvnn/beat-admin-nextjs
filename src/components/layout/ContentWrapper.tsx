import React from 'react';

export interface IContentWrapperProps {
  children: any;
}

export default function ContentWrapper(props: IContentWrapperProps) {
  if (props.children[0]?.type?.name === 'LoginPage') return null;
  return <main className="mt-20 m-4 p-3 grow bg-neutral-100">{props.children}</main>;
}
