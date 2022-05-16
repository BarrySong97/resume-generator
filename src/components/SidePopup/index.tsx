import {
  Form,
  ArrayField,
  Button,
  Tabs,
  TabPane,
  List
} from '@douyinfe/semi-ui';
import { IconPlusCircle, IconMinusCircle } from '@douyinfe/semi-icons';
import React, { useState } from 'react';

export default function SidePopup() {
  return (
    <div>
      <div>
        <Form
          render={({ formState, formApi, values }) => (
            <>
              <Tabs type="line">
                <TabPane tab="基本信息" itemKey="1">
                  <div className="flex mt-4">
                    <Form.Input
                      field="name"
                      placeholder={'Barry Song'}
                      label="姓名"
                      style={{ width: 100 }}
                    />
                    <Form.Input
                      field="age"
                      placeholder={'18'}
                      label="年龄"
                      style={{ width: 80 }}
                    />
                    <Form.Select
                      field="gender"
                      label="性别"
                      style={{ width: 80 }}
                    >
                      <Form.Select.Option value="male">男</Form.Select.Option>
                      <Form.Select.Option value="female">女</Form.Select.Option>
                    </Form.Select>
                    <Form.Input
                      field="year"
                      placeholder={'5'}
                      label="工作年限"
                      style={{ width: 100 }}
                    />
                  </div>
                  <div className="mt-2 flex">
                    <Form.DatePicker
                      field="birth"
                      label="出生年月"
                      type="month"
                      style={{ width: 195 }}
                      initValue={new Date()}
                    ></Form.DatePicker>
                    <Form.Input
                      field="phone"
                      style={{ width: 195 }}
                      placeholder={'12345'}
                      label="手机号/微信"
                    />
                  </div>
                  <div className="mt-2 flex">
                    <Form.Input
                      style={{ width: 195 }}
                      field="email"
                      placeholder={'xxxxx@gmail.com'}
                      label="email"
                    />
                    <Form.Input
                      style={{ width: 195 }}
                      field="collegeName"
                      label="学校名称"
                    />
                  </div>
                  <div className="mt-2 flex">
                    <Form.Input
                      style={{ width: 195 }}
                      field="major"
                      label="专业名称"
                    />
                    <Form.Select
                      initValue={'本科'}
                      field="Education"
                      label="最高学历"
                    >
                      <Form.Select.Option value="本科">本科</Form.Select.Option>
                      <Form.Select.Option value="硕士">硕士</Form.Select.Option>
                    </Form.Select>
                  </div>
                </TabPane>
                <TabPane tab="专业技能" itemKey="2">
                  <ArrayField field="skill">
                    {({ add, arrayFields, addWithInitValue }) => (
                      <React.Fragment>
                        {arrayFields.map(({ field, key, remove }, i) => (
                          <div
                            key={key}
                            className="mt-4 flex justify-center items-center"
                          >
                            <Form.Input
                              field={`${field}[name]`}
                              label={'分类名'}
                              style={{ width: 130 }}
                            ></Form.Input>
                            <Form.Select
                              maxTagCount={4}
                              style={{ width: 311 }}
                              field={`${field}[keywords]`}
                              allowCreate={true}
                              multiple={true}
                              label="关键词"
                              filter={true}
                              onChange={(v) => console.log(v)}
                              defaultActiveFirstOption
                            ></Form.Select>
                            <Button
                              type="danger"
                              theme="borderless"
                              style={{ marginTop: 20 }}
                              icon={<IconMinusCircle />}
                              onClick={remove}
                            ></Button>
                          </div>
                        ))}
                        <Button
                          className="mt-4"
                          theme="light"
                          type="primary"
                          onClick={add}
                        >
                          新增技能条
                        </Button>
                      </React.Fragment>
                    )}
                  </ArrayField>
                </TabPane>
                <TabPane tab="工作经验" itemKey="3">
                  <List
                    dataSource={[1, 2, 3]}
                    renderItem={(item) => (
                      <List.Item
                        main={
                          <div>
                            <p
                              style={{
                                color: 'var(--semi-color-text-2)'
                              }}
                            >
                              <div className="companyInfo">
                                <div className="basicInfo">
                                  <span className="text-lg leading-6 font-medium text-gray-900">
                                    保护伞公司
                                  </span>
                                  <span className="ml-2">保安</span>
                                </div>
                                <div className="timeLocInfo mt-2">
                                  <span>2021-3~2024-4 |</span>
                                  <span> 纽约</span>
                                </div>
                              </div>
                              <div className="companyDesc mt-2">
                                Semi Design
                                设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
                                Web 应用。
                              </div>
                            </p>
                          </div>
                        }
                      />
                    )}
                  />
                  <ArrayField field="workEexpirence">
                    {({ add, arrayFields, addWithInitValue }) => (
                      <React.Fragment>
                        {arrayFields.map(({ field, key, remove }, i) => (
                          <div key={key}>
                            <div
                              className="mt-4"
                              style={{ width: 1000, display: 'flex' }}
                            >
                              <Form.Input
                                field={`${field}[name]`}
                                label={'公司名'}
                                style={{ width: 200, marginRight: 16 }}
                              ></Form.Input>
                              <Form.Input
                                field={`${field}[role]`}
                                label={'角色'}
                                style={{ width: 100, marginRight: 16 }}
                              ></Form.Input>

                              <Form.Input
                                field={`${field}[loc]`}
                                label={'地点'}
                                style={{ width: 100, marginRight: 16 }}
                              ></Form.Input>
                              <Button
                                type="danger"
                                theme="borderless"
                                onClick={remove}
                                style={{ margin: 12 }}
                              ></Button>
                            </div>
                            <div className="mt-2">
                              <Form.DatePicker
                                type="dateRange"
                                density="compact"
                                label="工作年月"
                                style={{ width: 260 }}
                                field={`${field}[year]`}
                              />
                            </div>
                            <div className="mt-2">
                              <Form.TextArea
                                style={{ width: 465 }}
                                field={`${field}[desc]`}
                                label={'简介'}
                              />
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight1]`}
                                label={'highlight1'}
                                style={{ width: 465 }}
                              ></Form.Input>
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight2]]`}
                                label={'highlight2'}
                                style={{ width: 465 }}
                              ></Form.Input>
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight3]`}
                                label={'highlight3'}
                                style={{ width: 465 }}
                              ></Form.Input>
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight4]`}
                                label={'highlight4'}
                                style={{ width: 465 }}
                              ></Form.Input>
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight5]`}
                                label={'highlight5'}
                                style={{ width: 465 }}
                              ></Form.Input>
                            </div>
                          </div>
                        ))}
                        <Button
                          className="mt-4"
                          theme="light"
                          type="primary"
                          onClick={add}
                        >
                          新增公司
                        </Button>
                      </React.Fragment>
                    )}
                  </ArrayField>
                </TabPane>
                <TabPane tab="项目经验" itemKey="4">
                  <ArrayField field="projectExpirence">
                    {({ add, arrayFields, addWithInitValue }) => (
                      <React.Fragment>
                        {arrayFields.map(({ field, key, remove }, i) => (
                          <div key={key}>
                            <div
                              className="mt-4"
                              style={{ width: 1000, display: 'flex' }}
                            >
                              <Form.Input
                                field={`${field}[name]`}
                                label={'项目名称'}
                                style={{ width: 200, marginRight: 16 }}
                              ></Form.Input>
                              <Form.Input
                                field={`${field}[role]`}
                                label={'角色'}
                                style={{ width: 200, marginRight: 16 }}
                              ></Form.Input>
                              <Form.DatePicker
                                type="dateRange"
                                density="compact"
                                label="工作年月"
                                style={{ width: 260 }}
                                field={`${field}[year]`}
                              />

                              <Button
                                type="danger"
                                theme="borderless"
                                onClick={remove}
                                style={{ margin: 12 }}
                              ></Button>
                            </div>
                            <Form.Select
                              style={{ width: 400 }}
                              field={`${field}[stack]`}
                              allowCreate={true}
                              multiple={true}
                              label="技术栈"
                              filter={true}
                              onChange={(v) => console.log(v)}
                              defaultActiveFirstOption
                            ></Form.Select>
                            <div className="mt-2">
                              <Form.TextArea
                                field={`${field}[desc]`}
                                label={'简介'}
                              />
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight1]`}
                                label={'highlight1'}
                              ></Form.Input>
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight2]`}
                                label={'highlight2'}
                              ></Form.Input>
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight3]`}
                                label={'highlight3'}
                              ></Form.Input>
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight4]`}
                                label={'highlight4'}
                              ></Form.Input>
                            </div>
                            <div className="mt-2">
                              <Form.Input
                                field={`${field}[highlight5]`}
                                label={'highlight5'}
                              ></Form.Input>
                            </div>
                          </div>
                        ))}
                        <Button
                          className="mt-4"
                          theme="light"
                          type="primary"
                          onClick={add}
                        >
                          新增项目
                        </Button>
                      </React.Fragment>
                    )}
                  </ArrayField>
                </TabPane>
              </Tabs>
            </>
          )}
          layout="horizontal"
          onValueChange={(values) => console.log(values)}
        ></Form>
      </div>
    </div>
  );
}
