"use client";
import { signIn, useSession } from "next-auth/react";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const session = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<"register" | "signin">("signin");

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/");
    }
  }, [router, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (formState === "register") {
        const result = await axios.post("/api/register", {
          username,
          email,
          password,
        });
        if (result.status === 200) {
          toast.success(result.data.message);
          await new Promise((resolve) => setTimeout(resolve, 500));
          const signInResult = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (signInResult?.error) toast.error(signInResult.error);
          else toast.success("Logged in");
        } else {
          toast.error(result.data.message);
        }
      } else {
        const signInResult = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
        if (signInResult?.error) toast.error(signInResult.error);
        else toast.success("Logged in");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePaswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              {formState === "register"
                ? "Create an account"
                : "Sign in to your account"}
            </h2>
            <p className="text-sm text-gray-600">
              {formState === "register"
                ? "Enter your email, username and password to sign up"
                : "Enter your email and password to sign in"}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {formState === "register" && (
              <FormInputElement
                label="username"
                onChange={handleUsernameChange}
                placeholder="Kartik"
                title="Username"
                value={username}
              />
            )}
            <FormInputElement
              label="email"
              onChange={handleEmailChange}
              placeholder="abc@gmail.com"
              title="Email"
              value={email}
            />
            <FormInputElement
              label="password"
              onChange={handlePaswordChange}
              placeholder="*****"
              title="Password"
              value={password}
            />
            <button
              type="submit"
              className="w-full py-2 px-4 border  rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 
              hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-blue-500"
              disabled={loading}
            >
              {formState === "register" ? "Sign up" : "Sign in"}
            </button>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2  text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <Github />
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 space-y-2">
          <button className="w-full text-sm text-blue-600 hover:text-blue-500">
            Forgot password?
          </button>
          <div className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <button
              className="text-blue-600 hover:text-blue-500"
              onClick={() => {
                setFormState(formState === "register" ? "signin" : "register");
              }}
            >
              {formState === "register" ? "Sign in" : "Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormInputElement({
  label,
  title,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  title: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <input
        id={label}
        type={label}
        placeholder={placeholder}
        required
        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1
         focus:ring-blue-500 focus:border-blue-200"
        value={value}
        onChange={(event) => {
          onChange(event);
        }}
      />
    </div>
  );
}

function Github() {
  return (
    <div className="grid grid-cols-1 gap-4">
      <button className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
        <svg
          className="w-5 h-5 inline-block mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.137 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
            clipRule="evenodd"
          />
        </svg>
        Github
      </button>
    </div>
  );
}
