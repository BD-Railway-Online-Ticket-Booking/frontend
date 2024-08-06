"use client"
import dynamic from 'next/dynamic';
import loader from "@/lottie/train_loader.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loading() {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <Lottie animationData={loader} className="w-[50%] h-[80%]" />
        </div>
    );
}