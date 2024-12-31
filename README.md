## Inspiration
My inspiration for creating this game came from the rapid proliferation of AI and its increasing integration into everyday life. I thought, why not create a game that challenges users to enhance their ability to prompt generative AI accurately—while having fun? The idea was to combine entertainment with learning how to work with AI effectively.

## What it does
The game utilizes a random word API to generate a challenge word for the player. The goal is for the player to craft a prompt using only four words, alphabet characters, and a maximum of 25 characters. The prompt must be designed in such a way that the AI generates a response that includes the challenge word. The accuracy and creativity of the prompt determine the quality of the AI’s output, adding an exciting layer of strategy and fun to the gameplay.

## How we built it
For this project, I leveraged several AWS services to create a seamless, serverless application:
- Amazon Q was instrumental in assisting with code completion, idea generation, fixing bugs, and refactoring throughout the development process. It was like having a mentor available 24/7.
- AWS Lambda allowed me to create a serverless function to process the backend logic, particularly for handling the Gemini API (and securely hiding the API keys using environment variables).
- AWS CloudWatch was used to look for the logs and errors of the AWS Lambda function, and to debug mistakes.
- AWS CloudFront was added to ensure enhanced security and faster content delivery.
- Finally, AWS Amplify made it easy to deploy and host my Next.js application, streamlining the entire development-to-deployment workflow.

## Challenges we ran into
As a beginner with AWS technologies, setting up AWS Lambda was the most challenging part of the project. However, through trial, error, and guidance from Amazon Q, I was able to overcome the obstacles. Amazon Q made the development process feel like I had an experienced developer by my side, without the fear of asking "basic" questions.

## Accomplishments that we're proud of
Here are a few milestones I'm particularly proud of:
- Successfully completed the project within 9 days.
- Gained a solid understanding of various AWS technologies.
- Discovered a powerful alternative to GitHub Copilot in Amazon Q, which offers excellent code completion (and even has a free tier!).
- Designed the entire UI and created some game assets from scratch.
- Overcame various challenges, such as fixing logic errors and optimizing the UI/UX, with the assistance of Amazon Q.

## What we learned
Through this project, I gained hands-on experience with:
- Setting up Express.js serverless functions in AWS Lambda.
- Configuring AWS CloudFront to improve security and performance.
- Deploying and hosting the app using AWS Amplify.

## What's next for Word Wizard
If the project proves to be successful, I plan to use AWS technologies to scale it and introduce several exciting new features:
- [ ] Adjustable difficulty level
- [ ] Additional skins and game assets
- [ ] Player vs. Player (PvP) Mode
- [ ] Adventure mode
- [ ] Leaderboards
- [ ] Streaks
- [ ] XP and Levels
- [ ] Achievement and Badges
- [ ] Gold Rush Mode -  A timed challenge mode for extra excitement