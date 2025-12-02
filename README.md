# Brooke's Advent of Code solutions

[Advent of Code](https://adventofcode.com) is an annual series of coding puzzles. This repo contains Brooke's solutions for the puzzles she's solved.

## Solutions

The repo is divided into folders for each year, then folders for each puzzle. For example, [2025/01](./2025/01) contains files related to puzzle 1 for 2025.

Each puzzle contains the same set of files:

- `README.ts` a brief write-up of the thought process behind my solutions
- `solve.ts` contains all the code needed to solve a puzzle, given an input
- `test.ts` runs the solution against a `test-input.txt` file, outputting the solution to the console
- `index.ts` runs the solution against an `input.txt` file, outputting the solution to the console

The two executable files, `test.ts` and `index.ts`, can be run directly from within each puzzle folder using Node on the command line:

```cmd
node test.ts
```

```cmd
node index.ts
```

You might notice that the text files these scripts consume are missing. Unfortunately this is part of doing Advent of Code. The content of the puzzles, and their inputs, are [free to use but not free to copy](https://adventofcode.com/about#faq_copying).

If you want to test one of my solutions, feel free to get some input directly from the Advent of Code website to run them against.

## Supporting structure

This repo also contains a number of files used for defining how it functions. If you're here because you're learning about this for the first time, first of all welcome! Also here's a rundown on what each file that makes up the supporting structure of this repo is for:

### README.md

`README.md`, as you might have guessed by the name, is the file you're supposed to read. So you're in the right place!

This is a standard naming conventions for files that describe a repository. They typically contain instructions for how to use the code yourself.

### package.json

`package.json` is a standard file [used by npm](https://docs.npmjs.com/cli/v7/configuring-npm/package-json) and other package managers. It defines metadata about this package such as its name, and what other packages it uses.

For example, in this file it's specified that code in this repository should be run on Node version 22.18.0, or a higher minor or patch version.

### package-lock.json

`package-lock.json` is a generated file that contains information about installed packages.

### tsconfig.json

`tsconfig.json` configures TypeScript (commonly abbreviated to TS).

I love working with TypeScript, and ever since Node version 22.18.0 it's been possible to [run most TypeScript natively](https://nodejs.org/en/learn/typescript/run-natively) in Node. Here I've configured TypeScript to make it easy for me to write knowing that's how it will be run

### .gitignore

`.gitignore` tells git, the version control system, which files should always be ignored.

For example, the contents of the `node_modules` directory. This helps make sure such files aren't committed accidentally.
