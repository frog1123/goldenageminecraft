"use client";

import { FC, useContext, useState } from "react";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import spinner from "@/public/assets/spinners/3dots-spinner.svg";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { logo } from "@/lib/logo";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const SignInForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formValid, setFormValid] = useState({ email: false, password: false });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await signIn("credentials", { email: values.email, password: values.password, redirect: false, callbackUrl });

      if (res?.ok) {
        router.push("/after-signed-in");
      } else {
        setError("Authentication failed");
      }
    } catch (err) {
      console.log("login error", err);
    }
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md overflow-hidden">
      <div className="bg-emerald-500 h-1 hidden sm:block"></div>
      <div className="p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-[max-content_auto] gap-1 mx-auto w-max place-items-center">
              <div className="w-5 h-5 relative">
                <Image src={logo()} alt="logo" fill />
              </div>
              <span className="uppercase text-xl font-bold text-zinc-500 dark:text-white">Login</span>
            </div>
            <FormMessage>{error}</FormMessage>
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
                          setFormValid({ ...formValid, email: false });
                        } else {
                          setFormValid({ ...formValid, email: true });
                        }

                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-flow-row">
                  <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">Password</FormLabel>
                  <FormControl>
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

                            setError("");

                            if (value.length === 0) {
                              setFormValid({ ...formValid, password: false });
                            } else {
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
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <Button disabled={isLoading || !(formValid.email && formValid.password)} className="bg-emerald-500 text-white hover:bg-emerald-800 transition w-[80px]">
                {isLoading ? <Image src={spinner} alt="loading" className="h-[100%]" /> : <p>Sign in</p>}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
