import React, { useState } from "react";
import "./Comments.css";
import { v4 as uuid } from "uuid";
import SingleComment from "./SingleComment";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  const handleAdd = (comment) => {
    setComments((prev) => {
      return [
        ...prev,
        {
          id: uuid(),
          title: comment,
          vote: 0,
          reply: [],
        },
      ];
    });
  };

  const handleNestedAddComment = (comment, id) => {
    // let temp = handleDeepUpdate([comments, comment, id])
    // console.log("temp --> ", temp )
    let temp = handleDeepUpdate(comments, comment, id);
    console.log("returned vlue ->", temp);
    // setComments( handleDeepUpdate(comments, comment, id));
    // handleDeepUpdate(comments, comment, id);
  };

  // console.log("comments --> ", comments);

  const handleDeepUpdate = (obj, comment, id) => {
    if (obj == null || typeof obj !== "object") {
      return obj;
    }
    if (Array.isArray(obj)) {
      let deepArray = [];
      for (let i = 0; i < obj.length; i++) {
        deepArray = handleDeepUpdate(obj[i], comment, id);
      }

      return deepArray;
    }

    let deepObj = {};

    Object.keys(obj).forEach((item) => {
      if (obj[item] == id) {
        obj.reply = [
          ...obj.reply,
          {
            id: uuid(),
            title: comment,
            vote: 0,
            reply: [],
          },
        ];
      }
      return (deepObj[item] = handleDeepUpdate(obj[item], comment, id));
    });
    console.log("Object", comments);
    return deepObj;
  };

  console.log("Object", comments);

  const handleVote = (type, id) => {
    setComments((prev) => {
      return prev.map((item, i) => {
        if (item.id == id) {
          if (type == "up") {
            item.vote = item.vote + 1;
          } else if (type == "down") {
            item.vote = item.vote - 1;
          }
        }

        return item;
      });
    });
  };

  const handleReply = (comment, id) => {
    setComments((prev) => {
      return prev.map((item) => {
        if (item.id == id) {
          item.reply = [
            ...item.reply,
            {
              id: uuid(),
              title: comment,
              vote: 0,
              reply: [],
            },
          ];
        }
      });
    });
  };

  return (
    <div className="post">
      <div className="dummy-img"></div>
      <div className="comments">
        <input
          type="text"
          placeholder="Add new Comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => {
            handleAdd(text);
          }}
        >
          Add
        </button>

        <div className="all-comments">
          {comments.map((item, i) => {
            return (
              <SingleComment
                key={item.id}
                item={item}
                handleVote={handleVote}
                handleNestedAddComment={handleNestedAddComment}
              />
              // <div key={item.id} className="single-comment">
              //   <div style={{ display: "flex" }}>
              //     <button onClick={() => handleVote("up", item.id)}>+</button>
              //     <p>{item.vote}</p>
              //     <button onClick={() => handleVote("down", item.id)}>-</button>
              //     <button >reply</button>
              //   </div>
              //   <p>{item.title}</p>
              // </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comments;
