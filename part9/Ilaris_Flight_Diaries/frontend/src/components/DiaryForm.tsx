import React, { useState, ChangeEvent, FormEvent } from "react";
import { NewDiaryEntry } from "../types";
import diariesService from '../services/diaries'


interface DiaryFormProps {
  onAddDiary: (newDiary: NewDiaryEntry) => void;
}


const DiaryForm: React.FC<DiaryFormProps> = () => {
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      await diariesService.createDiary(newDiary); // Call the createDiary method from your diaries service
      setNewDiary({ date: "", visibility: "", weather: "", comment: "" });
    } catch (error) {
      console.error("Error creating diary:", error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="date">Date:</label>
        <input
          type="text"
          id="date"
          name="date"
          value={newDiary.date}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="visibility">Visibility:</label>
        <input
          type="text"
          id="visibility"
          name="visibility"
          value={newDiary.visibility}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="weather">Weather:</label>
        <input
          type="text"
          id="weather"
          name="weather"
          value={newDiary.weather}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="comment">Comment:</label>
        <textarea
          id="comment"
          name="comment"
          value={newDiary.comment}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

export default DiaryForm;
