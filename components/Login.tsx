"use client"
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Session } from "@supabase/supabase-js"; // Import correct type

const Login = ({ setSession }: { setSession: (session: Session | null) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) console.log(error);

    const { data } = await supabase.auth.getSession();
    setSession(data.session);
    router.refresh();
  };

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) console.error("Signup failed:", error.message);
    else {
      alert("Signup successful! Check your email to verify.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center relative bg-[#335145] shadow rounded p-6 w-[30%]">
      <h2 className="text-2xl my-2 p-3">Login :)</h2>
      <input
        className="w-full p-3 mb-3 rounded bg-gray-900 text-white focus:outline-none"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full p-3 mb-3 rounded bg-gray-900 text-white focus:outline-none"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="w-[30%] p-3 bg-green-600 hover:bg-green-700 rounded text-white">
        Login
      </button>
      <button onClick={handleSignUp} className="my-2 w-[30%] p-3 bg-green-700 hover:bg-green-800 rounded text-white">
        Sign up
      </button>
    </div>
  );
};

export default Login;
