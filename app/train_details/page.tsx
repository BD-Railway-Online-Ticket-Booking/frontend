import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import TrainDetails from "@/components/TrainDetails";
import { Train } from "lucide-react";

export default function page() {

    return(
        <div className="sticky min-h-screen flex flex-col">
             <NavBar signin={false} div={"trainDetails"}/>
             <TrainDetails/>
             <Footer/>
        </div>
    )
    
};
