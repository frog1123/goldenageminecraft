'use client';

import React, { useState, ReactNode, FC, useEffect } from 'react';
import { Context, ContextData } from '@/context';
import axios from 'axios';

type ContextProviderProps = {
  initalData: ContextData;
  children: ReactNode;
};

const ContextProvider: FC<ContextProviderProps> = ({ initalData, children }) => {
  const [data, setData] = useState<ContextData>(initalData);

  console.log('inital', initalData);

  return <Context.Provider value={{ data, setData }}>{children}</Context.Provider>;
};

export default ContextProvider;
