import {
    UploadImage,
    InputFormDetail,
    MultiCheckBox,
    SelectFormDetail,
    SwitchForm,
    TextAreaForm
} from '@components/form';
import {CourseValidation} from '@lib/validation';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {addCourseApi, detailCourseApi, updateCourseApi} from '@api';
import {FormDetail} from '@components/base';
import {checkEqualProp, removeSpecialCharacter} from '@utils';
import {courseCharacteristic, courseType} from '@constant';
import {useParams} from "react-router-dom";
import {useGetApi} from "@lib/react-query";
import {TETabs, TETabsContent, TETabsItem, TETabsPane} from "tw-elements-react";
import Lessons from "@view/admin/courses/Lessons";

const defaultValues = {
    name: '',
    code: '',
    skills: '',
    price: 0,
    sale: 0,
    description: '',
    status: 1,
    characteristic: []
};

const Detail = (props) => {
    const {_id} = useParams()
    const [image, setImage] = useState(null);
    const [buttonActive, setButtonActive] = useState("tab1");
    const isUpdate = Boolean(_id)
    const item = useGetApi(detailCourseApi, {_id}, 'course', isUpdate)

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
        resolver: yupResolver(CourseValidation),
        defaultValues
    });

    useEffect(() => {
        if (isUpdate && item._id) {
            if (item.avatar) setImage(item.image)
            const characteristic = [];
            if (item.isHot) characteristic.push('isHot');
            if (item.isNew) characteristic.push('isNew');
            item.characteristic = characteristic;
            if (item?.skills && Array.isArray(item.skills)) item.skills = item?.skills?.join(', ');
            for (const key in defaultValues) {
                setValue(key, item[key]);
            }
        }
    }, [item]);

    const handleData = (data) => {
        const skills = data.skills?.replace(/ /g, '').split(',') || [];
        const isHot = data.characteristic?.includes('isHot');
        const isNew = data.characteristic?.includes('isNew');
        const newData = {...data, skills, isHot, isNew, status: data.status ? 1 : 0, characteristic: undefined};
        if (image) newData.formData = {image}
        else if (item.image) newData.image = ""
        if (isUpdate) return {...checkEqualProp(newData, item), status: data.status ? 1 : 0, _id};
        else return newData;
    };

    return (
        <FormDetail
            type={'normal'}
            title="khóa học"
            isUpdate={isUpdate}
            insertApi={addCourseApi}
            updateApi={updateCourseApi}
            handleData={handleData}
            handleSubmit={handleSubmit}
        >
            <TETabs>
                <TETabsItem
                    onClick={() => handleButtonClick("tab1")}
                    active={buttonActive === "tab1"}
                >
                    Thông tin khóa học
                </TETabsItem>
                <TETabsItem
                    disabled={!isUpdate}
                    onClick={() => handleButtonClick("tab2")}
                    active={buttonActive === "tab2"}
                >
                    Danh sách bài giảng
                </TETabsItem>
            </TETabs>
            <TETabsContent>
                <TETabsPane show={buttonActive === "tab1"}>
                    <div className={'flex flex-wrap'}>
                        <div className="sm:w-full lg:w-4/12 p-2">
                            <UploadImage label="Hình ảnh khóa học" data={image} setData={setImage}/>
                        </div>
                        <div className="flex flex-wrap sm:w-full lg:w-8/12">
                            <InputFormDetail id="name" label="Tên khóa học (*)" register={register} errors={errors}/>
                            <InputFormDetail id="code" label="Mã khóa học (*)" register={register} errors={errors}/>
                            <InputFormDetail label="Slug (*)" value={removeSpecialCharacter(watch('name')) || ''} disabled/>
                            <SelectFormDetail
                                id="type"
                                label="Thể loại (*)"
                                data={courseType}
                                watch={watch}
                                setValue={setValue}
                                errors={errors}
                            />
                            <InputFormDetail id="skills" label="Kỹ năng" register={register}/>
                            <InputFormDetail type="number" id="price" label="Giá" register={register} errors={errors}/>
                            <InputFormDetail type="number" id="sale" label="Khuyến mãi" register={register}
                                             errors={errors}/>
                            <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue}/>
                            <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch}
                                          setValue={setValue}/>
                            <MultiCheckBox
                                data={courseCharacteristic}
                                value={watch('characteristic')}
                                onChange={(e) => setValue('characteristic', e)}
                            />
                        </div>
                    </div>
                </TETabsPane>
                <TETabsPane show={buttonActive === "tab2"}>
                    <Lessons/>
                </TETabsPane>
            </TETabsContent>
        </FormDetail>
    );
};

const DetailCourse = () => {
    return
}

export default Detail;
