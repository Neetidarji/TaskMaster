"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { DottedSeperator } from "@/components/dotted-seperator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Link from "next/link"; 
import { registerSchema } from "../schemas";
import { useRegister } from "../api/use-register";


export const SignUpCard = () => {
    const { mutate, isPending} = useRegister();
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof registerSchema>) => {
        const response = await mutate({ json: values }); // Trigger the mutation with form values
    };

    return (
        <Card className="w-full h-full md:w-[600px] border-none shadow-none"> 
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">Sign Up</CardTitle>
                <CardDescription>
                    By signing up, you agree to our{" "}
                    <Link href="/privacy">
                        <span className="text-blue-700 underline">Privacy policy</span>
                    </Link>{" "} and{" "}
                    <Link href="/terms">
                        <span className="text-blue-700 underline">Terms of Service</span>
                    </Link>
                </CardDescription>
            </CardHeader>  
            <div className="px-7 mb-2">
                <DottedSeperator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter your Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                            Register
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
                Already have an account?
                <Link href="/sign-in">
                  <span className="text-blue-700">&nbsp;Sign In</span>  
                </Link>
            </CardContent>
        </Card>
    );
};
