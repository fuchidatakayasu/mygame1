# Blueprint: The Unstable Button Game

## Overview

This project is a simple, fun, and addictive web-based game called "The Unstable Button". The objective is to click a button that actively tries to evade the user's mouse cursor. The goal is to click the button as many times as possible within a 30-second time limit. Its simplicity and challenge make it highly replayable.

## Design and Features

### Initial Version (v1.0)

*   **Visual Design:**
    *   **Layout:** A clean, centered layout with a dedicated game area.
    *   **Color Palette:** A modern and energetic color scheme with vibrant colors and gradients.
    *   **Typography:** Clear, readable fonts with emphasis on the score and timer for easy understanding.
    *   **Button Style:** The main button will have a "lifted" feel using multi-layered drop shadows and a subtle glow effect to make it an attractive target.
    *   **Background:** A subtle noise texture on the background to add a premium, tactile feel.
*   **Core Gameplay:**
    *   **Game Area:** A defined container within which the button can move.
    *   **The Unstable Button:** A button that moves to a new random position every time it is clicked.
    *   **Evade Mechanic:** The button will also move whenever the mouse cursor hovers over it, making it challenging to catch.
    *   **Scoring:** A counter that increments by one for each successful click.
    *   **Timer:** A 30-second countdown timer that starts when the "Start Game" button is pressed.
*   **User Interface:**
    *   **Start Screen:** A "Start Game" button to begin the play session.
    *   **Game Screen:** Displays the current score, the remaining time, and the unstable button.
    *   **End Screen:** Shows the final score and a "Play Again" button.
*   **Accessibility:**
    *   Clear color contrast.
    *   Keyboard accessibility for starting the game.
    *   Semantic HTML for screen readers.

## Current Plan

### Implement v1.0

1.  **Update `index.html`:**
    *   Set up the basic structure of the game, including a game container, score display, timer display, the main button, and a start button.
2.  **Update `style.css`:**
    *   Implement the modern visual design, including the color palette, typography, button styles with shadows and glows, and the textured background.
    *   Ensure the layout is responsive and works well on different screen sizes.
3.  **Update `main.js`:**
    *   Implement the core game logic:
        *   Start/reset functionality.
        *   A 30-second countdown timer.
        *   Score tracking.
        *   Random button movement on click.
        *   Button evasion from the mouse cursor.
        *   End-of-game state management.
