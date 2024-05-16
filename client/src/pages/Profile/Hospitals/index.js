

import React, { useEffect } from 'react'
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../../redux/loadersSlice';
import { GetAllHospitalsOfAnOrganization } from '../../../apicalls/users';
import { getDateFormat } from '../../../utils/helpers';

function Hospitals() {

    const dispatch = useDispatch();
    const [data, setData] = React.useState([]);
    const getData = async () => {
        try {
            dispatch(SetLoading(true));
            const response = await GetAllHospitalsOfAnOrganization();
            dispatch(SetLoading(false));
            if (response.success) {
                setData(response.data);
            } else {
                throw new Error(response.message);
            }
        } catch (error) {
            message.error(error.message);
            dispatch(SetLoading(false));
        }
    };

    const columns = [
        {
            title: "Hospital Name",
            dataIndex: "hospitalName",
        }, {
            title: "Email",
            dataIndex: "email",
        }, {
            title: "Phone",
            dataIndex: "phone",
        },{
            title: "Address",
            dataIndex: "address",
        },
        // {
        //     title: "Owner Name",
        //     dataIndex: "owner",
        // },
        {
            title: "Created At",
            dataIndex: "createdAt",
            render: (text) => getDateFormat(text),
        },
    ];

    useEffect(() => {
        getData();
    }, []);
    return (
        <div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Hospitals;