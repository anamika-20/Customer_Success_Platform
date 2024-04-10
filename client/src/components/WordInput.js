import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import CloseIcon from "@mui/icons-material/Close";

const WordInput = ({ label, words, setWords }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setWords([...words, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteWord = (index) => {
    const updatedWords = [...words];
    updatedWords.splice(index, 1);
    setWords(updatedWords);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <TextField
        label={label}
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div>
        {words.map((word, index) => (
          <Chip
            key={index}
            label={word}
            onDelete={() => handleDeleteWord(index)}
            deleteIcon={<CloseIcon />}
            style={{ margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default WordInput;
