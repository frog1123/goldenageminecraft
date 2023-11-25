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
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const formSchema = z.object({
  name: z.string(),
  email: z.string()
});

export const SignUpGoogleForm: FC = () => {
  // const router = useRouter();
  const [nameMessage, setNameMessage] = useState("");
  const [error, setError] = useState("");
  const session = useSession();

  const [formValid, setFormValid] = useState({ name: false });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: session?.data?.user?.email ?? ""
    }
  });

  useEffect(() => {
    form.setValue("email", session?.data?.user?.email ?? "");
  }, [session?.status]);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/users/register/google", values);
    } catch (err: any) {
      if (err.resonse.status === 200) {
        return redirect("/");
      }
      if (err.response.status === 409) {
        setError(err.response.data);
      } else {
        console.log("register error", err);
      }
    }
  };

  useEffect(() => {
    setNameMessage("Name is required");
  }, []);

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

            <div>
              <Button disabled={isLoading || !formValid.name} className="bg-emerald-500 text-white hover:bg-emerald-800 transition w-[80px]">
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
      </div>
    </div>
  );
};
