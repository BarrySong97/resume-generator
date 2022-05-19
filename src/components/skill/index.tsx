import { IconMinusCircle } from '@douyinfe/semi-icons';
import { ArrayField, Button, Form } from '@douyinfe/semi-ui';
import React, { FC } from 'react';
import { Skill } from '../../pages';

export interface SkillProps {
  skill: Skill[];
  onChange: (skill: Skill) => void;
}
const SkillComp: FC<SkillProps> = ({ skill, onChange }) => {
  return (
    <div>
      <Form>
        <ArrayField field="skill">
          {({ add, arrayFields, addWithInitValue }) => (
            <React.Fragment>
              {arrayFields.map(({ field, key, remove }, i) => (
                <div key={key} className="flex justify-center items-center">
                  <Form.Input
                    field={`${field}[name]`}
                    label={'分类名'}
                    style={{ width: 130 }}
                    className="mr-4"
                  ></Form.Input>
                  <Form.Select
                    maxTagCount={4}
                    style={{ width: 311 }}
                    field={`${field}[keywords]`}
                    allowCreate={true}
                    multiple={true}
                    label="关键词"
                    filter={true}
                    className="mr-2"
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
                className="mt-2"
                theme="light"
                type="primary"
                onClick={add}
              >
                新增技能条
              </Button>
            </React.Fragment>
          )}
        </ArrayField>
      </Form>
    </div>
  );
};
export default SkillComp;
