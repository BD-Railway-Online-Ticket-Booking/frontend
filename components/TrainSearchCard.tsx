"use client"

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import SearchSeatCard from "./SearchSeatCard";
import SearchTrainRouteGraph from "./SearchTrainRouteGraph";

export default function TrainSearchCard({ train, date }: any) {

    const [isSeat, setIsSeat] = useState(false);
    const [isRoute, setIsRoute] = useState(false);
    const [seats, setSeats] = useState<any[]>([]);

    async function fetchAvailableSeats() {
        const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
        const response = await fetch(`${ENDPOINT}/booking/train/${train.train_id}/available/seats?date=${date}&dflag=${train.dflag}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();

        setSeats(data);
    }

    useEffect(() => {
        fetchAvailableSeats();
    }, [isSeat]);

    return (
        <>
            {
                seats.length > 0 && (
                    <div className="p-4 border-2 bg-[var(--p-bg)] shadow-lg rounded-lg mx-4 my-1 flex flex-col md:flex-row justify-center md:justify-between items-center">
                        <h1 className="text-[var(--sec-bg)] text-lg md:text-2xl font-semibold p-3 md:m-5 text-nowrap">{train.train_name}</h1>
                        <div className="flex justify-around items-center">
                            <Button className="bg-blue-500 text-xs md:text-lg p-2 md:p-4 mx-3 my-2" onClick={
                                () => {
                                    if (isSeat) setIsSeat(false);
                                    else {
                                        setIsSeat(true);
                                    }
                                }
                            }>Book Seats</Button>
                            <Button className="bg-orange-700 text-xs md:text-lg p-2 md:p-4 mx-3 my-2" onClick={()=>{
                                if(isRoute) setIsRoute(false);
                                else setIsRoute(true);
                            }}>Show Routes</Button>
                        </div>
                    </div>
                )
            }

            {
                isSeat && seats.length > 0 && (
                    <div className="flex justify-evenly items-center overflow-x-auto whitespace-nowrap mb-8">
                        {
                            seats.map((seat: any) => (
                                seat.available > 0 && (
                                    <SearchSeatCard key={seat.id} seat={seat} date={date} path={train.path} dflag={train.dflag} />
                                )
                            ))
                        }
                    </div>
                )
            }
            {
                isRoute && (
                    <div>
                        <SearchTrainRouteGraph path={train.path} />
                    </div>
                )
            }
        </>
    )
}