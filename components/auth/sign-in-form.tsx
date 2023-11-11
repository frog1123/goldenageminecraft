"use client";

import { FC, useState } from "react";
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

const formSchema = z.object({
  email: z.string(),
  password: z.string()
});

export const SignInForm: FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState("");

  const [formValid, setFormValid] = useState({ name: false, email: false, password: false });

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
        router.push(callbackUrl);
      } else {
        setError("Authentication failed");
      }
    } catch (err) {
      console.log("register error", err);
    }
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
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
                      setError("");
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
                  <input
                    disabled={isLoading}
                    className="bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md resize-none"
                    placeholder="Enter password"
                    {...field}
                    onChange={e => {
                      setError("");
                      field.onChange(e);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div>
            <Button className="bg-emerald-500 text-white hover:bg-emerald-800 transition w-[80px]">
              {isLoading ? <Image src={spinner} alt="loading" className="h-[100%]" /> : <p>Sign in</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
