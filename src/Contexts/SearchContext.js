import { useContext,createContext, useState } from "react";

const SearchContext=createContext();

export const SearchProvider=({children})=>{

    const [friendSearch,setFriendSearch]=useState("");
    const [userSearch,setUserSearch]=useState("");

    const values={
        friendSearch,
        setFriendSearch,
        userSearch,
        setUserSearch
    }

    return <SearchContext.Provider value={values} >{children}</SearchContext.Provider>
}

export const useSearchContext=()=>useContext(SearchContext);