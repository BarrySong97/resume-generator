import { IconMinusCircle } from '@douyinfe/semi-icons';
import './index.css';
import { ArrayField, Button, Form, Modal } from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import dayjs from 'dayjs';
import React, { FC, useRef, useState } from 'react';
import { Project } from '../../pages';

export interface ProjectProps {
  project: Project[];
  onChange: (project: Project[]) => void;
}
const ProjectInfo: FC<ProjectProps> = ({ project, onChange }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<FormApi>(null);
  const onClose = () => {
    const api = ref.current;
    if (api) {
      const values = api.getValues();
      const { desc, stack, name, role, highlight, year } = values;
      const newProject: Project = {
        desc,
        techStack: stack,
        name,
        role,
        startDate: year[0],
        endDate: year[1],
        highlight: highlight.map((v: { name: string }) => v.name)
      };
      onChange([...project, newProject]);
    }

    setVisible(false);
  };
  const renderProjectList = () => {
    return project.map((v) => (
      <div key={v.name} className="cursor-pointer companyBlock p-2">
        <div
          style={{
            color: 'var(--semi-color-text-2)'
          }}
        >
          <div className="companyInfo ">
            <div className="basicInfo flex justify-between items.center">
              <div>
                <span className="text-lg leading-6 font-medium text-gray-900">
                  {v.name}
                </span>
                <span className="ml-2 opacity-90">{v.role}</span>
              </div>
              <Button
                type="danger"
                theme="borderless"
                onClick={() => {
                  onChange(project.filter((p) => p.name !== v.name));
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
            </div>
          </div>
          <div className="mt-2 text-black">{renderTechStack(v.techStack)}</div>
          <div className="companyDesc mt-2 desc text-sm  font-normal">
            {v.desc}
          </div>
        </div>
      </div>
    ));
  };
  const renderTechStack = (stack: string[]) => {
    return stack.join(' / ');
  };
  return (
    <div>
      <div>
        <div className="projectListContainer">{renderProjectList()}</div>
        <Button
          onClick={() => setVisible(true)}
          className="mt-4"
          theme="light"
          type="primary"
        >
          新增项目
        </Button>
      </div>
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
          <Form.Input field={'name'} label={'公司名'}></Form.Input>
          <Form.Input
            style={{ width: 130 }}
            field={'role'}
            label={'角色'}
          ></Form.Input>

          <div className="mt-2">
            <Form.DatePicker
              type="dateRange"
              density="compact"
              label="工作年月"
              style={{ width: 260 }}
              field={'year'}
            />
          </div>
          <div className="mt-2">
            <Form.Select
              style={{ width: 376 }}
              field={'stack'}
              allowCreate={true}
              multiple={true}
              label="技术栈"
              maxTagCount={6}
              filter={true}
              defaultActiveFirstOption
            ></Form.Select>
          </div>
          <div className="mt-2">
            <Form.TextArea
              style={{ width: 376 }}
              field={'desc'}
              label={'简介'}
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
export default ProjectInfo;
