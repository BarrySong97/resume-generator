import {
  Form,
  ArrayField,
  Button,
  Tabs,
  TabPane,
  List
} from '@douyinfe/semi-ui';
import './index.css';
import { IconPlusCircle, IconMinusCircle } from '@douyinfe/semi-icons';
import React, { useState } from 'react';
import BaiscInfo from '../BasicInfo';
import Skill from '../skill';
import Work from '../work';
import Project from '../project';

export default function SidePopup() {
  return (
    <div>
      <div>
        <Tabs type="line">
          <TabPane tab="基本信息" itemKey="1">
            <BaiscInfo />
          </TabPane>
          <TabPane tab="专业技能" itemKey="2">
            <Skill />
          </TabPane>
          <TabPane tab="工作经验" itemKey="3">
            <Work />
          </TabPane>
          <TabPane tab="项目经验" itemKey="4">
            <Project />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
