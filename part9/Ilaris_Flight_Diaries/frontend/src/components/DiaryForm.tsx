import React, { useState, ChangeEvent, FormEvent } from "react";
import { NewDiaryEntry, Weather, Visibility } from "../types";
import diariesService from '../services/diaries';
import Notification from "./Notification";
import { AxiosError } from "axios";

interface DiaryFormProps {
  onAddDiary: (newDiary: NewDiaryEntry) => void;
}

const initialEmptyDiary: NewDiaryEntry = {
  date: "",
  visibility: Visibility.Great,
  weather: Weather.Sunny,
  comment: "",
};

const DiaryForm: React.FC<DiaryFormProps> = () => {
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>(initialEmptyDiary);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDiary({ ...newDiary, [name]: value });
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDiary({ ...newDiary, date: e.target.value });
  };

  const handleWeatherChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDiary({ ...newDiary, weather: e.target.value as Weather });
  };

  const handleVisibilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewDiary({ ...newDiary, visibility: e.target.value as Visibility });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await diariesService.createDiary(newDiary);
      setNewDiary(initialEmptyDiary);
      setNotification({ message: "Diary entry added successfully", type: "success" });
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error creating diary:", error);
        const errorMessage: string = error.response?.data || "An error occurred while adding the diary entry";
        setNotification({ message: errorMessage, type: "error" });
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={newDiary.date}
            onChange={handleDateChange}
          />
        </div>
        <div>
          <label>Weather:</label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Sunny}
              checked={newDiary.weather === Weather.Sunny}
              onChange={handleWeatherChange}
            />
            Sunny
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Rainy}
              checked={newDiary.weather === Weather.Rainy}
              onChange={handleWeatherChange}
            />
            Rainy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Cloudy}
              checked={newDiary.weather === Weather.Cloudy}
              onChange={handleWeatherChange}
            />
            Cloudy
          </label>
        </div>
        <div>
          <label>Visibility:</label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Great}
              checked={newDiary.visibility === Visibility.Great}
              onChange={handleVisibilityChange}
            />
            Great
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Good}
              checked={newDiary.visibility === Visibility.Good}
              onChange={handleVisibilityChange}
            />
            Good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Ok}
              checked={newDiary.visibility === Visibility.Ok}
              onChange={handleVisibilityChange}
            />
            Ok
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Poor}
              checked={newDiary.visibility === Visibility.Poor}
              onChange={handleVisibilityChange}
            />
            Poor
          </label>
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
      </>
      );
    };
    
    export default DiaryForm;
