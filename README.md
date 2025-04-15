#running the project

**Install nodejs and npm**

**Create project folder**

#navigate to root directory

**init**
```
npm initt -y
```

**install core dependencies**
```
npm insttall react-dom
```

**install Dependencies**
```
npm install @huggingface/transformers lucid-react convex -g convex-cli -D tailwindcss
npx tailwindcss init -p
```

**init Convex**
```
npx convex init
```
**Configure Tailwind**

#replace content of tailwind.config.js with this:

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        melagllikItalic: ["MyCustomFont", "sans-serif"],
        melagllik: ["MyCustomFont2", "sans-serif"],
        newRomantics: ["MyCustomFont3", "sans-serif"],
        planetKosmos: ["MyCustomFont4", "sans-serif"],
        atherosser: ["MyCustomFont5", "sans-serif"],
        magazineLetter: ["MyCustomFont6", "sans-serif"],
      },
    },
  },
  plugins: [],
};
```

**add/modify convex.json**
```
#replace with this
{
  "functions": "src/convex/",
  "variables": {
    "HUGGINGFACE_API_KEY": {
      "value": "from env:HUGGINGFACE_API_KEY"
    }
  }
}
```
**modify package.json**

#add to the scripts section
```
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
"dependencies": {
  // ... other dependencies
  "react": "^...",
  "react-dom": "^...",
  "react-scripts": "latest" // Add this line
},
"eslintConfig": {
  "extends": [
    "react-app",
    "react-app/jest"
  ]
},
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

**Run Project**
#In terminal
npm start
