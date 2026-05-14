import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />
      
      {/* Header-like branding */}
      <Link to="/" className="absolute top-10 left-10 hidden md:flex items-center gap-2 group">
        <div className="w-2 h-2 bg-[var(--primary)] shadow-[0_0_8px_var(--primary)] group-hover:scale-125 transition-transform" />
        <span className="text-sm tracking-[0.3em] font-mono">CODESPRINT</span>
      </Link>

      <div className="w-full max-w-[420px] relative z-10 px-4 sm:px-0">
        <div className="bg-[var(--surface-1)] border hairline p-6 sm:p-10 shadow-2xl relative overflow-hidden transition-all duration-500">
          {/* Subtle glow on top */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50" />
          
          <div className="mb-10 text-center">
            <h1 className="text-xl sm:text-2xl tracking-[0.2em] font-mono mb-2">
              {isSignup ? "CREATE ACCOUNT" : "WELCOME BACK"}
            </h1>
            <p className="text-[9px] sm:text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase max-w-[280px] mx-auto leading-relaxed">
              {isSignup ? "Join CodeSprint and start competing with developers worldwide." : "Access your developer arena and continue competing."}
            </p>
          </div>

          <form className="space-y-5 sm:space-y-6" onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] block uppercase pl-1">
                  Username
                </label>
                <input 
                  type="text" 
                  className="w-full bg-[var(--surface-2)] border hairline px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-all font-mono"
                  placeholder="zero_cool"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] block uppercase pl-1">
                Email
              </label>
              <input 
                type="email" 
                className="w-full bg-[var(--surface-2)] border hairline px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-all font-mono"
                placeholder="developer@codesprint.dev"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] block uppercase">
                  Password
                </label>
                {!isSignup && (
                  <a href="#" className="text-[9px] tracking-[0.2em] text-[var(--primary)] hover:underline opacity-80 uppercase">Reset access</a>
                )}
              </div>
              <input 
                type="password" 
                className="w-full bg-[var(--surface-2)] border hairline px-4 py-3 text-sm focus:outline-none focus:border-[var(--primary)] transition-all font-mono"
                placeholder="********"
              />
            </div>

            <button className="w-full bg-[var(--primary)] text-[var(--primary-foreground)] py-3.5 sm:py-3 text-[11px] tracking-[0.3em] font-bold hover:opacity-90 transition-all animate-pulse-glow mt-2">
              {isSignup ? "JOIN CODESPRINT" : "LAUNCH SESSION"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t hairline space-y-4">
            <div className="text-center">
              <span className="text-[9px] tracking-[0.3em] text-[var(--muted-foreground)] uppercase">
                {isSignup ? "Or continue with" : "Quick access"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button className="flex items-center justify-center gap-2 border hairline bg-[var(--surface-2)] py-2.5 text-[9px] sm:text-[10px] tracking-[0.2em] hover:bg-[var(--surface-3)] transition-all uppercase">
                GitHub
              </button>
              <button className="flex items-center justify-center gap-2 border hairline bg-[var(--surface-2)] py-2.5 text-[9px] sm:text-[10px] tracking-[0.2em] hover:bg-[var(--surface-3)] transition-all uppercase">
                Google
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[10px] tracking-[0.2em] text-[var(--muted-foreground)] uppercase">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <button 
              onClick={() => setIsSignup(!isSignup)}
              className="text-[var(--primary)] hover:underline focus:outline-none"
            >
              {isSignup ? "Sign in" : "Create account"}
            </button>
          </p>
        </div>
        
        <div className="mt-12 text-center">
          <Link to="/" className="text-[10px] tracking-[0.3em] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors uppercase">
            ← Exit terminal
          </Link>
        </div>
      </div>
    </div>
  );
}
