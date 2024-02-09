import {DataTable, TimeBody} from "@components/base";
import {updateLessonApi} from "@api";
import React from "react";
import {useNavigate} from "react-router-dom";

const Questions = ({data, isLoading}) => {
    const navigate = useNavigate()

    const columns = [
        {label: 'Câu hỏi', field: 'content'},
        {
            label: 'Câu trả lời', body: (item) => {
                const answers = item.answers
                if (Array.isArray(answers) && answers.length > 0) {
                    return answers.map((a, index) => <>
                        <span key={index}>{String.fromCharCode(65 + index)}. {a.label}</span> <br/>
                    </>)
                }
            }
        },
        {
            label: 'Đáp án', body: (item) => {
                const answers = item.answers
                if (Array.isArray(answers) && answers.length > 0) {
                    const index = answers.findIndex(a => a.isAnswer)
                    if (index >= 0) return `${String.fromCharCode(65 + index)}.${answers[index]?.label}`
                }
            }
        },
        {label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt)},
        {label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt)}
    ];

    return <DataTable
            isLoading={isLoading}
            data={data} totalRecord={data?.length} columns={columns} rows={[100]}
            baseActions={['insert', 'detail']}
            actionsInfo={{onViewDetail: (item) => navigate(`/admin/lessons/detail/${item._id}`)}}
            statusInfo={{changeStatusApi: updateLessonApi}}
            headerInfo={{onInsert: () => navigate('/admin/lessons/insert')}}/>

}

export default Questions
