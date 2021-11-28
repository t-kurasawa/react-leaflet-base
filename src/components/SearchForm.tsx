
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Divider from '@mui/material/Divider';
import InputBase from '@mui/material/InputBase';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks';
import { selectStockPiles, stockpileSearchAsync } from '../stores/stockpile-slice';

const SearchForm = () => {

    const dispatch = useAppDispatch();
    const [address, setAddress] = useState('東京都千代田区丸の内１丁目');

    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="東京都千代田区丸の内１丁目"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(event)=> setAddress(event.target.value)}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton 
                sx={{ p: '10px' }} aria-label="search"
            >
                <SearchIcon onClick={()=> dispatch(stockpileSearchAsync({params:address}))}  />
            </IconButton>
        </Paper>
    )
}

export default SearchForm;