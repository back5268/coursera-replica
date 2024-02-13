import { InputFormV2, MultiCheckBoxV2 } from '@components/form';
import { Button, Hr, Rating } from '@components/uiCore';
import { courseCharacteristic, courseType } from '@constant';
import React, { useState } from 'react';

const Filter = ({ params, setParams }) => {
  const [price, setPrice] = useState({});
  const ratings = Array.from({ length: 5 }, (_, index) => 5 - index);

  return (
    <div className="w-full h-full bg-primary-50">
      <div className="h-16 flex items-center justify-center">
        <h2 className="uppercase font-semibold">Bộ lọc tìm kiếm</h2>
      </div>
      <Hr />
      <div className="text-left p-4 flex flex-col text-sm">
        <div className="mb-4">
          <h4>Trạng thái:</h4>
          <MultiCheckBoxV2
            data={courseCharacteristic}
            value={params.characteristic}
            onChange={(e) => setParams({ ...params, characteristic: e })}
          />
        </div>
        <Hr />
        <div className="my-4">
          <h4>Theo Danh Mục:</h4>
          <MultiCheckBoxV2 data={courseType} value={params.type} onChange={(e) => setParams({ ...params, type: e })} />
        </div>
        <Hr />
        <div className="my-4 flex flex-col">
          <h4>Khoảng giá:</h4>
          <div className="flex items-center my-2">
            <InputFormV2
              size="md"
              className="!w-5/12 !p-0"
              label="Giá từ"
              value={price.from}
              onChange={(e) => setPrice({ ...price, from: e.target.value })}
            />
            <div className="w-2/12 text-center">---</div>
            <InputFormV2
              size="md"
              className="!w-5/12 !p-0"
              label="Giá đến"
              value={price.to}
              onChange={(e) => setPrice({ ...price, to: e.target.value })}
            />
          </div>
          <Button
            onClick={() => {
              setParams({ ...params, ...price });
            }}
            className="w-full"
            label="Áp dụng"
          />
        </div>
        <Hr />
        <div className="my-4">
          <h4>Đánh giá:</h4>
          <div className="mt-4">
            {ratings.map((r, index) => (
              <div
                key={index}
                onClick={() => {
                  if (params.rating === r) setParams({ ...params, rating: undefined });
                  else setParams({ ...params, rating: r });
                }}
                className={`flex justify-center gap-2 cursor-pointer p-1 ${params.rating === r ? 'bg-primary-100' : ''} rounded-md mt-1`}
              >
                <Rating value={r} /> <span className={r === 5 ? 'opacity-0' : ''}>Trở lên</span>
              </div>
            ))}
          </div>
        </div>
        <Hr />
        <Button className="w-full mt-4" label="Xóa tất cả" severity="danger" />
      </div>
    </div>
  );
};

export default Filter;
