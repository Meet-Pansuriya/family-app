import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { Family } from "../types";

interface AppContextType {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  families: Family[];
  setFamilies: React.Dispatch<React.SetStateAction<Family[]>>;
  villages: (string | undefined)[];
  talukos: (string | undefined)[];
  districts: (string | undefined)[];
  relations: (string | undefined)[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [families, setFamilies] = useState<Family[]>([]);

  const villages = useMemo(() => {
    return families
      ? [...new Set(families.map((f) => f.village).filter(Boolean))]
      : [];
  }, [families]);

  const talukos = useMemo(() => {
    return families
      ? [...new Set(families.map((f) => f.taluko).filter(Boolean))]
      : [];
  }, [families]);

  const districts = useMemo(() => {
    return families
      ? [...new Set(families.map((f) => f.district).filter(Boolean))]
      : [];
  }, [families]);

  const relations = useMemo(() => {
    return families
      ? [...new Set(families.map((f) => f.district).filter(Boolean))]
      : [];
  }, [families]);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setLoading,
        families,
        setFamilies,
        villages,
        talukos,
        districts,
        relations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
