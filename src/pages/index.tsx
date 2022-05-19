import './index.css';
import { Button, SideSheet, TabPane, Tabs } from '@douyinfe/semi-ui';
import React, { useState } from 'react';
import Work from '../components/work';
import Skill from '../components/skill';
import ProjectComp from '../components/project';
import BaiscInfo from '../components/BasicInfo';
export interface BasicInfo {
  name: string;
  age: number;
  gender: 'male' | 'female';
  workAge: number;
  birth: Date;
  phone: string;
  email: string;
  schoolName: string;
  major: string;
  education: string;
}

export interface Skill {
  skillCategoryName: string;
  skillKeywords: string[];
}

export interface Work {
  companyName: string;
  role: string;
  loc: string;
  startDate: Date;
  endDate: Date;
  desc: string;
  highlight: string[];
}
export interface Project {
  name: string;
  role: string;
  techStack: string[];
  desc: string;
  highlight: string[];
}
export interface ResumeInfo {
  basicInfo: BasicInfo;
  work: Work[];
  skill: Skill[];
  project: Project[];
}
const initInfo: ResumeInfo = {
  basicInfo: {
    name: 'Barry Song',
    age: 26,
    gender: 'male',
    workAge: 3,
    birth: new Date('1997-10-17'),
    phone: '121324324234',
    email: 'BarrySong97@gmail.com',
    schoolName: 'SDJU',
    major: 'soft engeneer',
    education: 'educated'
  },
  skill: [{ skillCategoryName: 'react', skillKeywords: ['redux', 'umi'] }],
  work: [
    {
      companyName: 'Umbrella Corporation',
      loc: 'Reccoon',
      role: 'web developer',
      desc: 'a evil company',
      startDate: new Date('2021-03'),
      endDate: new Date('2022-04'),
      highlight: ['kill zombie']
    }
  ],
  project: [
    {
      name: 'Resident Evil',
      role: 'security',
      techStack: ['redux', 'react'],
      desc: 'test something evil',
      highlight: ['test sothing evil']
    }
  ]
};
function Index() {
  const [visible, setVisible] = useState(false);
  const [resume, setResume] = useState<ResumeInfo>(initInfo);
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
        <Tabs type="line">
          <TabPane tab="基本信息" itemKey="1">
            <BaiscInfo
              basicInfo={resume.basicInfo}
              onChange={(basicInfo) => setResume({ ...resume, basicInfo })}
            />
          </TabPane>
          <TabPane tab="专业技能" itemKey="2">
            <Skill
              skill={resume.skill}
              onChange={(skill) => setResume({ ...resume, skill })}
            />
          </TabPane>
          <TabPane tab="工作经验" itemKey="3">
            <Work
              work={resume.work}
              onChange={(work) => setResume({ ...resume, work })}
            />
          </TabPane>
          <TabPane tab="项目经验" itemKey="4">
            <ProjectComp
              project={resume.project}
              onChange={(project) => setResume({ ...resume, project })}
            />
          </TabPane>
        </Tabs>
      </SideSheet>
    </div>
  );
}
export default Index;
