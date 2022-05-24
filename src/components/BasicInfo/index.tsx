import { Button, Form, useFormApi } from '@douyinfe/semi-ui';
import React, { FC, useEffect, useRef } from 'react';
import { BasicInfo } from '../../pages';
export interface BasicInfoProps {
  basicInfo: BasicInfo;
  onChange: (basicInfo: BasicInfo) => void;
}
const BaiscInfo: FC<BasicInfoProps> = ({ onChange, basicInfo }) => {
  return (
    <div>
      <Form
        initValues={basicInfo}
        onValueChange={(v) => onChange(v as BasicInfo)}
      >
        <div className="flex mt-4">
          <Form.Input
            field="name"
            placeholder={'Barry Song'}
            label="姓名"
            className="mr-4"
            style={{ width: 100 }}
          />
          <Form.Input
            field="age"
            className="mr-4"
            placeholder={'18'}
            label="年龄"
            style={{ width: 80 }}
          />
          <Form.Select
            className="mr-4"
            field="gender"
            label="性别"
            style={{ width: 80 }}
          >
            <Form.Select.Option value="male">男</Form.Select.Option>
            <Form.Select.Option value="female">女</Form.Select.Option>
          </Form.Select>
          <Form.Input
            field="workAge"
            className="mr-4"
            placeholder={'5'}
            label="工作年限"
            style={{ width: 100 }}
          />
        </div>
        <div className="mt-2 flex">
          <Form.DatePicker
            field="birth"
            label="出生年月"
            className="mr-4"
            type="month"
            style={{ width: 195 }}
          ></Form.DatePicker>
          <Form.Input
            field="phone"
            style={{ width: 195 }}
            placeholder={'12345'}
            label="手机号/微信"
            className="mr-4"
          />
        </div>
        <div className="mt-2 flex">
          <Form.Input
            style={{ width: 195 }}
            className="mr-4"
            field="email"
            placeholder={'xxxxx@gmail.com'}
            label="email"
          />
          <Form.Input
            style={{ width: 195 }}
            field="schoolName"
            label="学校名称"
            className="mr-4"
          />
        </div>
        <div className="mt-2 flex">
          <Form.Input
            className="mr-4"
            style={{ width: 195 }}
            field="major"
            label="专业名称"
          />
          <Form.Select
            className="mr-4"
            initValue={'本科'}
            field="education"
            label="最高学历"
          >
            <Form.Select.Option value="本科">本科</Form.Select.Option>
            <Form.Select.Option value="硕士">硕士</Form.Select.Option>
          </Form.Select>
        </div>
      </Form>
    </div>
  );
};
export default BaiscInfo;
