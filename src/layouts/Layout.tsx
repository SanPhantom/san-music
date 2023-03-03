import React from "react";
import "./layout.less";

interface ILayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: ILayoutProps) => {
  const data = new Array(1000).fill(0);
  return (
    <div className="layout-page">
      <div className="layout-header"></div>
      <div className="layout-page flex-row">
        <div className="layout-side"></div>
        <div className="layout-container">
          <div className="layout-main">
            <div className="container">
              {data.map((d, i) => (
                <div key={i}>{`item ${i + 1}`}</div>
              ))}

              {children}
              <div className="toolbar"></div>
            </div>
            <div className="abs-box"></div>
          </div>
        </div>
      </div>
      <div className="layout-footer">
        <a href="https://beian.miit.gov.cn/" target="_blank">
          Copyright © 2023 - 2024 by SanPhantom
        </a>
      </div>
    </div>
  );
};

export default Layout;
