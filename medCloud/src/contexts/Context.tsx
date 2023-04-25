import { createContext } from "react";

type ContextType = {
    name: string;
    age: number;
}

const initialState = {
    name: 'Gustavo',
    age: 27
}

export const Context =  createContext<ContextType>(initialState);


export const ContextProvider= ({ children }: React.PropsWithChildren ) => {
    return (
        <Context.Provider value={initialState}>
            {children}
        </Context.Provider>
    );
}