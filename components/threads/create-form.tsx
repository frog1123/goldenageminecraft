'use client';

import { FC, useState } from 'react';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TextareaAutosize from 'react-textarea-autosize';
import spinner from '@/public/assets/spinners/3dots-spinner.svg';
import Image from 'next/image';

// prettier-ignore
const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(100, { message: 'Title needs to be under 100 characters' }),
  content: z.string().max(1000, { message: 'Content needs to be under 1000 characters' }),
  tags: z
    .array(
      z.string()
      .min(1, { message: 'Tag needs to be at least 1 character' })
      .max(20, { message: 'Tag needs to be under 20 characters' })
    )
    .max(5, {
      message: 'You can only add up to 5 tags'
    })
});

const CreateThreadForm: FC = () => {
  const router = useRouter();
  const [tagMessage, setTagMessage] = useState('');

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      content: '',
      tags: []
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
          <FormField
            control={form.control}
            name='tags'
            render={({ field }) => (
              <FormItem className='grid grid-flow-row'>
                <FormLabel className='uppercase text-xs font-bold text-zinc-500 dark:text-white'>Tags</FormLabel>
                <FormControl>
                  <input
                    disabled={isLoading}
                    className='bg-zinc-300/50 dark:bg-neutral-800 border-0 focus-visible:ring-0 text-black dark:text-white outline-none p-2 rounded-md'
                    placeholder='Add tags (max 5)'
                    {...field}
                    onChange={e => {
                      const value = e.target.value;
                      let tagsArray = value.split(',').map(tag => tag.trim());
                      if (tagsArray.length === 1 && tagsArray[0] === '') tagsArray = [];
                      if (tagsArray.includes('')) {
                        setTagMessage('Empty tags are not allowed');
                      } else {
                        setTagMessage(''); // Reset the message if tags are valid
                      }
                      console.log(tagsArray);
                      field.onChange(tagsArray);
                    }}
                  />
                </FormControl>
                <FormMessage>{tagMessage}</FormMessage>
              </FormItem>
            )}
          />
          <div>
            <Button disabled={isLoading} className='bg-emerald-500 text-white hover:bg-emerald-800 transition w-[80px]'>
              {isLoading ? <Image src={spinner} alt='loading' className='h-[100%]' /> : <p>Create</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateThreadForm;
