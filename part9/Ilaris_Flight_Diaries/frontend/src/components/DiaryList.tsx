import { useState, useEffect } from "react";
import diariesService from '../services/diaries';
import { NonSensitiveDiaryEntry } from "../types";

function DiaryList() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiariesList = async () => {
      try {
        const diaryEntries = await diariesService.getAll();
        setDiaries(diaryEntries);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      }
    };

    fetchDiariesList();
  }, []);

  return (
    <div>
      <h2>Diary Entries</h2>
      <ul>
        {diaries.map((entry) => (
          <li key={entry.id}>
            <div>
              <strong>Date:</strong> {entry.date}
            </div>
            <div>
              <strong>Visibility:</strong> {entry.visibility}
            </div>
            <div>
              <strong>Weather:</strong> {entry.weather}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DiaryList;
