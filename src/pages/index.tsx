import './index.css';
import { Button, SideSheet } from '@douyinfe/semi-ui';
import React, { useState } from 'react';
import SidePopup from '../components/SidePopup';
function Index() {
  const [visible, setVisible] = useState(false);
  const change = () => {
    setVisible(!visible);
  };
  return (
    <div className="flex">
      <Button onClick={change}>Open SideSheet</Button>
      <SideSheet
        width={550}
        title="简历表单"
        visible={visible}
        onCancel={change}
      >
        <SidePopup />
      </SideSheet>
    </div>
  );
}
export default Index;
