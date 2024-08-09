export default function SeatCard({seat}:any) {
    return(
        <div className="bg-[var(--p-bg)] p-3 border-2 shadow-lg flex flex-col justify-center items-center rounded-lg m-3">
            <h1 className="text-slate-500 text-xl font-semibold tracking-wider p-2 my-2">{seat.type}</h1>
            <h1 className="text-slate-800 text-lg font-semibold tracking-wider p-1 my-1">Price: {seat.price} Tk</h1>
            <h1 className="text-slate-800 text-lg font-semibold tracking-wider p-1 my-1">Capacity: {seat.capacity}</h1>
        </div>
    )
};
