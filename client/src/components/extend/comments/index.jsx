import { Link } from '@components/uiCore';
import { useEffect, useState } from 'react';
import { SendMessage } from './SendMessage';
import { Comment } from './Comment';

const Comments = ({ comments = [{ fullName: 'okokok', content: 'hay lam' }] }) => {
  const [focused, setFocused] = useState(null);

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
      <div className="flex justify-between items-center my-2">
        <h2 className="uppercase font-semibold">Bình luận bài viết</h2>
        <Link>Viết bình luận</Link>
      </div>
      <div className="card text-sm text-left">
        {comments.map((comment, index) => {
          return <Comment setFocused={setFocused} key={index} comment={comment} />;
        })}
        <div className="mt-4">
          <SendMessage />
        </div>
      </div>
    </div>
  );
};

export default Comments;
