# data-booster-react-assignment

This repository has the source code for data booster's assignment.

## Project Structure

- app/components/slider.tsx: This file contains the Slider component, which is responsible for rendering and navigating through the exercises.
- app/routes/index.tsx: The main route file for the application. It includes the meta tags, loader function, and renders the Slider component.
- app/static/lessons.json: The JSON file containing the lessons data. This file is read and parsed by the loader function in index.tsx.
- app/css/slider.css: The CSS file that styles the Slider component and its elements.

## Approach

### Index.tsx

1. The application uses Remix's loader function to load data. The loader reads a lessons.json file, parses it, and returns the data to the component.
2. Then I use JSON parse to parse JSON string into JavaScript object.
3. Slider component is rendered that recieves the lessons data.

### Slider.tsx

1. The component uses useLoaderData hook to get lessons data loaded by loader function.
2. Then I use flatmap to put the lessons into one array.
3. Then is currentIndex state for tracking currently displayed exercise (keeping track of it helps both in sliding as well as knowing the multiple choice selected within the exercise).
4. Then is selectedAnswerId state for tracking which answer is selected (additional).
5. The function handleNext advances to the next exercise in the array if it's not the last one.
6. The function handlePrevious goes back to the previous exercise if it's not the first one.
7. The function handleAnswerChange updates the selected answer for a multiple-choice question (additional).
8. Then inside return we do conditional rendering to display video or multiple choice exercise based on the resource type.

## Installation

1. Clone the repository.
2. cd to path
3. npm install
4. npm run dev
