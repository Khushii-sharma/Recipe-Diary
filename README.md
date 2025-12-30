#  Recipe Diary

A modern recipe discovery web application built with **Next.js** that allows users to search recipes, view detailed cooking instructions, and save their favorite dishes — all with a clean UI and smooth user experience.

---

## Features

-  **Recipe Search**
  - Search recipes by keywords (dish name, category, etc.)
  - Results displayed on a dedicated search results page

-  **Recipe Details Page**
  - High-quality hero image
  - Ingredients list with measurements
  - Step-by-step cooking instructions
  - Embedded YouTube video tutorial (if available)

-  **Save Recipes**
  - Save / unsave recipes using a heart icon
  - View all saved recipes on a dedicated **Saved Recipes** page
  - Remove saved recipes using a delete icon
  - Click saved items to reopen full recipe details

-  **Login Modal (Mock Authentication)**
  - Indian mobile number login
  - OTP-based verification (fake OTP using toast notification)
  - Clean modal UI with background blur

-  **Responsive Design**
  - Optimized for mobile, tablet, and desktop screens

---

## Tech Stack

- **Frontend:** Next.js (App Router), React
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **State Management:** React Context API
- **API:** [TheMealDB API](https://www.themealdb.com/)
- **Notifications:** React Toastify
- **Image Optimization:** Next.js Image Component

---

##  How to Run Locally

# Install dependencies
```bash
npm install
```

# Start development server
```bash
npm run dev
```

App runs at: `http://localhost:3000`

## Future Improvements
- Real authentication using JWT
- Backend integration (Node.js / Firebase)
- Advanced filters (veg / non-veg / cuisine)
- Pagination & infinite scrolling
- User profile & history


# Author
Khushi | sharmakhushi1501@gmail.com
