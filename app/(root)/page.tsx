"use client";

import Image from "next/image";
import DataTable from "@/components/DataTable";
import {useEffect, useRef, useState} from "react";
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
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filteredName, setFilteredName] = useState("");

    const editingId = useRef<string>("");

    const dialogSubmitHandler = async (data: PantryItem) => {
        setIsLoading(true);

        if(editingId.current){
            await firestoreActions.EditRecord(data);
        }else{
            await firestoreActions.AddRecord(data);
        }

        const newItems = await firestoreActions.GetAllRecords();
        setPantryItems(newItems);

        editingId.current = "";
        setIsLoading(false);
    }

    const editPantryItemHandler = (id: string) => {
        editingId.current = id;
        setIsDialogOpen(true);
    }

    const deletePantryItemHandler = async (id: string) => {
        setIsLoading(true);
        await firestoreActions.DeleteRecord(id);
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

    const filteredRows = filteredName.length > 0
        ? pantryItems.filter(item => item.name.toLowerCase().startsWith(filteredName.toLowerCase()))
        : pantryItems;

    const editingItems = pantryItems.filter(item => item.id == editingId.current);
    const editingItem = editingId.current == ""
        ? null
        : editingItems.length > 0
            ? editingItems[0]
            : null

    return (
        <ThemeProvider theme={theme}>
            <main
                className="relative flex flex-col items-center justify-start p-24 h-full min-h-screen w-full flex-grow select-none">
                <div className={"flex items-center justify-center text-5xl font-black text-main-active"}>
                    Your <span className={"ml-4 italic underline"}>Pantry Tracker</span>
                </div>

                <Searchbar searchCallback={value => setFilteredName(value)} resetCallback={() => setFilteredName("")}/>

                <DataTable
                    rows={filteredRows}
                    deleteCallback={(id) => deletePantryItemHandler(id)}
                    editCallback={(id) => editPantryItemHandler(id)}
                />

                <div className={"flex items-center justify-end py-4 w-full "}>
                    <Button variant="contained" onClick={() => setIsDialogOpen(true)}>Add</Button>
                </div>

                <AddPantryItemDialog
                    isOpen={isDialogOpen}
                    handleClose={() => setIsDialogOpen(false)}
                    onSubmit={dialogSubmitHandler}
                    item={editingItem}
                />

                <Backdrop
                    sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                    open={isLoading}
                    onClick={() => setIsLoading(false)}
                >
                    <CircularProgress color="inherit"/>
                </Backdrop>
            </main>
        </ThemeProvider>
    );
}
