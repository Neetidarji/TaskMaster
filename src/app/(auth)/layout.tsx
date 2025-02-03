"use client";
import { Main } from "next/document";
import Image from "next/image";
import { Children } from "react";
import {Button} from "@/components/ui/button"
import { usePathname } from "next/navigation";
import Link from "next/link";

interface AuthlayoutProps{
    children: React.ReactNode;
};

const Authlayout = ({children}: AuthlayoutProps) =>{
    const pathname = usePathname()
    const isSignIn = pathname === "/sign-in";

    return(
        <main className="bg-neutral-100 min-h-screen">
            <div className="mx-auto max-w-screen-2xl p-4">
                <nav className="flex justify-between items-center">
                    <Image src="/logo.svg" height={250} width={250} alt="Logo" /> 
                    <Button asChild variant="secondary">
                        <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                            {isSignIn ? "Sign-Up" : "Login"}
                        </Link>
                    </Button>
                </nav>
                <div className="flex flex-col items-center justify-center pt-4 md:pt-14 ">
                     {children}
                </div>  
            </div>
        </main>
    )
}
export default Authlayout;