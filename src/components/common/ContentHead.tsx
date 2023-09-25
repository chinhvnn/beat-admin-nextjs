import React from 'react';

export interface IContentHeadProps {}

export default function ContentHead(props: IContentHeadProps) {
  return (
    <div className="content-head">
      <div className="content-head__title"></div>
      <div className="content-head__action-btn"></div>
    </div>
  );
}
