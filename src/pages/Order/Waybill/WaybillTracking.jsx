import React from 'react';
import { Timeline, Spin, Alert, Tag } from 'antd';

function WaybillTracking({ waybillDetail }) {
  const data = waybillDetail.trackList;

  return (
    <>
      {data && data.length > 0 && (
        <Timeline>
          {data.map((item) => (
            <Timeline.Item key={item.trackId}>
              <div>
                {item.operationTime} <Tag>{item.createdBy}</Tag>
              </div>
              <div>{item.message}</div>
            </Timeline.Item>
          ))}
        </Timeline>
      )}
    </>
  );
}

export default WaybillTracking;
