import { useState } from "react";
import { SendMessage } from "./SendMessage";

export const Comment = ({ comment, setFocused }) => {
  const [moreComment, setMoreComment] = useState(false);
  const [childrenComment, setChildrenComment] = useState([]);

  async function accept() {}

  return (
    <div>
      <div className="flex gap-2">
        <div className="h-[32px] w-[32px]">
          <div className="h-[32px] w-[32px] rounded-full bg-black bg-cover" style={{ backgroundImage: `url('${comment.avatar}')` }}></div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-col gap-1 p-2 bg-slate-100 rounded-md">
            <span className="font-semibold">okokok</span>
            <span>'Tổng hợp các bài viết chia sẻ về kinh nghiệm tự học lập trình online và các kỹ thuật lập trình web.'</span>
          </div>
          <div className="flex gap-3 text-xs mt-1">
            <span>10 phút</span>
            <span className="font-semibold">Xem tất cả 2 bình luận</span>
            <span className="font-semibold">Trả lời</span>
          </div>
        </div>
      </div>
      <div className="ml-6">
        {moreComment && (
          <>
            {childrenComment.map((children, index) => (
              <Comment key={index} comment={children} />
            ))}
            <SendMessage id={comment.id} parentId={comment.id} />
          </>
        )}
      </div>
    </div>
  );
};
