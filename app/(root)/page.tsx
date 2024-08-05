"use client";

import Image from "next/image";
import DataTable from "@/components/DataTable";
import {useEffect, useState} from "react";
import {PantryItem} from "@/app/lib/models";
import Searchbar from "@/components/Searchbar";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import Button from "@mui/material/Button";
import AddPantryItemDialog from "@/components/AddPantryItemDialog";
import * as firestoreActions from "@/app/lib/firebase/firestore";
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const theme = createTheme({
    palette: {
        primary: {
            main: '#379777',
        },
        secondary: {
            main: "#F4CE14"
        }
    },
});

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

    const searchItemByName = (name: string) => {
        console.log(`searched ${name}`)
    }

    const addPantryItemHandler = async (data: PantryItem) => {
        setIsLoading(true);
        await firestoreActions.AddRecord(data);
        const newItems = await firestoreActions.GetAllRecords();
        setPantryItems(newItems);
        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);

        firestoreActions.GetAllRecords().then(data => {
            setPantryItems(data);
            setIsLoading(false)
        })
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <main
                className="relative flex flex-col items-center justify-start p-24 h-full min-h-screen w-full flex-grow select-none">
                <div className={"flex items-center justify-center text-5xl font-black text-main-active"}>
                    Your <span className={"ml-4 italic underline"}>Pantry Tracker</span>
                </div>

                <Searchbar callback={searchItemByName}/>

                <DataTable rows={pantryItems}/>

                <div className={"flex items-center justify-end py-4 w-full "}>
                    <Button variant="contained" onClick={() => setIsAddDialogOpen(true)}>Add</Button>
                </div>

                <AddPantryItemDialog
                    isOpen={isAddDialogOpen}
                    handleClose={() => setIsAddDialogOpen(false)}
                    onSubmit={addPantryItemHandler}
                />

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={isLoading}
                    onClick={() => setIsLoading(false)}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </main>
        </ThemeProvider>
    );
}
