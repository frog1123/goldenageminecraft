"use client";

import { FC, useContext, useState } from "react";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import TextareaAutosize from "react-textarea-autosize";
import spinner from "@/public/assets/spinners/3dots-spinner.svg";
import Image from "next/image";
import { Context } from "@/context";
import { SignInButton } from "@/components/auth/sign-in-button";

interface ReplyThreadFormProps {
  threadId: string;
}

const formSchema = z.object({
  threadId: z.string(),
  content: z.string()
});

export const ReplyThreadForm: FC<ReplyThreadFormProps> = ({ threadId }) => {
  // const router = useRouter();
  const [contentMessage, setContentMessage] = useState("");
  const context = useContext(Context);

  const [formValid, setFormValid] = useState({ content: false });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      threadId,
      content: ""
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/threads/replies", values);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  if (!context.value.currentUser)
    return (
      <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
        <div className="grid grid-flow-row gap-2 place-items-center">
          <p className="text-center">You must be is signed in to reply</p>
          <SignInButton />
        </div>
      </div>
    );

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="grid grid-flow-row">
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">Reply</FormLabel>
                <FormControl>
                  <TextareaAutosize
                    disabled={isLoading}
                    className="bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md resize-none"
                    placeholder="Enter thread content"
                    {...field}
                    onChange={e => {
                      const value = e.target.value;
                      if (value.length >= 1000) {
                        setContentMessage(`Content must be under 1000 characters (${999 - value.length})`);
                        setFormValid({ ...formValid, content: false });
                      } else if (value.length === 0) {
                        setFormValid({ ...formValid, content: false });
                      } else {
                        setContentMessage("");
                        setFormValid({ ...formValid, content: true });
                      }
                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage>{contentMessage}</FormMessage>
              </FormItem>
            )}
          />
          <div>
            <Button disabled={isLoading || !formValid.content} className="bg-emerald-500 text-white hover:bg-emerald-800 transition w-[80px]">
              {isLoading ? <Image src={spinner} alt="loading" className="h-[100%]" /> : <p>Create</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
