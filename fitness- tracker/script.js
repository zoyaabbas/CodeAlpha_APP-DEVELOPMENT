// Fitness goals

const STEP_GOAL = 10000;
const WORKOUT_GOAL = 60;
const CALORIE_GOAL = 500;

// Get saved activities from localStorage

let activities = JSON.parse(localStorage.getItem("fitnessActivities")) || [];

// HTML elements

const fitnessForm = document.getElementById("fitnessForm");

const stepsDisplay = document.getElementById("stepsDisplay");
const workoutDisplay = document.getElementById("workoutDisplay");
const caloriesDisplay = document.getElementById("caloriesDisplay");

const stepsProgress = document.getElementById("stepsProgress");
const workoutProgress = document.getElementById("workoutProgress");
const caloriesProgress = document.getElementById("caloriesProgress");

const stepsProgressText = document.getElementById("stepsProgressText");
const workoutProgressText = document.getElementById("workoutProgressText");
const caloriesProgressText = document.getElementById("caloriesProgressText");

const history = document.getElementById("history");

const clearButton = document.getElementById("clearButton");

// Add activity

fitnessForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const steps = Number(document.getElementById("steps").value);

  const workout = Number(document.getElementById("workout").value);

  const calories = Number(document.getElementById("calories").value);

  const activity = {
    id: Date.now(),

    date: new Date().toLocaleDateString(),

    steps: steps,

    workout: workout,

    calories: calories,
  };

  activities.push(activity);

  saveActivities();

  updateApp();

  fitnessForm.reset();
});

// Save data

function saveActivities() {
  localStorage.setItem("fitnessActivities", JSON.stringify(activities));
}

// Calculate today's totals

function getTodayActivities() {
  const today = new Date().toLocaleDateString();

  return activities.filter(function (activity) {
    return activity.date === today;
  });
}

// Update summary

function updateSummary() {
  const todayActivities = getTodayActivities();

  let totalSteps = 0;

  let totalWorkout = 0;

  let totalCalories = 0;

  todayActivities.forEach(function (activity) {
    totalSteps += activity.steps;

    totalWorkout += activity.workout;

    totalCalories += activity.calories;
  });

  stepsDisplay.textContent = totalSteps;

  workoutDisplay.textContent = totalWorkout;

  caloriesDisplay.textContent = totalCalories;

  updateProgress(stepsProgress, stepsProgressText, totalSteps, STEP_GOAL);

  updateProgress(
    workoutProgress,
    workoutProgressText,
    totalWorkout,
    WORKOUT_GOAL,
  );

  updateProgress(
    caloriesProgress,
    caloriesProgressText,
    totalCalories,
    CALORIE_GOAL,
  );
}

// Update progress bars

function updateProgress(bar, text, value, goal) {
  let percentage = Math.round((value / goal) * 100);

  if (percentage > 100) {
    percentage = 100;
  }

  bar.style.width = percentage + "%";

  text.textContent = percentage + "%";
}

// Display history

function displayHistory() {
  history.innerHTML = "";

  if (activities.length === 0) {
    history.innerHTML = "<p>No activities recorded yet.</p>";

    return;
  }

  activities
    .slice()
    .reverse()
    .forEach(function (activity) {
      const activityDiv = document.createElement("div");

      activityDiv.className = "history-item";

      activityDiv.innerHTML = `

            <strong>${activity.date}</strong>

            <p>👣 Steps: ${activity.steps}</p>

            <p>🏋️ Workout: ${activity.workout} minutes</p>

            <p>🔥 Calories: ${activity.calories} kcal</p>

            <button
                class="delete-btn"
                onclick="deleteActivity(${activity.id})"
            >
                Delete
            </button>

        `;

      history.appendChild(activityDiv);
    });
}

// Delete activity

function deleteActivity(id) {
  activities = activities.filter(function (activity) {
    return activity.id !== id;
  });

  saveActivities();

  updateApp();
}

// Clear all data

clearButton.addEventListener("click", function () {
  if (activities.length === 0) {
    return;
  }

  const confirmation = confirm(
    "Are you sure you want to delete all fitness data?",
  );

  if (confirmation) {
    activities = [];

    saveActivities();

    updateApp();
  }
});

// Update entire app

function updateApp() {
  updateSummary();

  displayHistory();
}

// Load app

updateApp();
