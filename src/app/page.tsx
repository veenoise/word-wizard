'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { LucideSendHorizonal } from "lucide-react";
import Game from "./Game";
import React, { useEffect, useState } from "react";
import { PulseLoader, ScaleLoader } from "react-spinners";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useMusicContext } from "@/context";

export default function Home() {
  // Game states
  const [challengeWord, setChallengeWord] = useState<string>('');
  const [aiResult, setAiResult] = useState('');
  const [waitingAi, setWaitingAi] = useState<boolean>(false);
  const [waitingChallenge, setWaitingChallenge] = useState<boolean>(false);
  const [isEnabledSend, setIsEnabledSend] = useState<boolean>(false);
  const [userPrompt, setUserPrompt] = useState<string>('');
  const musicContextContent = useMusicContext();

  // UI
  const { toast } = useToast();
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(true);

  // Player states
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [playerError, setPlayerError] = useState<TypePlayerError | null>();
  const [health, setHealth] = useState(3);

  type TypePlayerError = {
    error: string
  }
  // Wizard statements
  const wizardWinSays = [
    "Curse your luck and skill! How dare you defy my power?!",
    "This is outrageous! No mere mortal should wield such mastery!",
    "You dare to triumph over me? I will not stand for this insolence!",
    "Stop grinning, fool! Your victory will be short-lived, I assure you!",
    "Bah! Even the gods mock me as you inch closer to glory!"
  ]
  const wizardLoseSays = [
    "Oh, is that all you've got? Perhaps you'd like to surrender now?",
    "Struggling, are we? How adorable! Do you need a moment to cry?",
    "This is almost too easy. Perhaps I should give you a head start next time!",
    "Pathetic! I've seen goblins with more fight than you!",
    "You call that effort? My grandmother could best you, and she's a ghost!"
  ]

  useEffect(() => {
    fetchRandomWord();

    // Get highest score
    if (localStorage.getItem("high-score") === null) {
      localStorage.setItem("high-score", "0");
    } else {
      setHighScore(parseInt(localStorage.getItem("high-score") as string));
    }
  }, [])

  const fetchRandomWord = async () => {
    setWaitingChallenge(true);
    const getRandomWord = await fetch('https://random-word-api.herokuapp.com/word?length=5');
    const randomWord = await getRandomWord.json();
    setChallengeWord(randomWord[0]);
    setWaitingChallenge(false);
  }
  
  const throwConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;
 
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
 
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
 
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  const defeatConfetti = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0, colors:["#FF0000", "#000000"] };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;
 
    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();
 
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
 
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }

  const userInput = (event:React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.replaceAll(' ', '').toLowerCase().includes(challengeWord) || event.target.value.replaceAll(' ', '').match(/[^A-Za-z ]+/gmi)) {
      setIsEnabledSend(false);
    } else if (event.target.value.split(/\s+/).length > 4) {
      setIsEnabledSend(false);
    } else if (event.target.value.length > 25) {
      setIsEnabledSend(false);
    } else if (event.target.value.trim() === "") {
      setIsEnabledSend(false);
    } else if (waitingAi || challengeWord === '') {
      setIsEnabledSend(false);
    } else if (health < 1)  {
      setIsEnabledSend(false);
    } else {
      setUserPrompt(event.target.value);
      setIsEnabledSend(true);
    }
  }

  const newChallenge = () => {
    // Reset states
    setIsEnabledSend(false);
    setTimeout(() => {
      setChallengeWord('');
      fetchRandomWord();
      setAiResult('');
      setIsEnabledSend(true)
      setPlayerError(null);
    }, 5000) 
  }

  const winLogic = () => {
    // Show victory assets
    throwConfetti();
    if (musicContextContent?.soundEffect4) {
      musicContextContent.soundEffect4.play()
    };
    setTimeout(() => {
      toast({
        title: wizardWinSays[Math.floor(Math.random() * 5)]
      });
    }, 0);

    // Update score
    setCurrentScore((prevScore) => {
      const newScore = prevScore + 1;
    
      setHighScore((prevHighScore) => {
        if (newScore > prevHighScore) {
          localStorage.setItem("high-score", newScore.toString());
          return newScore;
        }
        return prevHighScore;
      });
    
      return newScore;
    });

    // Prepare next challenge
    newChallenge();
  }

  const loseLogic = () => {
    // Load lose assets
    setTimeout(() => {
      toast({
        title: wizardLoseSays[Math.floor(Math.random() * 5)]
      });
    }, 0);

    // Conditionally load assets based on health
    setHealth(prevHealth => {
      const newHealth = prevHealth - 1;
      
      // Sound effects when player loses
      switch (newHealth) {
        case 2:
          if (musicContextContent.soundEffect1) {
            musicContextContent.soundEffect1.play();
          }
          break;
        case 1:
          if (musicContextContent.soundEffect2) {
            musicContextContent.soundEffect2.play();
          }
          break;
        case 0:
          if (musicContextContent.soundEffect3) {
            musicContextContent.soundEffect3.play();
          }
          defeatConfetti();
          // Reset states after 5 seconds
          setTimeout(() => {
            setCurrentScore(0);
            setHealth(3);
          }, 5000);
          break;
      }
      
      return newHealth;
    });    

    // Prepare next challenge
    newChallenge();
  }

  const sendPrompt = async () => {
    // Make sure the challengeWord is loaded before fetching
    if (challengeWord !== "") {
      try {
        setWaitingAi(true);
        const fetchAI = await fetch(`https://d216u96he4pqp3.cloudfront.net/api/get/prompt?prompt=${userPrompt}&word=${challengeWord}`);
        const fetchResult = await fetchAI.json();

        setWaitingAi(false);
        if ("error" in fetchResult) {
          setPlayerError({"error": fetchResult.error});
          return;
        }

        if ("result" in fetchResult) {
          setAiResult(fetchResult.result);
        }

        if (fetchResult.result.replaceAll(" ", '').toLowerCase().match(`${challengeWord}`)) {
          winLogic();
        } else {
          loseLogic();          
        }
      } catch (fetchError) {
        if (Array.isArray(fetchError)) {
          // If it's an array, join the items into a single string (or handle it differently)
          console.error('Fetch error:', fetchError.join(', '));
          setPlayerError({ error: fetchError.join(', ') });
        } else {
          console.error('Fetch error:', fetchError);
          setPlayerError({ error: `${fetchError}` }); // Or whatever string conversion is suitable
        }
      }
    } else {
      setPlayerError({"error": "Please wait for the challenge word."});
   }
  }

  return (
    <div className="container mx-auto h-[calc(100dvh-60px)] md:h-[calc(100dvh-68px)] grid grid-rows-[64px_auto_200px] md:grid-rows-none md:grid-cols-[5fr_6fr] gap-4 px-4">
      <AlertDialog open={isAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Outwit the Wizard</AlertDialogTitle>
            <AlertDialogDescription>
              The wizard challenges you to summon their magic with a carefully crafted 4-word phrase. Your task is simple: use your wits to create a prompt that leads the wizard to include a <span className="font-bold">randomly chosen challenge word</span> in their reply. 
              <br /><br />
              You have a maximum of 25 characters to craft your phrase—choose wisely! If the wizard&apos;s response includes the challenge word, you win. If not, you lose!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setIsAlertDialogOpen(false);
              if (musicContextContent.bgMusic1) {
                musicContextContent.bgMusic1.play() 
              }
            }}>I understand</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <div 
        id="random-word" 
        className="border-transparent rounded bg-neutral-200 text-neutral-800 text-center flex flex-col justify-center items-center md:hidden"
      >
        <p>Your word is:</p>
        <code>{challengeWord ? challengeWord : <PulseLoader size={4} />}</code>
      </div>
      <Game highScore={highScore} currentScore={currentScore} health={health} />
      <div className="h-full flex flex-col justify-center gap-4">
        <div 
          id="random-word" 
          className="border-transparent rounded bg-neutral-200 text-neutral-800 text-center md:flex flex-col justify-center items-center hidden p-2"
        >
          <p>Your word is:</p>
          <code>{challengeWord ? challengeWord : <PulseLoader size={4} />}</code>
        </div>
        <div id="game-logic" className="flex flex-col gap-4">
          <code className="bg-yellow-900 p-2 border-transparent rounded min-h-[100px]">{waitingAi ? <ScaleLoader height={16} color={"#FFFFFF"} className="text-center" /> : aiResult ? aiResult : ""}</code>
          <div className="flex w-full gap-2 flex justify-center items-center">
            <Input 
              onChange={userInput} 
              onKeyDown={e => e.key === "Enter" && !(!isEnabledSend || waitingChallenge || waitingAi) ? sendPrompt() : null}
              type="text" 
              placeholder="Type your prompt here..." 
              className="bg-neutral-50 text-neutral-800" 
              disabled={waitingChallenge || waitingAi}
            />
            <Button 
              onClick={sendPrompt} 
              disabled={!isEnabledSend || waitingChallenge || waitingAi}
            >
              <LucideSendHorizonal>
              </LucideSendHorizonal>
            </Button>
          </div>
          {
            playerError?.error ? 
            <code className="bg-red-500 p-2 border-transparent rounded">{playerError.error}</code> :
            <></>
          }
        </div>
      </div>
      
    </div>
  );
}
