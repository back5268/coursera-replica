import {DataTable, NumberBody, TimeBody} from "@components/base";
import {updateLessonApi} from "@api";
import {useNavigate} from "react-router-dom";

const Lessons = ({data}) => {
    const navigate = useNavigate()
    const columns = [
        {label: 'Tiêu đề bài giảng', field: 'title'},
        {label: 'Tác giả', field: 'author'},
        {label: 'Thời gian học', body: (item) => NumberBody(item.time)},
        {label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt)},
        {label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt)}
    ];

    return <DataTable
        data={data} totalRecord={data?.length} columns={columns} rows={[100]}
        baseActions={['insert', 'detail']}
        actionsInfo={{onViewDetail: (item) => navigate(`/admin/lessons/detail/${item._id}`)}}
        statusInfo={{changeStatusApi: updateLessonApi}}
        headerInfo={{onInsert: () => navigate('/admin/lessons/insert')}}/>
}

export default Lessons
