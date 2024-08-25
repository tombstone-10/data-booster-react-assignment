import React, { useState } from "react";
import { useLoaderData } from "@remix-run/react";
import "../css/slider.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

// TypeScript interfaces
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

const Slider = () => {
  const { lessons } = useLoaderData<Data>();
  const exercises = lessons.flatMap((lesson) => lesson.exercises);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);

  const handleNext = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswerId(null); // Reset selection when moving to the next slide
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelectedAnswerId(null); // Reset selection when moving to the previous slide
    }
  };

  const handleAnswerChange = (answerId: string) => {
    setSelectedAnswerId(answerId);
  };

  const currentExercise = exercises[currentIndex];

  return (
    <div className="container">
      <div className="exercise">
        {currentExercise.resourcetype === "VideoExercise" &&
        currentExercise.url ? (
          <>
            <h2 className="exercise-title">{currentExercise.title}</h2>
            <iframe
              src={currentExercise.url}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </>
        ) : (
          <div>
            <h2 className="exercise-title">{currentExercise.title}</h2>
            <p
              className="exercise-description"
              dangerouslySetInnerHTML={{
                __html: currentExercise.description || "",
              }}
            ></p>
            {/* as the figma design did not have a hint UI */}
            {/* <div className="hint-container">
              <p className="exercise-hint">Hint: </p>
              {currentExercise.hint && (
                <p
                  className="exercise-hint"
                  dangerouslySetInnerHTML={{ __html: currentExercise.hint }}
                ></p>
              )}
            </div> */}
            <p className="option-text">Pick one option</p>
            {currentExercise.resourcetype === "MultipleChoiceExercise" &&
              currentExercise.answers && (
                <div className="mcq-container">
                  {currentExercise.answers.map((answer) => (
                    <div key={answer.id} className="mcq">
                      <label>
                        <input
                          type="radio"
                          name={`exercise-${currentExercise.id}`}
                          value={answer.id}
                          checked={selectedAnswerId === answer.id}
                          onChange={() => handleAnswerChange(answer.id)}
                          className="mcq-input"
                        />
                        {answer.answer}
                      </label>
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
      </div>
      <div className="nav-arrows">
        {currentIndex > 0 && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="nav-arrow left-arrow"
            onClick={handlePrevious}
          />
        )}
        {currentIndex < exercises.length - 1 && (
          <FontAwesomeIcon
            icon={faArrowRight}
            className="nav-arrow right-arrow"
            onClick={handleNext}
          />
        )}
      </div>
    </div>
  );
};

export default Slider;
