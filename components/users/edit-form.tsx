"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TextareaAutosize from "react-textarea-autosize";
import Image from "next/image";
import spinner from "@/public/assets/spinners/3dots-spinner.svg";
import { useRouter } from "next/navigation";
import { CurrentUserType } from "@/types/users";

interface EditUserFormProps {
  user: CurrentUserType;
}

const formSchema = z.object({
  id: z.string(),
  bio: z.string()
});

export const EditUserForm: FC<EditUserFormProps> = ({ user }) => {
  const router = useRouter();
  const [bioMessage, setBioMessage] = useState("");
  const [formValid, setFormValid] = useState({ bio: true });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: user.id,
      bio: user.bio
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch("/api/users", values);
      router.push(`/users/${user.id}`);
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
            name="bio"
            render={({ field }) => (
              <FormItem className="grid grid-flow-row">
                <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-white">Bio</FormLabel>
                <FormControl>
                  <TextareaAutosize
                    disabled={isLoading}
                    className="bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md resize-none"
                    placeholder="Enter bio (under 300 characters)"
                    {...field}
                    onChange={e => {
                      const value = e.target.value;
                      if (value.length >= 500) {
                        setBioMessage(`Content must be under 300 characters (${499 - value.length})`);
                        setFormValid({ ...formValid, bio: false });
                      } else {
                        setBioMessage("");
                        setFormValid({ ...formValid, bio: true });
                      }

                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage>{bioMessage}</FormMessage>
              </FormItem>
            )}
          />

          <div>
            <Button disabled={isLoading || !formValid.bio} className="bg-emerald-500 text-white hover:bg-emerald-800 transition w-[120px] px-0">
              {isLoading ? <Image src={spinner} alt="loading" className="h-[100%]" /> : <p>Save changes</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
