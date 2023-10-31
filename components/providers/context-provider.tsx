'use client';

import React, { useState, ReactNode, FC } from 'react';
import { Context, ContextData } from '@/context';

type ContextProviderProps = {
  initalValue: ContextData;
  children: ReactNode;
};

const ContextProvider: FC<ContextProviderProps> = ({ initalValue, children }) => {
  const [value, setValue] = useState<ContextData>(initalValue);

  console.log('inital', initalValue);

  return <Context.Provider value={{ value, setValue }}>{children}</Context.Provider>;
};

export default ContextProvider;
