import React from 'react';
import {Descriptions, Empty, Tabs} from 'antd';
import columns from '../TrackingSheet/columns';
import WaybillTracking from './WaybillTracking';
import {useAxios} from "use-axios-client";

const {TabPane} = Tabs;

function WaybillDetail({waybill}) {

    const  {data} = useAxios(
        `/api/waybill/get/${waybill.waybillNumber}`
    );
    if (data) {
        const items = columns.map((column) => (
            <Descriptions.Item label={column.title} key={column.dataIndex}>
                {column.render
                    ? column.render(data[column.dataIndex], data)
                    : data[column.dataIndex]}
            </Descriptions.Item>
        ));

        return (
            <>
                <Descriptions bordered size="small" column={2}>
                    {items}
                </Descriptions>
                <Tabs defaultActiveKey="tracking">
                    <TabPane tab="跟踪信息" key="tracking" style={{padding: '1em'}}>
                        {data && (
                            <WaybillTracking waybillDetail={data}/>
                        )}
                    </TabPane>
                </Tabs>
            </>
        );
    } else return <Empty description="没有运单信息"/>;
}

export default WaybillDetail;
