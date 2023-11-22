"use client";

import { FC, useState } from "react";
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
import { containsSpecialCharacters } from "@/utils/contains-special-characters";
import { hasDuplicates } from "@/utils/has-duplicates";

const formSchema = z.object({
  id: z.string(),
  content: z.string()
});

interface EditReplyFormProps {
  reply: {
    id: string;
    authorId: string; // not here but for checking if user is author of thread
    content: string;
  };
}

export const EditReplyForm: FC<EditReplyFormProps> = ({ reply }) => {
  const router = useRouter();
  const [contentMessage, setContentMessage] = useState("");

  const [formValid, setFormValid] = useState({ content: true });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: reply.id,
      content: reply.content
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch("/api/threads/replies", values);
      router.push(`/forums/replies/${response.data}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="grid grid-flow-row">
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">Content</FormLabel>
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
            <Button disabled={isLoading || !formValid.content} className="bg-emerald-500 text-white hover:bg-emerald-800 transition w-[120px] px-0">
              {isLoading ? <Image src={spinner} alt="loading" className="h-[100%]" /> : <p>Save changes</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
