'use client'

import Wizard from "../../public/wizard-avatar-pixelate.png";
import Hand from "../../public/hand-pixelate.png";
import Image from "next/image";
import "./game.css";
import { LucideHeart, LucideHeartCrack, LucideCrown } from "lucide-react";

type TypeGame = {
  highScore: number,
  currentScore: number,
  health: number
}

const Game:React.FC<TypeGame>  = ({ highScore, currentScore, health }) => {
  return (
    <div className="w-full flex flex-col justify-center">
      <div id="status" className="flex justify-between">
        <div className="flex gap-2" id="health">
          {[...Array(3)].map((_, index) => {
            const shouldShowFullHeart = index < health;
            return (
              <div key={index}>
                {shouldShowFullHeart ? (
                  <LucideHeart className="fill-red-600" />
                ) : (
                  <LucideHeartCrack className="fill-red-600" />
                )}
              </div>
            );
          })}
        </div>
        <div id="best-score" className="flex items-center gap-2">
          <LucideCrown className="fill-yellow-500" />
          <p>{highScore}</p>
        </div>
      </div>
      <div id="current-score" className="flex justify-center text-2xl font-bold my-12">{currentScore}</div>
      <div id="game" className="grid grid-cols-[1fr_3fr_1fr] items-center justify-center w-full avatar-container">
        <Image src={Hand} alt="Left hand" className={health <= 2 ? "hand move-left-hand" : "hand"} id="left-hand" />
        <Image src={Wizard} alt="Wizard avatar" id="wizard" />
        <Image src={Hand} alt="Left hand" className={health <= 1 ? "hand move-right-hand" : "hand"} id="right-hand" />
      </div>
    </div>
    
  )
}

export default Game