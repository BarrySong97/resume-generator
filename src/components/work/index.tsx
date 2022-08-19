import { IconMinusCircle } from '@douyinfe/semi-icons';
import './index.css';
import {
  ArrayField,
  Button,
  Form,
  Modal,
  Notification,
  useFormApi
} from '@douyinfe/semi-ui';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Work } from '../../pages';
import dayjs from 'dayjs';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
export interface WorkProps {
  work: Work[];
  onChange: (work: Work[]) => void;
}
const WorkInfo: FC<WorkProps> = ({ work, onChange }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<FormApi>(null);
  const onClose = async (type: 'close' | 'save') => {
    if (type === 'save') {
      const api = ref.current;
      if (api) {
        const values = await api.validate();
        const { desc, loc, name, role, highlight, year } = values;

        const newWork: Work = {
          desc,
          loc,
          companyName: name,
          role,
          startDate: year[0],
          endDate: year[1],
          highlight: highlight.map((v: { name: string }) => v.name)
        };
        onChange([...work, newWork]);
      }
    }
    setVisible(false);
  };
  const renderCompanyList = () => {
    return work.map((v) => {
      return (
        <div
          key={v.companyName}
          className="cursor-pointer companyBlock rounded-lg p-2 hover:bg-gray-100"
        >
          <div
            className="p-1"
            style={{
              color: 'var(--semi-color-text-2)'
            }}
          >
            <div className="companyInfo ">
              <div className="basicInfo flex items-center justify-between">
                <div>
                  <span className="text-lg leading-6 font-medium text-gray-900">
                    {v.companyName}
                  </span>
                  <span className="ml-2 opacity-90">{v.role}</span>
                </div>

                <Button
                  type="danger"
                  theme="borderless"
                  onClick={() => {
                    onChange(
                      work.filter((w) => w.companyName !== v.companyName)
                    );
                  }}
                  icon={<IconMinusCircle />}
                ></Button>
              </div>
              <div className="timeLocInfo mt-2">
                <span className="opacity-50 text-sm">
                  {`${dayjs(v.startDate).format('YYYY 年 MM 月')} - ${dayjs(
                    v.endDate
                  ).format('YYYY 年 MM 月')}`}
                </span>
                <span className="opacity-50 text-sm text-sm text-gray">
                  {' | ' + v.loc}
                </span>
              </div>
            </div>
            <div className="companyDesc mt-2 desc text-sm  font-normal">
              {v.desc}
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div className="workListContainer">{renderCompanyList()}</div>
      <Button
        onClick={() => setVisible(true)}
        className="mt-4"
        theme="light"
        type="primary"
      >
        新增公司
      </Button>
      <Modal
        title="添加公司"
        visible={visible}
        onOk={onClose}
        onCancel={onClose}
      >
        <Form
          getFormApi={(api) => {
            ref.current = api;
          }}
          layout="horizontal"
        >
          <Form.Input
            label={{ text: '公司名', required: true }}
            rules={[{ required: true, message: '请输入公司名称' }]}
            field={'name'}
          ></Form.Input>
          <Form.Input
            style={{ width: 130 }}
            field={'role'}
            rules={[{ required: true, message: '说一下你在里面是什么牛马' }]}
            label={{ text: '角色', required: true }}
          ></Form.Input>
          <div className="flex mt-2">
            <Form.Input
              style={{ width: 100 }}
              field={'loc'}
              rules={[{ required: true, message: '在哪工作' }]}
              label={{ text: '地点', required: true }}
            ></Form.Input>
            <Form.DatePicker
              type="dateRange"
              density="compact"
              label={{ text: '工作年月', required: true }}
              rules={[{ required: true, message: '工作了多久' }]}
              style={{ width: 260 }}
              field={'year'}
            />
          </div>
          <div className="mt-2">
            <Form.TextArea
              style={{ width: 376 }}
              field={'desc'}
              rules={[{ required: true, message: '介绍一下公司' }]}
              label={{ text: '简介', required: true }}
            />
          </div>
          <div className="mt-2 ">
            <ArrayField field="highlight">
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
                          rules={[{ required: true, message: '添加了就输入' }]}
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
export default WorkInfo;
