import React from 'react';
import { Cascader } from 'antd';
import districts from './pca-code.json';

function getCode(values) {
  if (values && values.length > 0) return values[values.length - 1];
  return null;
}

function splitCodeToArray(code) {
  if (code && typeof code === 'string') {
    if (code.length > 6) {
      return [
        code.substring(0, 2),
        code.substring(0, 4),
        code.substring(0, 6),
        code,
      ];
    } else if (code.length > 4) {
      return [code.substring(0, 2), code.substring(0, 4), code.substring(0, 6)];
    } else if (code.length > 2) {
      return [code.substring(0, 2), code.substring(0, 4)];
    } else {
      return [code];
    }
  }
  return null;
}

export function DistrictSelector({ onChange, value, ...props }) {
  const triggerChange = (values, options) => {
    const code = getCode(values);
    onChange && onChange(code, options);
  };

  const arrayValue = splitCodeToArray(value);

  return (
    <Cascader
      changeOnSelect
      {...props}
      options={districts}
      onChange={triggerChange}
      value={arrayValue}
      showSearch={true}
      fieldNames={{ label: 'name', value: 'code' }}
    />
  );
}
