#!/usr/bin/env node

import { execa } from 'execa';
import chalk from 'chalk';
import fs from 'fs';

const log = console.log;

async function run() {
  try {
    log(chalk.cyan('Creating Vite + React project...'));

    await execa('npm', ['create', 'vite@latest', '.', '--', '--template', 'react']);

    log(chalk.green('Installing dependencies...'));
    await execa('npm', ['install']);

    log(chalk.green('Installing Tailwind CSS and Vite plugin...'));
    await execa('npm', ['install', 'tailwindcss', '@tailwindcss/vite']);

    log(chalk.green('Configuring vite.config.js...'));
    fs.writeFileSync('vite.config.js', `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
`.trim());

    if (!fs.existsSync('src')) {
      fs.mkdirSync('src');
    }
    fs.writeFileSync('src/index.css', `
@import "tailwindcss";
`.trim());

    log(chalk.yellow('Almost ready!'));
    log(chalk.bold.green('\nNow run:'));
    log(chalk.bold('npm run dev'));

  } catch (err) {
    console.error(chalk.red('Something went wrong:'), err);
  }
}

run();
