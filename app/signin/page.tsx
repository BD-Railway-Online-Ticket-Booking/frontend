import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import SignIn from "@/components/SignIn";

export default function Page()
{
    return (
        <div className="sticky min-h-screen flex flex-col">
            <NavBar signin={false}/>
            <SignIn />
        </div>
    )
}