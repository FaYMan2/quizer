import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <nav className="flex justify-between">
      <img
        src="\QuizMelogo-removebg-preview.png"
        className="w-28 h-10 mx-2 mt-2"
      />
      <SignedOut>
        <SignInButton>
          <Button variant={"secondary"} className="mx-2 rounded-xl mt-2">
            Sign in
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <div className="mx-4 w-6 mt-3">
          <UserButton />
        </div>
      </SignedIn>
    </nav>
  );
}
