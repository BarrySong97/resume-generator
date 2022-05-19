import { IconMinusCircle } from '@douyinfe/semi-icons';
import { ArrayField, Button, Form, Modal } from '@douyinfe/semi-ui';
import React, { FC, useState } from 'react';
import { Work } from '../../pages';

export interface WorkProps {
  work: Work[];
  onChange: (work: Work[]) => void;
}
const WorkComp: FC<WorkProps> = ({ work, onChange }) => {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <div>
        <div className="cursor-pointer companyBlock p-2">
          <p
            style={{
              color: 'var(--semi-color-text-2)'
            }}
          >
            <div className="companyInfo ">
              <div className="basicInfo">
                <span className="text-lg leading-6 font-medium text-gray-900">
                  保护伞公司
                </span>
                <span className="ml-2 opacity-90">保安</span>
              </div>
              <div className="timeLocInfo mt-2">
                <span className="opacity-50 text-sm">
                  2021 年 3 月 - 2024 年 4 月
                </span>
                <span className="opacity-50 text-sm text-sm text-gray">
                  {' '}
                  | 纽约
                </span>
              </div>
            </div>
            <div className="companyDesc mt-2 desc text-sm  font-normal">
              Semi Design
              设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
              Web 应用。
            </div>
          </p>
        </div>
        <Button
          onClick={() => setVisible(true)}
          className="mt-4"
          theme="light"
          type="primary"
        >
          新增公司
        </Button>
      </div>
      <Modal
        title="添加公司"
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <Form layout="horizontal">
          <Form.Input field={'name'} label={'公司名'}></Form.Input>
          <Form.Input
            style={{ width: 130 }}
            field={'role'}
            label={'角色'}
          ></Form.Input>
          <div className="flex mt-2">
            <Form.Input
              style={{ width: 100 }}
              field={'loc'}
              label={'地点'}
            ></Form.Input>
            <Form.DatePicker
              type="dateRange"
              density="compact"
              label="工作年月"
              style={{ width: 260 }}
              field={'year'}
            />
          </div>
          <div className="mt-2">
            <Form.TextArea
              style={{ width: 376 }}
              field={'desc'}
              label={'简介'}
            />
          </div>
          <div className="mt-2 ">
            <ArrayField field="skill">
              {({ add, arrayFields, addWithInitValue }) => (
                <React.Fragment>
                  <div
                    style={{ maxHeight: 121 }}
                    className="mt-2 overflow-auto "
                  >
                    {arrayFields.map(({ field, key, remove }, i) => (
                      <div
                        key={key}
                        className="mb-2 overflow-auto flex justify-center items-center"
                      >
                        <Form.Input
                          field={`${field}[name]`}
                          noLabel
                          placeholder={`hightlight${i + 1}`}
                          style={{ width: 326 }}
                        ></Form.Input>
                        <Button
                          type="danger"
                          theme="borderless"
                          icon={<IconMinusCircle />}
                          onClick={remove}
                        ></Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    className="mt-2"
                    theme="light"
                    type="primary"
                    onClick={add}
                  >
                    新增highlight
                  </Button>
                </React.Fragment>
              )}
            </ArrayField>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
export default WorkComp;
