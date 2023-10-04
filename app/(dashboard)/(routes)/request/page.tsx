"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const formSchema = z.object({
    firstname: z.string().min(1, {
        message: "This field is required",
    }),
    lastname: z.string().min(1, {
        message: "This field is required",
    }),
    gender: z.string().min(1, {
        message: "This field is required",
    }),
    ibm: z.string().min(1, {
        message: "This field is required",
    }),
    communication_lan: z.string().min(1, {
        message: "This field is required",
    }),
    preferred_lan: z.string().min(1, {
        message: "This field is required",
    }),
    dob: z.string().min(1, {
        message: "This field is required",
    }),
    linkedin: z.string().min(1, {
        message: "This field is required",
    }),
    contact: z.string().min(1, {
        message: "This field is required",
    }),
    parent_details: z.string().min(1, {
        message: "This field is required",
    }),
    address: z.string().min(1, {
        message: "This field is required",
    }),
    city: z.string().min(1, {
        message: "This field is required",
    }),
    district: z.string().min(1, {
        message: "This field is required",
    }),
    pincode: z.number().min(1, {
        message: "This field is required",
    }),
    state: z.string().min(1, {
        message: "This field is required",
    }),
    country: z.string().min(1, {
        message: "This field is required",
    }),
    highest_education: z.string().min(1, {
        message: "This field is required",
    }),
    matric: z.string().min(1, {
        message: "This field is required",
    }),
    intermediate: z.string().min(1, {
        message: "This field is required",
    }),
    bachelor: z.string().min(1, {
        message: "This field is required",
    }),
    master: z.string().min(1, {
        message: "This field is required",
    }),
    occupation: z.string().min(1, {
        message: "This field is required",
    }),
    experience: z.string().min(1, {
        message: "This field is required",
    }),

});

const CreatePage = () => {
    const router = useRouter();
    const params = useParams();

    const [hash, setHash] = useState("#persnol-info")

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            gender: "",
            ibm: "",
            communication_lan: "",
            preferred_lan: "",
            dob: "",
            linkedin: "",
            contact: "",
            parent_details: "",
            address: "",
            city: "",
            district: "",
            pincode: 123321,
            state: "",
            country: "",
            highest_education: "",
            matric: "",
            intermediate: "",
            bachelor: "",
            master: "",
            occupation: "",
            experience: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course created");
        } catch {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        setHash(window.location.hash)
    }, [params]);


    return (
        <div className="max-w-5xl flex h-full p-6">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-8"
                >
                    {hash === "#persnol-info" &&
                        <>
                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                First name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Jhon"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Last name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Doe"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="ibm"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Name on IBM Certificate
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Gender
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Male"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Date of Birth
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="01/01/2001"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="parent_details"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Parent/Guardian Details
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Father/Mother"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="H no.2"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                City
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Alwar"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="district"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                District
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Neemrana"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="pincode"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Pincode
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="123412"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                State
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Rajasthan"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Country
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="India"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="linkedin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Linkedin Profile URL
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="url"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contact"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Contact Details (phone number,Email)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="jhondoe@xyz.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="communication_lan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Preferred Language for Communication
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="English"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="preferred_lan"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Preferred Language for Teaching (course)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="English"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button onClick={()=>router.push('#education-info')} className="my-10" >
                                Next
                            </Button>

                            <div className="h-5" />
                        </>
                    }

                    {hash === "#education-info" &&
                        <>
                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="highest_education"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Highest Education
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="M.tech"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="matric"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                10th Standard
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="10th"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="intermediate"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Intermediate
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="12th"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bachelor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Bachelor's Degree
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="B.tech"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="master"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Master's Degree
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="M.tech"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <Button onClick={()=>router.push('#occupation-details')} className="my-10" >
                                Next
                            </Button>

                        </>
                    }

                    {hash === "#occupation-details" &&
                        <>
                            <div className="flex space-x-8" >
                                <FormField
                                    control={form.control}
                                    name="occupation"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Occupation (Domain)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Web developer"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="experience"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Years of Experience
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="2 years"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={!isValid || isSubmitting}
                            >
                                Submit
                            </Button>

                        </>
                    }


                </form>
            </Form>
        </div>
    );
}

export default CreatePage;