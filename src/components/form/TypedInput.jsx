import React from 'react';
import { Input, Select } from 'antd';
import styles from './TypedInput.module.less';

export function TypedInput({
  value: { type, text },
  selectProps,
  selectOptions,
  inputProps,
  onChange,
}) {
  const triggerChange = (changedValue) => {
    onChange && onChange(changedValue);
  };

  const onSelectChange = (changedValue) => {
    triggerChange({ type: changedValue, text });
  };

  const onTextChange = (e) => {
    const changedValue = e.target.value;
    triggerChange({ type, text: changedValue });
  };

  return (
    <Input.Group compact className={styles.group}>
      <Select
        {...selectProps}
        value={type}
        onChange={onSelectChange}
        className={styles.select}>
        {selectOptions.map((item) => (
          <Select.Option key={item.value} value={item.value}>
            {item.label}
          </Select.Option>
        ))}
      </Select>
      <Input
        allowClear={true}
        {...inputProps}
        value={text}
        onChange={onTextChange}
        className={styles.input}
      />
    </Input.Group>
  );
}

TypedInput.defaultProps = {
  value: {},
  selectOptions: [],
};
