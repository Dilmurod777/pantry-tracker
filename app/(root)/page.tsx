"use client";

import Image from "next/image";
import DataTable from "@/components/DataTable";
import {useState} from "react";
import {PantryItem} from "@/app/lib/models";
import Searchbar from "@/components/Searchbar";
import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#FF8225',
        },
    },
});

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

    const searchItemByName = (name: string) => {
        console.log(`searched ${name}`)
    }


    return (
        <ThemeProvider theme={theme}>
            <main className="flex flex-col items-center justify-start p-24 h-full min-h-screen w-full flex-grow select-none">
                <div className={"flex items-center justify-center text-5xl font-black text-main-active"}>
                    Your <span className={"ml-4 italic underline"}>Pantry Tracker</span>
                </div>

                <Searchbar callback={searchItemByName}/>

                <DataTable rows={pantryItems}/>
            </main>
        </ThemeProvider>
    );
}
