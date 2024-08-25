import type { MetaFunction } from "@remix-run/node";
import fs from "fs/promises";
import path from "path";
import Slider from "~/components/slider";
import "../css/slider.css";

export const meta: MetaFunction = () => {
  return [
    { title: "React Assignment" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

interface Answer {
  id: string;
  answer: string;
  exercise: string;
  resourcetype: string;
}

interface Exercise {
  id: string;
  course_id: string;
  next_exercise_id: string | null;
  previous_exercise_id: string | null;
  is_completed: boolean;
  title: string;
  order: number;
  url?: string;
  lesson: string;
  resourcetype: string;
  description?: string;
  hint?: string;
  answers?: Answer[];
}

interface Lesson {
  id: string;
  title: string;
  order: number;
  chapter: string;
  exercises: Exercise[];
}

interface Data {
  lessons: Lesson[];
}

export const loader = async () => {
  const filePath = path.resolve(process.cwd(), "app/static/lessons.json");
  const fileContents = await fs.readFile(filePath, "utf-8");
  const data: Data = JSON.parse(fileContents);

  return data;
};

export default function Index() {
  return (
    <div className="main">
      <Slider />
    </div>
  );
}
