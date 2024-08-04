"use client";

import Image from "next/image";
import DataTable from "@/components/DataTable";
import {useState} from "react";
import {PantryItem} from "@/app/lib/models";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [pantryItems, setPantryItems] = useState<PantryItem[]>([]);

    return (
        <main className="flex flex-col items-center justify-start p-24 h-full min-h-screen w-full flex-grow">
            <div className={"flex items-center justify-center text-5xl font-black text-main-active"}>
                Your <span className={"ml-4 italic underline"}>Pantry Tracker</span>
            </div>

            <DataTable rows={pantryItems}/>
        </main>
    );
}
