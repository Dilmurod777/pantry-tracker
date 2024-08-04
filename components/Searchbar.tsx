import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Props {
    callback: (n: string) => void
}

const Searchbar = ({callback}: Props) => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <div className={"w-full py-4 flex items-center justify-center gap-4"}>
            <TextField
                id="outlined-basic"
                label="Search by Name"
                variant="outlined"
                className={"h-full w-full"}
                size={"small"}
            />

            <Button
                color={"primary"}
                variant="contained"
                onClick={() => callback(searchValue)}
                disabled={searchValue == ""}
                disableElevation
            >Search</Button>
        </div>
    );
};

export default Searchbar;