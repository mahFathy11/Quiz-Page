# 📝 Interactive Tech Quiz App

A comprehensive quiz application designed to test programming knowledge across multiple domains. Select your category and race against the clock!

## ✨ Key Features
* **Multi-Category System:** Users can choose between **HTML, CSS, JS, React, and Python**.
* **Countdown Timer:** Each question (or quiz session) has a strict time limit (e.g., 60 seconds) to add a challenge.
* **Visual Progress Tracking:**
    * Colored bullets at the bottom indicate the status of previous questions:
    * 🔴 **Red:** Wrong Answer.
    * 🔵 **Blue:** Correct Answer (or current active state).
    * ⚪ **Grey:** Pending/Upcoming questions.
* **Dynamic Content:** Questions change dynamically based on the selected category tab.

## 🛠️ Technologies Used
* **HTML5:** Structured layout for the quiz card and options.
* **CSS3:** Styling for the tabs, progress dots, and responsive design.
* **JavaScript (ES6+):**
    * Fetching questions from a JSON file (or object).
    * Handling tab switching logic.
    * Countdown timer logic (`setInterval`).
    * Score calculation and answer validation.

## 🚀 How It Works
1.  **Select a Category:** Click on tabs like HTML, CSS, or JS to load relevant questions.
2.  **Answer Quickly:** Select the correct option before the timer (bottom right) runs out.
3.  **Track Progress:** Watch the dots at the bottom change color based on your answers.
4.  **Get Results:** See your final score after completing all questions.
