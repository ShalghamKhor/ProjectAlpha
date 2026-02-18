import Button from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-black/5">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-orange-500/10 border border-orange-500/20 grid place-items-center">
            <span className="text-orange-600 font-bold">⬢</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            ShareLocal
          </span>
        </div>

        <div  className="">
            <nav className="flex flex-row gap-4 ">
                <a href="/#">
                HomePage</a>
                <a href="/#">
                Contact</a>
                <a href="/#">
                About Us</a>
                <a href="/#">
                Terms & Rules</a>
            </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button href="/login" variant="outline">
            Sign In
          </Button>

          <Button href="/register" variant="primary">
            Sign Up
          </Button>
        </div>

      </div>
    </header>
  );
}
