---
title: "Building a web component in ReactJS [WIP]"
pubDate: 2024-07-09
author: "Ikotun Collins"
tags: ['files']
slug: 'react-web-components'
---

There are several different reasons for creating a web component. Most common one is when you need to embed your own component or application into an entirely different application.<br/>

The application does not neccessarily need to be in reactJS . 

I had a lot of issues and blockers when I tried to do this so I decided to write about it.
<br/>

> ### NOTE
> Basic knowledge of reactJS is required. <br/>
> This would only work with [VITE]('https://vitejs.dev/') build tool. <br/>
> I'm using typescript.

<br/>

Using a very simple example. 
<br/>
Making it a web component simply means I want to include it in another application.

`App.tsx`
```javascript

import React from "react";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: "10px",
          width: "40vw",
          height: "40vh",
          backgroundColor: "red",
          borderRadius: "10px",
        }}
      >
        <h4>hey folks, im tryna test embeds</h4>
      </div>
    </>
  );
};

export default App;

```

We will be using the [`R2WC`]('https://www.bitovi.com/open-source/react-to-web-component').
<br/> This library helps us convert our react component to a web component

```bash
   npm intsall @r2wc/react-to-web-component
```

`main.tsx`

```ts
import r2wc from "@r2wc/react-to-web-component";
import App from "./App";

const AppElement = r2wc(App);

//customElements.define("<your-tag-name>", AppElement); 
//your tag name is what you want your component to called. 

customElements.define("greeting-modal", AppElement);

```

If your component includes props, take a look at the documentation to learn more, [R2WC]('https://www.bitovi.com/open-source/react-to-web-component#try-now')


Next up, configuring your bundler. 

`vite.config.ts`

```ts 

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"), // this is the entry point of our app. 
      name: "YourAppName",
      fileName: (format) => `yourAppName.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    }, // rollupOptions is a vite configuration to customize build process
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"), //this ensures that react is in production mode
  },
  publicDir: "src", // this serves src as the public directory
});

```

You have to publish your app to NPM. We are basically making it a library that can be used via a CDN.

```javascript


{
  "name": "myApp", // the name of the library.
  "private": false, // this allows the lib to be publicly acessible.
  "version": "0.0.0",
  "main": "dist/my-app-name.umd.js",
  "module": "dist/my-app-name.es.js",
  "files": [
    "dist",
  ],
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@r2wc/react-to-web-component": "^2.0.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@typescript-eslint/eslint-plugin": "^7.13.1",
    "@typescript-eslint/parser": "^7.13.1",
    "@vitejs/plugin-react": "^4.3.1",
    "eslint": "^8.57.0",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.7",
    "rollup-plugin-polyfill-node": "^0.13.0",
    "typescript": "^5.2.2",
    "vite": "^5.3.1"
  }
}
```

<br/>
You need to publish your library.

```bash
npm publish 
```

I'm going to serve mine with [JSDELIVR]('https://www.jsdelivr.com/'). 
<br/>
All you need to do is get the accurate URL for your library 

```bash
// load any project hosted on npm

https://cdn.jsdelivr.net/npm/package@version/file
// In my case 

// this 
https://cdn.jsdelivr.net/npm/MyApp@0.0.0/dist/my-app.umd.js

```

Almost done

<br/>
To use this in any html file 


```javascript

// your js script 
<script defer src="https://cdn.jsdelivr.net/npm/MyApp@0.0.0/dist/my-app.umd.js" />

// defer waits for it to load before its execution. 

// your html tag 
// the one specified in main.tsx 


<greeting-modal></greeting-modal>


```


All done