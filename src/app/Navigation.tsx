"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LucideMenu } from "lucide-react";
import { useMusicContext } from "@/context";

const Navigation = () => {
  const musicContextContent = useMusicContext(); 

  const removeMusic = () => {
    if (musicContextContent?.bgMusic1) {
      musicContextContent.bgMusic1.pause();
      musicContextContent.bgMusic1.currentTime = 0;
    }
  };
  
  return (
    <nav>
      <div className="flex justify-between items-center p-4">
        <h1 className="font-bold text-xl">🧙 Word Wizard</h1>
        <Sheet>
          <SheetTrigger className="md:hidden"><LucideMenu /></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="text-start">🧙 Word Wizard</SheetTitle>
            </SheetHeader>             
              <ul id="nav-options" className="flex flex-col gap-3 pt-3">
                <li>
                  <SheetClose asChild>
                    <Link href={"/about"} onClick={removeMusic}>
                      About
                    </Link>
                  </SheetClose>
                </li>
                <SheetClose asChild>
                  <Link href={"/"} onClick={removeMusic}>
                    <Button>
                      Play
                    </Button>  
                  </Link>
                </SheetClose>
              </ul>
          </SheetContent>
        </Sheet>
        <ul id="nav-options" className="flex gap-3 items-center hidden md:flex">
          <li>
            <Link href={"/about"} onClick={removeMusic}>
              About
            </Link>
          </li>
          <Link href={"/"} onClick={removeMusic}>
            <Button>
              Play
            </Button>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation