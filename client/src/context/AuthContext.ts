import { ICurrentUser } from "@/types";
import { createContext } from 'react';

export const currentUser = createContext<ICurrentUser | null>(null)