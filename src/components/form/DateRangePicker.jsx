import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

function mapToMoment(values, format) {
  if (values && values.length > 0)
    return values.map((value) => (value ? moment(value, format) : undefined));
  return undefined;
}

function removeBlank(strValues) {
  if (strValues && strValues.length > 0)
    return strValues.map((value) => (value ? value : undefined));
  return undefined;
}

export function DateRangePicker({
  value,
  defaultValue,
  format,
  onChange,
  ...props
}) {
  const mValue = mapToMoment(value, format);
  const mDefaultValue = mapToMoment(defaultValue, format);

  const onChangeAdapter = (values, strValues) => {
    onChange && onChange(removeBlank(strValues));
  };

  return (
    <DatePicker.RangePicker
      {...props}
      onChange={onChangeAdapter}
      format={format}
      value={mValue}
      defaultValue={mDefaultValue}
    />
  );
}

DateRangePicker.defaultProps = {
  format: 'YYYY-MM-DD HH:mm:ss',
};
