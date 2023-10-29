import React, { useState, ChangeEvent, FormEvent } from "react";
import { NewDiaryEntry, DiaryFormEmpty } from "../types";
import diariesService from '../services/diaries'
import Notification from "./Notification";
import { AxiosError } from "axios";



const initialEmptyDiary: DiaryFormEmpty = {
    date: "",
    visibility: "",
    weather: "",
    comment: "",
};

interface DiaryFormProps {
    onAddDiary: (newDiary: NewDiaryEntry) => void;
}

const DiaryForm: React.FC<DiaryFormProps> = () => {
    const [newDiary, setNewDiary] = useState<DiaryFormEmpty>(initialEmptyDiary);
    const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewDiary({ ...newDiary, [name]: value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        try {
            await diariesService.createDiary(newDiary);
            setNewDiary({ date: "", visibility: "", weather: "", comment: "" });
            setNotification({ message: "Diary entry added successfully", type: "success" });
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
              console.error("Error creating diary:", error);
              const errorMessage: string = error.response?.data || "An error occurred while adding the diary entry";
              setNotification({ message: errorMessage, type: "error" });
            }
          }
        }
    
    // Rest of the component code...

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
        </>
    );
};

export default DiaryForm;
