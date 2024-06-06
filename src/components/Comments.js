import React, { useState } from "react";
import "./Comments.css";
import { v4 as uuid } from "uuid";
import SingleComment from "./SingleComment";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: uuid(),
      title: "First Comment",
      vote: 0,
      reply: [],
    },
  ]);
  const [text, setText] = useState("");

  const handleAddComment = (comment, id) => {
    if (comment) {
      
      const newComments = handleDeepUpdate(comments, comment, id);
      setComments(newComments);
    } else {
      alert("Comment can't be empty")
    }
  };

  const handleDeepUpdate = (comments, comment, id) => {
    return comments.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          reply: [
            ...item.reply,
            {
              id: uuid(),
              title: comment,
              vote: 0,
              reply: [],
            },
          ],
        };
      }
      return {
        ...item,
        reply: handleDeepUpdate(item.reply, comment, id),
      };
    });
  };

  const handleVote = (type, id) => {
    let updatedComments = handleDeepVoteUpdate(comments, type, id);
    console.log("updatedComments", updatedComments);
    setComments(updatedComments);
  };

  const handleDeepVoteUpdate = (comments, type, id) => {
    console.log(type, id);
    return comments.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          vote: type === "up" ? item.vote + 1 : item.vote - 1,
        };
      }

      return { ...item, reply: handleDeepVoteUpdate(item.reply, type, id) };
    });
  };

  return (
    <div className="post">
      <div className="comments">
        <input
          type="text"
          placeholder="Add Comment Here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => {
            if (text) {
              
              setComments((prev) => {
                return [
                  ...prev,
                  {
                    id: uuid(),
                    title: text,
                    vote: 0,
                    reply: [],
                  },
                ];
              });
              setText("")
            } else {
              alert("Comment can't be empty")
            }
          }}
        >
          Add Comment
        </button>
        <div className="all-comments">
          {comments.map((item, i) => {
            return (
              <SingleComment
                key={item.id}
                item={item}
                handleVote={handleVote}
                handleAddComment={handleAddComment}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
