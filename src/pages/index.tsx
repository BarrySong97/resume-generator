import './index.css';
import { jsPDF } from 'jspdf';
import { Button, SideSheet, TabPane, Tabs } from '@douyinfe/semi-ui';
import WorkInfo from '../components/work';
import SkillInfo from '../components/skill';
import ProjectInfo from '../components/project';
import BaiscInfo from '../components/BasicInfo';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { IconCamera, IconEdit, IconPrint } from '@douyinfe/semi-icons';
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
  id: number;
  name: string;
  role: string;
  techStack: string[];
  startDate: Date;
  endDate: Date;
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
    schoolName: '上海电机学院',
    major: '软件工程',
    education: '本科'
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
      id: 1,
      name: 'Resident Evil',
      role: 'security',
      techStack: ['redux', 'react'],
      desc: 'test something evil',
      startDate: new Date('2021-03'),
      endDate: new Date('2022-04'),
      highlight: ['test sothing evil']
    }
  ]
};
const doc = new jsPDF();
function Index() {
  const [visible, setVisible] = useState(false);
  const [resume, setResume] = useState<ResumeInfo>(initInfo);
  const change = () => {
    setVisible(!visible);
  };
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    doc.html(ref.current, {
      x: 10,
      y: 10
    });
  }, []);
  const { basicInfo, skill, work, project } = resume;
  return (
    <div>
      <div className="page flex justify-center">
        <div className="fixed" style={{ right: 20, top: 30 }}>
          <Button
            icon={<IconEdit />}
            theme="solid"
            onClick={change}
            style={{ marginRight: 10 }}
            aria-label="截屏"
          />

          <Button
            icon={<IconPrint />}
            theme="solid"
            onClick={() => {
              doc.save();
            }}
            style={{ marginRight: 10 }}
            aria-label="截屏"
          />
        </div>
        <div ref={ref} className="resume">
          <div>
            <div className="baiscInfo">
              <div className="blockTitle">基本信息</div>
              <div className="blockCard">
                <div className="baiscInfoItem">
                  <span>{basicInfo.name} / </span>
                  <span>{basicInfo.gender === 'male' ? '男' : '女'} / </span>
                  <span>{dayjs(basicInfo.birth).format('YYYY')} </span>
                </div>
                <div className="baiscInfoItem">
                  <span>{basicInfo.education} / </span>
                  <span>{basicInfo.schoolName} / </span>
                  <span>{basicInfo.major} </span>
                </div>
                <div className="baiscInfoItem">
                  <span>Email: {basicInfo.email}</span>
                </div>
                <div className="baiscInfoItem">
                  <span>微信/手机号：{basicInfo.phone}</span>
                </div>
                <div className="baiscInfoItem">
                  <span>工作年限：{basicInfo.workAge}年</span>
                </div>
              </div>
            </div>
            <div className="skill">
              <div className="blockTitle">专业技能</div>
              <div className="blockCard">
                {skill?.map((v) => (
                  <div key={v.skillCategoryName}>
                    <strong>{v.skillCategoryName}: </strong>
                    {v.skillKeywords?.map((k, i) => (
                      <span key={k}>
                        {i === v.skillKeywords.length - 1 ? k : k + ' / '}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="work">
              <div className="blockTitle">工作经验</div>
              <div className="blockCard">
                {work.map((v) => (
                  <div key={v.companyName}>
                    <div>
                      <strong>{v.companyName} </strong>
                      <span style={{ color: '#777' }}>{v.role}</span>
                    </div>
                    <div className="workItemDate">
                      <span>
                        {`${dayjs(v.startDate).format(
                          'YYYY 年 MM 月'
                        )} - ${dayjs(v.endDate).format('YYYY 年 MM 月')}`}
                      </span>
                      <span> | {v.loc}</span>
                    </div>
                    <ul>
                      {v.highlight.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="project">
              <div className="blockTitle">工作经验</div>
              <div className="blockCard">
                {project.map((v) => (
                  <div key={v.name}>
                    <div>
                      <strong>{v.name} </strong>
                      <span style={{ color: '#777' }}>{v.role}</span>
                    </div>
                    <div className="workItemDate">
                      <span>
                        {`${dayjs(v.startDate).format(
                          'YYYY 年 MM 月'
                        )} - ${dayjs(v.endDate).format('YYYY 年 MM 月')}`}
                      </span>
                    </div>
                    <ul>
                      {v.highlight.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <SideSheet
        width={550}
        title="简历表单"
        keepDOM={true}
        visible={visible}
        onCancel={change}
      >
        <Tabs type="line">
          <TabPane tab="基本信息" itemKey="1">
            <BaiscInfo
              basicInfo={basicInfo}
              onChange={(basicInfo) => {
                setResume({ ...resume, basicInfo });
              }}
            />
          </TabPane>
          <TabPane tab="专业技能" itemKey="2">
            <SkillInfo
              skill={skill}
              onChange={(skill) => setResume({ ...resume, skill })}
            />
          </TabPane>
          <TabPane tab="工作经验" itemKey="3">
            <WorkInfo
              work={work}
              onChange={(work) => setResume({ ...resume, work })}
            />
          </TabPane>
          <TabPane tab="项目经验" itemKey="4">
            <ProjectInfo
              project={project}
              onChange={(project) => setResume({ ...resume, project })}
            />
          </TabPane>
        </Tabs>
      </SideSheet>
    </div>
  );
}
export default Index;
