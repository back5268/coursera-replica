import {
    InputFormDetail,
    SelectFormDetail,
    SwitchForm,
    TextAreaForm, UploadFiles
} from '@components/form';
import {LessonValidation} from '@lib/validation';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {addLessonApi, detailLessonApi, updateLessonApi} from '@api';
import {FormDetail} from '@components/base';
import {checkEqualProp} from '@utils';
import {useGetApi} from "@lib/react-query";
import {useParams} from "react-router-dom";
import {TETabs, TETabsContent, TETabsItem, TETabsPane} from "tw-elements-react";
import Questions from "@view/admin/lessons/Questions";
import {useDataState} from "@store";
import DetailQuestion from "@view/admin/questions/Detail";

const defaultValues = {
    courseId: '',
    title: '',
    author: '',
    time: 0,
    content: '',
    description: '',
    status: 1
};

const DetailLesson = (props) => {
    const {_id} = useParams()
    const [buttonActive, setButtonActive] = useState("tab1");
    const [files, setFiles] = useState([]);
    const [params, setParams] = useState({_id, render: false});
    const [show, setShow] = useState(false);
    const {courses, lessons} = useDataState();
    const isUpdate = Boolean(_id)
    const {data: item, isLoading} = useGetApi(detailLessonApi, params, 'lesson', isUpdate)

    const handleButtonClick = (value) => {
        if (value === buttonActive) {
            return;
        }
        setButtonActive(value);
    };

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(LessonValidation),
        defaultValues
    });

    useEffect(() => {
        if (isUpdate && item._id) {
            for (const key in defaultValues) {
                setValue(key, item[key]);
            }
        }
    }, [item]);

    const handleData = (data) => {
        const newData = {...data, status: data.status ? 1 : 0};
        if (isUpdate) return {...checkEqualProp(newData, item), _id};
        else return newData;
    };

    return (
        <>
            <DetailQuestion show={show} setShow={setShow} setParams={setParams} data={isUpdate && item?.lessons}
                            lessons={lessons} lessonId={_id}/>
            <FormDetail
                type={'normal'}
                title="bài giảng"
                isUpdate={isUpdate}
                insertApi={addLessonApi}
                updateApi={updateLessonApi}
                handleData={handleData}
                handleSubmit={handleSubmit}
            >
                <TETabs>
                    <TETabsItem
                        onClick={() => handleButtonClick("tab1")}
                        active={buttonActive === "tab1"}
                    >
                        Thông tin bài giảng
                    </TETabsItem>
                    <TETabsItem
                        disabled={!isUpdate}
                        onClick={() => handleButtonClick("tab2")}
                        active={buttonActive === "tab2"}
                    >
                        Danh sách câu hỏi
                    </TETabsItem>
                </TETabs>
                <TETabsContent>
                    <TETabsPane show={buttonActive === "tab1"}>
                        <div className={'flex flex-wrap'}>

                            <div className="flex flex-wrap w-full">
                                <SelectFormDetail
                                    id="courseId"
                                    label="Khóa học (*)"
                                    data={courses.map((c) => ({label: c.name, key: c._id}))}
                                    watch={watch}
                                    setValue={setValue}
                                    errors={errors}
                                />
                                <InputFormDetail id="title" label="Tiêu đề (*)" register={register}
                                                 errors={errors}/>
                                <InputFormDetail id="author" label="Tác giả (*)" register={register}
                                                 errors={errors}/>
                                <InputFormDetail type="number" id="time" label="Thời gian học (*)"
                                                 register={register}
                                                 errors={errors}/>
                                <div className="lg:w-6/12"></div>
                                <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue}/>
                                <TextAreaForm id="content" label="Nội dung (*)" className="w-full p-2" watch={watch}
                                              setValue={setValue}
                                              errors={errors}/>
                                <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch}
                                              setValue={setValue}/>
                            </div>
                            <div className={'w-full'}>
                                <UploadFiles label={'File đính kèm'} files={files} setFiles={setFiles}/>
                            </div>
                        </div>
                    </TETabsPane>
                    <TETabsPane show={buttonActive === "tab2"}>
                        <Questions data={isUpdate && item?.lessons} isLoading={isLoading}/>
                    </TETabsPane>
                </TETabsContent>
            </FormDetail>
        </>
    );
};

export default DetailLesson;
