import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { InputForm, MultiCheckBox, MultiRadio, SelectForm } from './components/form';
import { Button, Modal, Switch, Table, Toast } from './components/uiCore';
import { useState } from 'react';
import Spinner from './components/uiCore/Spinner';

const schema = yup
  .object({
    name: yup.string().required(),
    age: yup.string().required(),
    select: yup.number().required()
  })
  .required();

const data = [
  { label: 'One', key: 9 },
  { label: 'Two', key: 2 },
  { label: 'Three', key: 3 },
  { label: 'Four', key: 4 },
  { label: 'Five', key: 5 },
  { label: 'Six', key: 6 },
  { label: 'Seven', key: 7 },
  { label: 'Eight', key: 8 }
];

export default function App() {
  const [params, setParams] = useState({ page: 1, limit: 10 });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      select: 3
    }
  });

  const onSubmit = (data) => console.log(data);
  const columns = [{ label: 'Name' }, { label: 'Age' }, { label: 'Old' }, { label: 'CC' }];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full flex justify-center">
        <Table totalRecord={60} params={params} setParams={setParams} columns={columns} />
      </div>
    </form>
  );
}
