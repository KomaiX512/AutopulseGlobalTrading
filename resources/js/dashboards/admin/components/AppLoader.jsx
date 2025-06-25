import React from 'react';
import { Skeleton } from 'antd';

// const LoaderContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   background-color: rgba(255, 255, 255, 0.8);
//   z-index: 999;
// `;

const AppLoader = () => (
  // <LoaderContainer>
  <Skeleton style={{width:'100%'}} active />

  // </LoaderContainer>
);

export default AppLoader;
