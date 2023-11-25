"use client";

import { FC, useEffect, useState } from "react";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import spinner from "@/public/assets/spinners/3dots-spinner.svg";
import Link from "next/link";
import Image from "next/image";
import { logo } from "@/lib/logo";
import { Eye, EyeOff, MailWarning } from "lucide-react";
import { isEmailValid } from "@/utils/is-email-valid";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  retypePassword: z.string()
});

export const SignUpEmailForm: FC = () => {
  // const router = useRouter();
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");
  const [phase, setPhase] = useState("register");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");

  const [formValid, setFormValid] = useState({ name: false, email: false, password: false });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      retypePassword: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (password !== retypedPassword) {
      setError("Passwords need to be the same");
      return;
    }

    try {
      const res = await axios.post("/api/users/register/email", values);

      if (res.status === 200) {
        setPhase("waiting-email");
      }
    } catch (err: any) {
      if (err.response.status === 409) {
        setError(err.response.data);
      } else {
        console.log("register error", err);
      }
    }
  };

  useEffect(() => {
    setNameMessage("Name is required");
    setEmailMessage("Email is required");
    setPasswordMessage("Password is required");
  }, []);

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md overflow-hidden">
      <div className="bg-emerald-500 h-1 hidden sm:block"></div>
      <div className="p-4">
        {phase === "register" && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-[max-content_auto] gap-1 mx-auto w-max place-items-center">
                <div className="w-5 h-5 relative">
                  <Image src={logo()} alt="logo" fill />
                </div>
                <span className="uppercase text-xl font-bold text-zinc-500 dark:text-white">Register</span>
              </div>
              <FormMessage>{error}</FormMessage>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-flow-row">
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">Username</FormLabel>
                    <FormControl>
                      <input
                        disabled={isLoading}
                        className="bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md resize-none"
                        placeholder="Enter username"
                        {...field}
                        onChange={e => {
                          const value = e.target.value;

                          setError("");

                          if (value.length === 0) {
                            setNameMessage("Name is required");
                            setFormValid({ ...formValid, name: false });
                          } else {
                            setNameMessage("");
                            setFormValid({ ...formValid, name: true });
                          }

                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage>{nameMessage}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-flow-row">
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">Email</FormLabel>
                    <FormControl>
                      <input
                        disabled={isLoading}
                        className="bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md resize-none"
                        placeholder="Enter email"
                        {...field}
                        onChange={e => {
                          const value = e.target.value;

                          setError("");

                          if (value.length === 0) {
                            setEmailMessage("Email is required");
                            setFormValid({ ...formValid, email: false });
                          } else if (!isEmailValid(value)) {
                            setEmailMessage("Enter a valid email address");
                            setFormValid({ ...formValid, email: false });
                          } else {
                            setEmailMessage("");
                            setFormValid({ ...formValid, email: true });
                          }

                          field.onChange(e);
                        }}
                      />
                    </FormControl>
                    <FormMessage>{emailMessage} </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid grid-flow-row">
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">Password</FormLabel>
                    <div className="grid grid-cols-[auto_max-content] rounded-md overflow-hidden">
                      <FormControl>
                        {/* Toggle password as dots */}
                        <input
                          type={!showPassword ? "password" : "text"}
                          disabled={isLoading}
                          className="bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 resize-none"
                          placeholder="Enter password"
                          {...field}
                          onChange={e => {
                            const value = e.target.value;
                            setPassword(value);
                            setError("");

                            if (value.length === 0) {
                              setPasswordMessage("Password is required");
                              setFormValid({ ...formValid, password: false });
                            } else {
                              setPasswordMessage("");
                              setFormValid({ ...formValid, password: true });
                            }

                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <button
                        className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 px-3"
                        onClick={e => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        <div>{!showPassword ? <EyeOff className="text-white w-4 h-4" /> : <Eye className="text-white w-4 h-4" />}</div>
                      </button>
                    </div>
                    <FormMessage>{passwordMessage}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retypePassword"
                render={({ field }) => (
                  <FormItem className="grid grid-flow-row">
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">Retype Password</FormLabel>
                    <div className="grid grid-cols-[auto_max-content] rounded-md overflow-hidden">
                      <FormControl>
                        {/* Toggle password as dots */}
                        <input
                          type={!showPassword ? "password" : "text"}
                          disabled={isLoading}
                          className="bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 resize-none"
                          placeholder="Enter password"
                          {...field}
                          onChange={e => {
                            const value = e.target.value;
                            setRetypedPassword(value);
                            setError("");

                            if (value.length === 0) {
                              setPasswordMessage("Password is required");
                              setFormValid({ ...formValid, password: false });
                            } else {
                              setPasswordMessage("");
                              setFormValid({ ...formValid, password: true });
                            }

                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <button
                        className="cursor-pointer bg-cyan-500 hover:bg-cyan-600 px-3"
                        onClick={e => {
                          e.preventDefault();
                          setShowPassword(!showPassword);
                        }}
                      >
                        <div>{!showPassword ? <EyeOff className="text-white w-4 h-4" /> : <Eye className="text-white w-4 h-4" />}</div>
                      </button>
                    </div>
                  </FormItem>
                )}
              />
              <div>
                <Button
                  disabled={isLoading || !(formValid.name && formValid.email && formValid.password)}
                  className="bg-emerald-500 text-white hover:bg-emerald-800 transition w-[80px]"
                >
                  {isLoading ? <Image src={spinner} alt="loading" className="h-[100%]" /> : <p>Register</p>}
                </Button>
              </div>
              <p className="uppercase text-xs font-bold text-zinc-500 dark:text-white text-center">
                Have an account?{" "}
                <Link href="/sign-in" className="text-blue-500 hover:text-blue-600 transition">
                  Sign in
                </Link>
              </p>
            </form>
          </Form>
        )}
        {phase === "waiting-email" && (
          <div className="grid place-items-center">
            <div className="grid place-items-center p-2">
              <div className="w-16 h-16 relative">
                <Image src={logo()} alt="logo" fill />
              </div>
            </div>
            <div className="grid grid-cols-[max-content_auto] place-items-center gap-1 w-max">
              <MailWarning className="w-4 h-4" />
              <span>Check your email for to activate your account</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
