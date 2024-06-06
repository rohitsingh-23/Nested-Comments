import React, { useState } from "react";


const AddComment = ({ id, handleNestedAddComment }) => {
  const [text, setText] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Add new Comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleNestedAddComment(text, id)}>Add</button>
    </div>
  );
};

export default AddComment;
