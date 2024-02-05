import { InputFormDetail, TextAreaForm } from '@components/form';
import { PostValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addPostApi, updatePostApi } from '@api';
import { FormDetailModal } from '@components/base';
import { checkEqualProp } from '@utils';
import Editor from '@components/uiCore/Editor';

const defaultValues = {
  title: '',
  content: '',
  time: 0,
  hashtag: ''
};

const DetailPost = (props) => {
  const { show, setShow, setParams, data } = props;
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
    if (isUpdate && item._id) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const hashtag = data.hashtag?.replace(/ /g, '').split(',') || [];
    const newData = { ...data, hashtag };
    if (isUpdate) return { ...checkEqualProp(newData, item), _id: show };
    else return newData;
  };

  return (
    <FormDetailModal
      title="bài viết"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
      }}
      isUpdate={isUpdate}
      insertApi={addPostApi}
      updateApi={updatePostApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <InputFormDetail id="title" label="Tiêu đề (*)" register={register} errors={errors} />
        <InputFormDetail type="number" id="time" label="Thời gian đọc (*)" register={register} errors={errors} />
        <InputFormDetail id="hashtag" label="Hagtag" register={register} />
        <Editor id="content" label="Nội dung (*)" data={watch('content')} setData={e => setValue('content', e)} />
      </div>
    </FormDetailModal>
  );
};

export default DetailPost;
