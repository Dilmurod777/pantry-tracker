import React, {useRef, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Props {
    searchCallback: (n: string) => void,
    resetCallback: () => void
}

const Searchbar = ({searchCallback, resetCallback}: Props) => {
    const [searchValue, setSearchValue] = useState("")

    return (
        <div className={"w-full py-4 flex items-center justify-center gap-4"}>
            <TextField
                id="outlined-basic"
                label="Search by Name"
                variant="outlined"
                className={"h-full w-full"}
                size={"small"}
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />

            <Button
                color={"primary"}
                variant="contained"
                onClick={() => searchCallback(searchValue)}
                disabled={searchValue == ""}
                disableElevation
            >Search</Button>
            <Button
                color={"secondary"}
                variant="contained"
                onClick={() => {
                    setSearchValue("");
                    resetCallback();
                }}
                disableElevation
            >Reset</Button>
        </div>
    );
};

export default Searchbar;