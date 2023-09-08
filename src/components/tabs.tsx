import React, { ReactNode } from "react";

interface TabsType {
  title: string;
  content: ReactNode | string;
}

interface TabsComponentType {
  tabs: TabsType[];
  tabIndex: string;
  hasTitle: boolean;
  setTabIndex: (value: string) => void;
}

const Tabs = ({ tabs, tabIndex, setTabIndex,hasTitle }: TabsComponentType) => {
  return (
    <div className="tabs">
      {hasTitle && <h4>Select Generations</h4>}
      <div className="tabs-heading">
        {tabs.map((item, i) => {
          const isActive = item.title === tabIndex;
          return (
            <div
              className={`tabs-heading--title ${isActive ? "active" : ""}`}
              onClick={() => {
                setTabIndex(item.title);
              }}
              key={i}
            >
              {item.title}
            </div>
          );
        })}
      </div>

      {tabs.map((item, i) =>
        item.title === tabIndex ? (
          <div className="tabs-content" key={i}>
            {item.content}
          </div>
        ) : (
          ""
        )
      )}
    </div>
  );
};

export default Tabs;
