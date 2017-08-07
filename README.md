# Why?k

This repository contains a demo application for implementing a .csv file upload with a Node.js API to provide autocomplete functionality over some fields in the .csv file.

# Running the app

1. First build the client, in the `/client` subdirectory, run:
```
npm install
npm run build
```

2. Go back to the repository root and run:
```
npm install
npm start
```

3. Navigate your browser to `http://localhost:3001`

# Frontend

* The client side is a React application set up using the `create-react-app` bolierplate generator.
* At first I tried to design the UI components (like buttons, progressbars) myself, but quickly realized
that it should probably be illegal for me to create a visual design, as I was born without the proper aesthetic
senses for today's web.
* [Semantic UI React](https://react.semantic-ui.com) components are used for some visual flare

# Backend

* A proper backend server would obviously store the uploaded .csv file in a persistent manner. This small demo application implements a tiny self-rolled "in memory-db".
* The "db" stores plain js objects and allows to index them by different fields. The indexed fields are configurable, but currently only the `name` field is configured.
* For the index I used a prefix trie, that I implemented myself. There are two reasons for this. First, tries a surprisingly simple to implement. And second, I couldn't find an existing implementation general enough to index over arbitrary objects and possibly multiple keys at the same time.
I Plan to refactor ObjectTrie into a resusable library, add more configuration options and tests and maybe even make it a bit more efficient by implementing suffix compression.


## Improvements

* Implement proper logging using some kind of framework
* Refactor ObjectTrie into a library and add feaures like configurable return value sort order, highlighting.
