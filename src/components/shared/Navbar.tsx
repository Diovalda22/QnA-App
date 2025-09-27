import { Button } from "../ui/button";

export const Navbar = () => {
  return (
    <header className="flex h-16 items-center justify-between border-b p-2">
      <h1>QnA Forum</h1>

      <div>
        <Button>Sign In</Button>
      </div>
    </header>
  );
};
