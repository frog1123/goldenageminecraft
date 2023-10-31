'use client';

import React, { useState, ReactNode, FC } from 'react';
import MyContext, { ContextData } from '@/context';

type ContextProviderProps = {
  children: ReactNode;
};

const ContextProvider: FC<ContextProviderProps> = ({ children }) => {
  const [data, setData] = useState<ContextData>({ user: { id: null } });

  return <MyContext.Provider value={{ data, setData }}>{children}</MyContext.Provider>;
};

export default ContextProvider;
