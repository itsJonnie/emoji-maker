# Project Overview
* Use this guide to build a web app where users can give a text prompt to generate an emoji using model hosted on Replicate.

# Feature Requirements
* We will use Next.js, Shadcn UI, Lucid, Supabase, Clerk
* Create a form where users can put in prompt, and clicking on button that calls the replicate model to generate an emoji
* Have a nice UI and animation when the emoji is blank or generating
* Display all the images ever generated in grid
* When hover each emoji img, an icon button for download, and an icon button for like should be shown up

# Relevant Docs
## How to use Replicate emoji generator model:
Set the REPLICATE_API_TOKEN environment variable

export REPLICATE_API_TOKEN=r8_MDE**********************************

Visibility

Copy
Learn more about authentication

Install Replicate’s Node.js client library

npm install replicate

Copy
Learn more about setup
Run fofr/sdxl-emoji using Replicate’s API. Check out the model's schema for an overview of inputs and outputs.

import Replicate from "replicate";
const replicate = new Replicate();

const input = {
    prompt: "A TOK emoji of a man",
    apply_watermark: false
};

const output = await replicate.run("fofr/sdxl-emoji:dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e", { input });

import { writeFile } from "node:fs/promises";
for (const [index, item] of Object.entries(output)) {
  await writeFile(`output_${index}.png`, item);
}
//=> output_0.png written to disk

# Current File Structure (you HAVE to follow this structure below)

emoji-maker/
├── .next/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       └── input.tsx
├── lib/
├── node_modules/
├── public/
├── requirements/
├── .gitignore
├── components.json
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json

# Rules
* All new components should go in /components and be named like example-component.tsx unless otherwise specified
* All new pages go in /app
