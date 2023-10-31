'use client';

import React, { useState, ReactNode, FC } from 'react';
import { Context, ContextData } from '@/context';

type ContextProviderProps = {
  children: ReactNode;
};

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<ContextData>({ user: { id: null } });

  return <Context.Provider value={{ data, setData }}>{children}</Context.Provider>;
};

export default ContextProvider;
