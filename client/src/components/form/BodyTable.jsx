import { useConfirmState } from '@/store';
import { Button, Switch } from '../uiCore';
import { BiSearch, BiTrash } from 'react-icons/bi';

export const StatusBody = (status) => {
  return (
    <div className="flex justify-center">
      <Switch checked={Boolean(status)} />
    </div>
  );
};

export const ActionsBody = (props) => {
  const { baseActions = [], handleViewDetail = () => {}, deleteApi = () => {}, handleDelete = () => {}, item } = props;
  const { showConfirm } = useConfirmState()

  const onDelete = () => {
    showConfirm({ title: "Bạn có chắc chắn muốn xóa dữ liệu này" })
  }

  return (
    <>
      <div className="flex gap-2 justify-center items-center">
        {baseActions.includes('detail') && (
          <Button onClick={handleViewDetail} rounded={true}>
            <BiSearch size={16} />
          </Button>
        )}
        {baseActions.includes('delete') && (
          <Button onClick={onDelete} rounded={true} severity="danger">
            <BiTrash size={16} />
          </Button>
        )}
      </div>
    </>
  );
};
