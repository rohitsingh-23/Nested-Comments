import React, { useEffect, useState } from "react";
import {
  FaLongArrowAltUp,
  FaLongArrowAltDown,
  FaComment,
} from "react-icons/fa";

const SingleComment = ({ item, handleVote, handleAddComment }) => {
  const [text, setText] = useState("");
  const [reply, setReply] = useState(false);

  return (
    <div className="single-comment">
      <div style={{ display: "flex" }}>
        <div className="vote-container">
          <button
            className="round-btn"
            onClick={() => handleVote("up", item.id)}
          >
            <FaLongArrowAltUp />
          </button>
          <p>{item.vote}</p>
          <button
            className="round-btn"
            onClick={() => handleVote("down", item.id)}
          >
            <FaLongArrowAltDown />
          </button>
        </div>
        <button
          className="reply-btn"
          onClick={() =>
            setReply((prev) => {
              setText("");

              return !prev;
            })
          }
        >
          <FaComment /> reply
        </button>
        {reply && (
          <>
            <input
              type="text"
              placeholder="Add new Comment..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              onClick={() => {
                setReply((prev) => !prev);
                setText("");
                handleAddComment(text, item.id);
              }}
            >
              Add
            </button>
          </>
        )}
      </div>
      <p className="comment">{item.title}</p>
      <div className="replies">
        {item.reply.map((temp) => {
          return (
            <SingleComment
              key={temp.id}
              item={temp}
              handleVote={handleVote}
              handleAddComment={handleAddComment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SingleComment;
