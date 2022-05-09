import './index.css';
import { Form, ArrayField, Button } from '@douyinfe/semi-ui';
import Section from '@douyinfe/semi-ui/lib/es/form/section';
import React from 'react';
function Index() {
  return (
    <div className="flex">
      <div>
        <Form
          render={({ formState, formApi, values }) => (
            <>
              <Section text="个人信息" className="mb-4">
                <div className="flex mt-2">
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
                  <Form.Select field="Role" label="性别" style={{ width: 80 }}>
                    <Form.Select.Option value="male">男</Form.Select.Option>
                    <Form.Select.Option value="female">女</Form.Select.Option>
                  </Form.Select>
                  <Form.Input
                    field="name"
                    placeholder={'5'}
                    label="工作年限"
                    style={{ width: 100 }}
                  />
                  <Form.DatePicker
                    field="date"
                    label="出生年月"
                    type="month"
                    style={{ width: 135 }}
                    initValue={new Date()}
                  ></Form.DatePicker>
                </div>
                <div className="flex mt-4">
                  <Form.Input
                    field="phone"
                    placeholder={'12345'}
                    label="手机号/微信"
                    style={{ width: 290 }}
                  />
                  <Form.Input
                    field="email"
                    placeholder={'xxxxx@gmail.com'}
                    label="email"
                    style={{ width: 255 }}
                  />
                </div>
                <div className="flex mt-4">
                  <Form.Input
                    field="collegeName"
                    label="学校名称"
                    style={{ width: 290 }}
                  />
                  <Form.Select
                    style={{ minWidth: 120 }}
                    field="10shcolarship"
                    label="最高学历"
                  >
                    <Form.Select.Option value="本科">本科</Form.Select.Option>
                    <Form.Select.Option value="硕士">硕士</Form.Select.Option>
                  </Form.Select>

                  <Form.Select
                    style={{ minWidth: 120 }}
                    field="shcolarship"
                    label="专业"
                  >
                    <Form.Select.Option value="本科">本科</Form.Select.Option>
                    <Form.Select.Option value="硕士">硕士</Form.Select.Option>
                  </Form.Select>
                </div>
              </Section>
              <Section text={'专业技能'} className="mt-4 ">
                <ArrayField field="effects">
                  {({ add, arrayFields, addWithInitValue }) => (
                    <React.Fragment>
                      {arrayFields.map(({ field, key, remove }, i) => (
                        <div key={key} style={{ width: 1000, display: 'flex' }}>
                          <Form.Input
                            field={`${field}[name]`}
                            label={'分类名'}
                            style={{ width: 200, marginRight: 16 }}
                          ></Form.Input>
                          <Form.Select
                            style={{ width: 400 }}
                            field={`${field}[name]`}
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
                            onClick={remove}
                            style={{ margin: 12 }}
                          ></Button>
                        </div>
                      ))}
                      <Button
                        className="mt-4"
                        theme="light"
                        type="primary"
                        onClick={add}
                      >
                        新增空白行
                      </Button>
                    </React.Fragment>
                  )}
                </ArrayField>
              </Section>
              <Section text={'工作经验'} className="mt-4">
                <ArrayField field="effects">
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
                            <Form.Select
                              style={{ width: 200 }}
                              field={`${field}[name]`}
                              allowCreate={true}
                              multiple={true}
                              label="角色"
                              filter={true}
                              onChange={(v) => console.log(v)}
                              defaultActiveFirstOption
                            ></Form.Select>
                            <Form.DatePicker
                              type="dateRange"
                              density="compact"
                              label="工作年月"
                              style={{ width: 260 }}
                              field={`${field}[name]`}
                            />

                            <Form.Input
                              field={`${field}[name]`}
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
                            <Form.TextArea
                              field={`${field}[name]`}
                              label={'简介'}
                            />
                          </div>
                          <div>
                            <ArrayField field="hightlight">
                              {({ add, arrayFields, addWithInitValue }) => (
                                <React.Fragment>
                                  <Button
                                    className="mt-4"
                                    theme="light"
                                    type="primary"
                                    onClick={add}
                                  >
                                    新增工作两点
                                  </Button>
                                  {arrayFields.map(
                                    ({ field, key, remove }, i) => (
                                      <div key={key}>
                                        <div className="mt-2">
                                          <Form.TextArea
                                            field={`${field}[name]`}
                                            label={'简介'}
                                          />
                                        </div>
                                      </div>
                                    )
                                  )}
                                </React.Fragment>
                              )}
                            </ArrayField>
                          </div>
                        </div>
                      ))}
                      <Button
                        className="mt-4"
                        theme="light"
                        type="primary"
                        onClick={add}
                      >
                        新增空白行
                      </Button>
                    </React.Fragment>
                  )}
                </ArrayField>
              </Section>
            </>
          )}
          layout="horizontal"
          onValueChange={(values) => console.log(values)}
        ></Form>
      </div>
    </div>
  );
}
export default Index;
