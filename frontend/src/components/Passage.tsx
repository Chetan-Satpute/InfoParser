import React, { FC, useState } from "react";
import { deletePassage, IPassage, setPassage } from "../utils/apiRequest";
import Card from "./Card";
import "./../styles/loadingio.css";

const Passage: FC<IPassage & { reload: () => Promise<void> }> = ({
  id,
  content,
  topic,
  reload,
}) => {
  const [text, setText] = useState(content);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const updatePassage = async () => {
    setLoading(true);
    let data = { id, content: text, topic };
    data = await setPassage(data);

    setText(data.content);
    setLoading(false);
  };

  const removePassage = async () => {
    setLoading(true);

    await deletePassage(id);
    await reload();
  };

  return (
    <Card>
      {editMode ? (
        <>
          {loading ? (
            <div className="w-full flex justify-center">
              <div className="loadingio-spinner-bars-4adlyc3gf4s bg-transparent">
                <div className="ldio-rj8mk1zwj2c">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="text-right w-full mb-2">
                <button
                  className="material-icons text-blue-500 px-2"
                  onClick={updatePassage}
                >
                  save
                </button>
                <button
                  className="material-icons text-red-500 px-2"
                  onClick={removePassage}
                >
                  delete
                </button>
                <button
                  className="material-icons px-2"
                  onClick={() => setEditMode(false)}
                >
                  close
                </button>
              </div>
              <textarea
                className="rounded-lg w-full bg-gray-800 focus:outline-none p-3"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
              />
            </>
          )}
        </>
      ) : (
        <p onClick={() => setEditMode(true)}>{text}</p>
      )}
    </Card>
  );
};

export default Passage;
