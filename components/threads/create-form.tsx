'use client';

import { FC, useEffect, useState } from 'react';
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
import { containsSpecialCharacters } from '@/utils/contains-special-characters';
import { hasDuplicates } from '@/utils/has-duplicates';

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string())
});

const CreateThreadForm: FC = () => {
  const router = useRouter();
  const [tagMessage, setTagMessage] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [titleMessage, setTitleMessage] = useState('');

  const [formValid, setFormValid] = useState({ title: false, content: true, tags: true });

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

  useEffect(() => {
    setTitleMessage('Title is required');
  }, []);

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900 sm:rounded-md p-2'>
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
                    onChange={e => {
                      const value = e.target.value;

                      if (value.length === 0) {
                        setTitleMessage('Title is required');
                        setFormValid({ ...formValid, title: false });
                      } else if (value.length >= 100) {
                        setTitleMessage(`Content must be under 100 characters (${99 - value.length})`);
                        setFormValid({ ...formValid, title: false });
                      } else {
                        setTitleMessage('');
                        setFormValid({ ...formValid, title: true });
                      }

                      field.onChange(e);
                    }}
                  />
                </FormControl>
                <FormMessage>{titleMessage}</FormMessage>
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
                    onChange={e => {
                      const value = e.target.value;

                      if (value.length >= 1000) {
                        setContentMessage(`Content must be under 1000 characters (${999 - value.length})`);
                        setFormValid({ ...formValid, content: false });
                      } else {
                        setContentMessage('');
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
                      let specialCharacters = false;
                      let brokeMax = false;
                      if (tagsArray.length === 1 && tagsArray[0] === '') tagsArray = [];

                      for (const element of tagsArray) {
                        if (containsSpecialCharacters(element)) specialCharacters = true;
                        if (element.length >= 20) brokeMax = true;
                      }

                      if (tagsArray.length > 5) {
                        setTagMessage('You can only add up to 5 tags');
                        setFormValid({ ...formValid, tags: false });
                      } else if (brokeMax) {
                        setTagMessage('Tag needs to be under 20 characters');
                        setFormValid({ ...formValid, tags: false });
                      } else if (hasDuplicates(tagsArray)) {
                        setTagMessage('You can not have duplicate tags');
                        setFormValid({ ...formValid, tags: false });
                      } else if (tagsArray.includes('')) {
                        setTagMessage('Empty tags are not allowed');
                        setFormValid({ ...formValid, tags: false });
                      } else if (specialCharacters) {
                        setTagMessage('Special characters are not allowed');
                        setFormValid({ ...formValid, tags: false });
                      } else {
                        setTagMessage('');
                        setFormValid({ ...formValid, tags: true });
                      }

                      field.onChange(tagsArray);
                    }}
                  />
                </FormControl>
                <FormMessage>{tagMessage}</FormMessage>
              </FormItem>
            )}
          />
          <div>
            <Button
              disabled={isLoading || !(formValid.title && formValid.content && formValid.tags)}
              className='bg-emerald-500 text-white hover:bg-emerald-800 transition w-[80px]'
            >
              {isLoading ? <Image src={spinner} alt='loading' className='h-[100%]' /> : <p>Create</p>}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateThreadForm;
