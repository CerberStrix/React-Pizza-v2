import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={0}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="136" cy="125" r="124" />
    <rect x="0" y="269" rx="10" ry="10" width="274" height="27" />
    <rect x="0" y="315" rx="15" ry="15" width="274" height="67" />
    <rect x="0" y="407" rx="10" ry="10" width="101" height="27" />
    <rect x="125" y="400" rx="15" ry="15" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
