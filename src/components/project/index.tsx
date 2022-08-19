import { IconMinusCircle } from '@douyinfe/semi-icons';
import './index.css';
import {
  ArrayField,
  Button,
  Form,
  Modal,
  Notification
} from '@douyinfe/semi-ui';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';
import dayjs from 'dayjs';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Project } from '../../pages';

export interface ProjectProps {
  project: Project[];
  onChange: (project: Project[]) => void;
}
const ProjectInfo: FC<ProjectProps> = ({ project, onChange }) => {
  const [visible, setVisible] = useState(false);
  const [editItem, setEditItem] = useState<Project | null>();
  const ref = useRef<FormApi>(null);
  const onClose = async (type: 'close' | 'save') => {
    if (type === 'save') {
      const api = ref.current;
      if (api) {
        const values = await api.validate();
        const { desc, stack, name, role, highlight, year } = values;
        if (!highlight) {
          Notification.open({
            content: '项目干了什么好事不说一下，点一下highlight',
            duration: 3
          });
        }
        const newProject: Project = {
          id: project.length,
          desc,
          techStack: stack,
          name,
          role,
          startDate: year[0],
          endDate: year[1],
          highlight: highlight.map((v: { name: string }) => v.name)
        };
        if (editItem) {
          const oldItem = project.find((v) => v.id === editItem.id);
          if (oldItem) {
            oldItem.desc = newProject.desc;
            oldItem.endDate = newProject.endDate;
            oldItem.startDate = newProject.startDate;
            oldItem.role = newProject.role;
            oldItem.name = newProject.name;
            oldItem.highlight = newProject.highlight;
            oldItem.techStack = newProject.techStack;
          }
          setEditItem(null);
        } else {
          onChange([...project, newProject]);
        }
      }
    }
    setVisible(false);
  };
  const renderProjectList = () => {
    return project.map((v) => (
      <div
        onClick={() => {
          setVisible(true);
          const formValue = {
            year: [v.startDate, v.endDate],
            stack: v.techStack,
            ...v,
            highlight: v.highlight.map((v) => ({ name: v }))
          };
          setEditItem(formValue);
        }}
        key={v.name}
        className="cursor-pointer companyBlock p-2 rounded-lg p-2 hover:bg-gray-100"
      >
        <div
          className="p-1"
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
                onClick={(e) => {
                  e.stopPropagation();
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
        title="添加项目"
        visible={visible}
        onOk={() => onClose('save')}
        onCancel={() => onClose('close')}
      >
        <Form
          initValues={editItem}
          getFormApi={(api) => {
            ref.current = api;
          }}
          layout="horizontal"
        >
          <Form.Input
            rules={[{ required: true, message: '请输入项目名称' }]}
            label={{ text: '项目名', required: true }}
            field={'name'}
          ></Form.Input>
          <Form.Input
            style={{ width: 130 }}
            rules={[{ required: true, message: '请输入角色' }]}
            label={{ text: '角色', required: true }}
            field={'role'}
          ></Form.Input>

          <div className="mt-2">
            <Form.DatePicker
              type="dateRange"
              density="compact"
              rules={[{ required: true, message: '请选择工作年月' }]}
              label={{ text: '工作年月', required: true }}
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
              rules={[{ required: true, message: '用了什么技术说一下' }]}
              label={{ text: '技术栈', required: true }}
              maxTagCount={6}
              filter={true}
              defaultActiveFirstOption
            ></Form.Select>
          </div>
          <div className="mt-2">
            <Form.TextArea
              style={{ width: 376 }}
              rules={[{ required: true, message: '请介绍一下这个项目！' }]}
              field={'desc'}
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
