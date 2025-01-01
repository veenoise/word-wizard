'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Marquee from "@/components/ui/marquee";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import amazonQ from "../../../public/amazon-q.png";
import awsLambda from "../../../public/aws-lambda.png";
import awsCloudWatch from "../../../public/aws-cloudwatch.png"
import awsAmplify from "../../../public/amplify.png"
import awsCloudFront from "../../../public/aws-cloudfront.png";
import expressJs from "../../../public/express.png";
import nextJs from "../../../public/next-js.jpeg";
import shadcn from "../../../public/shadcn.png";
import magicUi from "../../../public/magic-ui.png";
import tailwind from "../../../public/tailwind.png";
import randomWordApi from "../../../public/random-word-api.png";
import gemini from "../../../public/gemini.jpg";

const techContent = [
  {
    title: "Amazon Q",
    description: "Faster development using a dependable AI assistant",
    image: amazonQ,
    alt: "Amazon Q logo",
    link: "https://aws.amazon.com/q/"
  },
  {
    title: "AWS Lambda",
    description: "Develop serverless functions with ease",
    image: awsLambda,
    alt: "AWS Lambda logo",
    link: "https://aws.amazon.com/lambda/"
  },
  {
    title: "AWS CloudWatch",
    description: "Monitoring, Logging, and Debugging",
    image: awsCloudWatch,
    alt: "AWS CloudWatch logo",
    link: "https://aws.amazon.com/cloudwatch/"
  },
  {
    title: "AWS Amplify",
    description: "Deployment of Next.js app",
    image: awsAmplify,
    alt: "AWS Amplify logo",
    link: "https://aws.amazon.com/amplify/"
  },
  {
    title: "AWS CloudFront",
    description: "Enhance security and optimized delivery",
    image: awsCloudFront,
    alt: "AWS CloudFront logo",
    link: "https://aws.amazon.com/cloudfront/"
  },
  {
    title: "Express.js",
    description: "Write server-side JavaScript logic quickly",
    image: expressJs,
    alt: "Express.js logo",
    link: "https://expressjs.com/"
  },
  {
    title: "Next.js",
    description: "Fullstack JavaScript Framework",
    image: nextJs,
    alt: "Next.js logo",
    link: "https://nextjs.org/"
  },
  {
    title: "shadcn/ui",
    description: "Pre-built CSS components with TypeScript support",
    image: shadcn,
    alt: "shadcn/ui logo",
    link: "https://ui.shadcn.com/"
  },
  {
    title: "Magic UI",
    description: "Cool CSS components",
    image: magicUi,
    alt: "Magic UI logo",
    link: "https://magicui.design/"
  },
  {
    title: "tailwindcss",
    description: "CSS framework for designing layout",
    image: tailwind,
    alt: "Tailwindcss logo",
    link: "https://tailwindcss.com/"
  },
  {
    title: "random-word-api",
    description: "Query random words",
    image: randomWordApi,
    alt: "random word api logo",
    link: "https://github.com/RazorSh4rk/random-word-api/"
  },
  {
    title: "Gemini",
    description: "Free generative AI API",
    image: gemini,
    alt: "Gemini logo",
    link: "https://aistudio.google.com/prompts/new_chat"
  }
]

const specialThanks = [
  {
    name: "Clai",
    description: "Beautiful girlfriend"
  },
  {
    name: "RazorSh4rk",
  description: "Creator of the random word API"
  },
  {
    name: "Leohpaz",
    description: "Awesome SFX"
  },
  {
    name: "Tallbeard Studios and Abstraction Music",
    description: "Amazing background music"
  },
  {
    name: "Amazon Web Service",
    description: "Superb software solutions"
  },
  {
    name: "Devpost",
    description: "Opportunity to learn new skills and win prizes"
  },
]

const page = () => {
  return (
    <div className="container mx-auto px-4 mt-4 grid gap-4 relative">
      <div className="py-16 px-4 bg-black rounded-lg">
        <h1 className="text-lg font-bold text-center">About</h1>
        <p className="leading-relaxed text-center max-w-[600px] mx-auto">
          Thank you for visiting this site. This project is my submission for the <a href="https://awsdevchallenge.devpost.com/" target="_blank" className="underline decoration-double">AWS Game Builder Challenge</a>. To sum it up, this game uses a random word API to get the challenge word. The player then queries Gemini to hopefully get an output containing the challenge word.
        </p>
      </div>
      
      <div className="rules py-16">
        <h2 className="font-bold mb-2">AWS Game Builder Rules</h2>
        <ul className="leading-relaxed">
          <li>
            ♥️ Build a game using Amazon Q Developer
          </li>
          <li>
            💀 Add at least one additional AWS service within your game
          </li>
        </ul>
      </div>
      <div className="tech">
        <h2 className="font-bold mb-2">Technologies used</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {
            techContent.map((item, id) => {
              return (
                <Card key={id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{ item.title }</CardTitle>
                    <CardDescription>{ item.description }</CardDescription>
                  </CardHeader>
                  <CardContent className="justify-center">
                    <Image 
                      src={ item.image } 
                      alt={ item.alt }
                      loading="lazy"
                      width={500}
                      height={300}                
                      className="w-full rounded"
                    />
                  </CardContent>
                  <CardFooter className="justify-end mt-auto">
                    <Button asChild>
                      <Link href={ item.link } target="_blank" rel="noopener noreferrer"
                      >
                        Visit
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              )
            })
          }
        </div>
      </div>
      <div className="thanks pt-16">
        <h2 className="font-bold mb-2">Special thanks</h2>
        <div className="absolute flex h-[150px] flex-col items-center left-0 right-0 w-full justify-center overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {specialThanks.map((item, id) => (
              <Card key={id}>
                <CardHeader>
                  <CardTitle>
                    { item.name }
                  </CardTitle>
                  <CardDescription>
                    { item.description }
                  </CardDescription>
                </CardHeader>
              </Card>              
            ))}
          </Marquee>
        </div>        
        {/* <div className=""></div> */}
      </div>
    </div>   
  )
}

export default page