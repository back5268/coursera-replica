import {UploadImage, InputFormDetail, TextAreaForm} from '@components/form';
import { PostValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { addPostApi, updatePostApi } from '@api';
import { FormDetail } from '@components/base';
import { checkEqualProp } from '@utils';
import Editor from '@components/uiCore/Editor';

const defaultValues = {
  title: '',
  content: '',
  time: 0,
  hashtag: '',
  description: ''
};

const DetailPost = (props) => {
  const { show, setShow, setParams, data } = props;
  const [image, setImage] = useState(null);
  const isUpdate = typeof show === 'string';
  const item = isUpdate ? data.find((d) => d._id === show) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(PostValidation),
    defaultValues
  });

  useEffect(() => {
    if (item?.hashtag && Array.isArray(item.hashtag)) item.hashtag = item?.hashtag?.join(', ');
    if (item?.image) setImage(item.image)
    if (isUpdate && item._id) {
      if (item.avatar) setImage(item.image)
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const hashtag = data.hashtag?.replace(/ /g, '').split(',') || [];
    const newData = { ...data, hashtag };
    if (image) newData.formData = {image}
    else if (item.image) newData.image = ""
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: show };
    else return newData;
  };

  return (
    <FormDetail
      title="bài viết"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
        setImage(null)
      }}
      isUpdate={isUpdate}
      insertApi={addPostApi}
      updateApi={updatePostApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap">
        <div className="w-5/12 p-2">
          <UploadImage label="Ảnh mô tả" data={image} setData={setImage} />
        </div>
        <div className="w-7/12">
          <InputFormDetail id="title" label="Tiêu đề (*)" register={register} errors={errors} className={'!w-full'} />
          <InputFormDetail type="number" id="time" label="Thời gian đọc (phút) (*)" register={register} errors={errors} className={'!w-full'} />
          <InputFormDetail id="hashtag" label="Hagtag" register={register} className={'!w-full'} />
          <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
        </div>
        <Editor id="content" label="Nội dung (*)" data={watch('content')} setData={e => setValue('content', e)} />
      </div>
    </FormDetail>
  );
};

export default DetailPost;
