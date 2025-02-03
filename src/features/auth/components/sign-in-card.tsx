"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeperator } from "@/components/dotted-seperator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { useForm } from "react-hook-form";
import Link from "next/link"; 
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { loginSchema } from "../schemas";
import { useLogin } from "../api/use-login";

// const formSchema = z.object({
//     email: z.string().email("Invalid email address"), // Custom error message
//     password: z.string().min(1, "Password must be at least 8 characters long"), // Custom error message
// });

export const SignInCard = () => {

    const {mutate, isPending} = useLogin();
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
        mutate({json: values});
    };

    return (
        <Card className="w-full h-full md:w-[600px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Welcome Back!</CardTitle>
            </CardHeader>  
            <div className="px-7 mb-2">
                <DottedSeperator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Enter email address"
                                            {...field} 
                                            className={form.formState.errors.email ? 'border-red-500' : ''} // Add red border on error
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Enter your Password"
                                            {...field} 
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending} size="lg" className="w-full">
                            Login
                        </Button>
                    </form>
                </Form>  
            </CardContent>
            <div className="px-7">
                <DottedSeperator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button disabled={isPending} variant="secondary" size="lg" className="w-full">
                    <FcGoogle className="mr-2 size-5"/>
                    Login with Google
                </Button>
                <Button disabled={isPending} variant="secondary" size="lg" className="w-full">
                    <FaGithub className="mr-2 size-5"/>  
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7">
                <DottedSeperator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                Don't have an account ?
                <Link href="/sign-up">
                  <span className="text-blue-700">&nbsp;Sign Up</span>  
                </Link>
            </CardContent>
        </Card>
    );
};
