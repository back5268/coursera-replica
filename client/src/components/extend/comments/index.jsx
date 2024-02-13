import { Link } from '@components/uiCore';
import { useEffect, useState } from 'react';
import { SendMessage } from './SendMessage';
import { Comment } from './Comment';
import { useAuthContext } from '@context/AuthContext';
import LoginConfirm from '@view/web/shared/LoginConfirm';

const Comments = ({ comments = [], type = 1, setRender, objectId }) => {
  const { userInfo } = useAuthContext();
  const [focused, setFocused] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (focused || focused === 0) {
      const input = document.getElementById(focused);
      if (input) {
        input.focus();
        setFocused(null);
      }
    }
  }, [focused]);

  return (
    <div>
      <LoginConfirm title="bình luận" show={show} setShow={setShow} />
      <div className="flex justify-between items-center my-2">
        <h2 className="uppercase font-semibold">Bình luận bài viết</h2>
        <Link onClick={() => {
          if (!userInfo?._id) setShow(true)
          else setFocused('messageId')
        }} className="text-sm font-medium">
          Viết bình luận
        </Link>
      </div>
      <div className="card text-sm text-left">
        {comments.map((comment, index) => {
          return <Comment key={index} objectId={objectId} setFocused={setFocused} comment={comment} type={type} userInfo={userInfo} setShow={setShow} setRender={setRender} />;
        })}
        <div className="mt-4">
          <SendMessage id="messageId" objectId={objectId} type={type} userInfo={userInfo} setShow={setShow} setRender={setRender} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
