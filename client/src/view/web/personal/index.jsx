import { Hr } from '@components/uiCore';
import React, { useState } from 'react';
import { TETabs, TETabsContent, TETabsItem, TETabsPane } from 'tw-elements-react';
import Info from './Info';
import Setting from './Setting';

const Personal = () => {
  const [verticalActive, setVerticalActive] = useState('tab1');

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  return (
    <div className="mt-24">
      <div className="flex items-start w-full">
        <TETabs pills vertical theme={{ verticalTabs: 'mr-4 flex list-none flex-col flex-wrap pl-0 w-[320px]' }}>
          <TETabsItem onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
            Thông tin cá nhân
          </TETabsItem>
          <TETabsItem onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
            Cài đặt thông báo
          </TETabsItem>
        </TETabs>

        <TETabsContent theme={{ tabsContent: 'my-2 w-full' }}>
          <TETabsPane show={verticalActive === 'tab1'}>
            <Info />
          </TETabsPane>
          <TETabsPane show={verticalActive === 'tab2'}>
            <Setting />
          </TETabsPane>
        </TETabsContent>
      </div>
    </div>
  );
};

export default Personal;
