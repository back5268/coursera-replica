import { Link } from '@components/uiCore';
import { useEffect, useState } from 'react';
import { SendMessage } from './SendMessage';
import { Comment } from './Comment';
import { useAuthContext } from '@context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useConfirmState } from '@store';

const Comments = ({ comments = [], type = 1, setRender, objectId }) => {
  const navigate = useNavigate();
  const { showConfirm } = useConfirmState();
  const { userInfo } = useAuthContext();
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    if (focused || focused === 0) {
      const input = document.getElementById(focused);
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        setFocused(null);
      }
    }
  }, [focused]);

  const onWarning = async () => {
    showConfirm({
      title: 'Vui lòng đăng nhập để có thể bình luận!',
      action: () => navigate('/auth/signin')
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center my-2">
        <h2 className="uppercase font-semibold">Bình luận bài viết</h2>
        <Link
          onClick={() => {
            if (!userInfo?._id) onWarning();
            else setFocused('messageId');
          }}
          className="text-sm font-medium"
        >
          Viết bình luận
        </Link>
      </div>
      <div className="card text-sm text-left">
        {comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              objectId={objectId}
              setFocused={setFocused}
              comment={comment}
              type={type}
              userInfo={userInfo}
              onWarning={onWarning}
              setRender={setRender}
            />
          );
        })}
        <div className="mt-4">
          <SendMessage id="messageId" objectId={objectId} type={type} userInfo={userInfo} onWarning={onWarning} setRender={setRender} />
        </div>
      </div>
    </div>
  );
};

export default Comments;
