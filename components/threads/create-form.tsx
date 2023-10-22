'use client';

import { FC } from 'react';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextareaAutosize from 'react-textarea-autosize';

const formSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Title is required'
    })
    .max(100, {
      message: 'Title needs to be under 100 characters'
    }),
  content: z.string().max(1000, {
    message: 'Content needs to be under 1000 characters'
  })
});

const CreateThreadForm: FC = () => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: ''
    }
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/threads', values);
      form.reset();
      router.push('/forums');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem className='grid grid-flow-row'>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Title</FormLabel>
                <FormControl>
                  <TextareaAutosize
                    disabled={isLoading}
                    className='bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md resize-none'
                    placeholder='Enter thread content'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='content'
            render={({ field }) => (
              <FormItem className='grid grid-flow-row'>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Content</FormLabel>
                <FormControl>
                  <TextareaAutosize
                    disabled={isLoading}
                    className='bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md resize-none'
                    placeholder='Enter thread content'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button disabled={isLoading}>Create</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateThreadForm;
