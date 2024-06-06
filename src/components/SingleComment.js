import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import { v4 as uuid } from "uuid";

const SingleComment = ({ item, handleVote, handleNestedAddComment }) => {
  const [input, setInput] = useState(false);
  const [reply, setReply] = useState([]);

  useEffect(() => {
    setReply([...item.reply]);
  }, []);

  const handleReply = (comment) => {
    setReply((prev) => {
      let temp = prev;
      temp = [
        ...temp,
        {
          id: uuid(),
          title: comment,
          vote: 0,
          reply: [],
        },
      ];
      return temp;
    });
  };
  return (
    <div key={item.id} className="single-comment">
      <div style={{ display: "flex" }}>
        <button onClick={() => handleVote("up", item.id)}>+</button>
        <p>{item.vote}</p>
        <button onClick={() => handleVote("down", item.id)}>-</button>
        <button onClick={() => setInput((prev) => !prev)}>reply</button>
        {input && (
          <AddComment
            id={item.id}
            handleNestedAddComment={handleNestedAddComment}
          />
        )}
      </div>
      {/* {item.reply &&
        item.reply.map((temp) => {
          <SingleComment
            item={temp}
            handleVote={handleVote}
            handleNestedAddComment={handleNestedAddComment}
          />;
        })} */}
      <p>{item.title}</p>
      <div className="replies">
        {reply.map((item) => {
          return <p key={item.id}>{item.title}</p>;
        })}
      </div>
    </div>
  );
};

export default SingleComment;
