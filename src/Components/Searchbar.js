import React, { useState, useEffect } from 'react';
import { Box, InputBase, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import {useSearchContext} from '../Contexts/SearchContext';

function Searchbar({bgColor,color,isFriendSearch}) {

    const {setFriendSearch,setUserSearch}=useSearchContext();
    const [search,setSearch]=useState();

    const onSubmitSearch=(e)=>{
        e.preventDefault();
        isFriendSearch ? setFriendSearch(search) : setUserSearch(search);
    }

    const onChange=(e)=>{
        setSearch(e.target.value);
    }

    useEffect(()=>{
        setUserSearch(" ");
    },[]);

    return (
        <Box sx={{width:'100%',height:'10vh',display: 'flex', alignItems: 'center',justifyContent:'center',borderBottom:'2px solid #4a6c7d',px:2}}>
            <Box
                component="form"
                onSubmit={onSubmitSearch}
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:"100%",height:'5vh',borderRadius:'1rem',backgroundColor:bgColor }}>
                <InputBase
                    sx={{ ml: 1, flex: 1,color:'white' }}
                    placeholder={isFriendSearch ? "Search a Friend..." : "Search a User..."}
                    onChange={onChange}
                />
                <IconButton sx={{ p: '10px',color:color }}>
                    <Search />
                </IconButton>
            </Box>
        </Box>
    )
}

export default React.memo(Searchbar);