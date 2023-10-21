'use client'

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import toast from "react-hot-toast";

interface Data {
    career: string;
    courseId: string;
    createdAt: string;
    curr_role: string;
    email: string;
    heard: string;
    id: string;
    name: string;
    phone: string;
    profession: string;
    public_profile: string;
    questions: string;
    status: string;
    updatedAt: string;
    userId: string;
}

const RequestDetails = (
    { params }: { params: { requestId: string; } }
) => {

    const [data, setData] = useState<Data>()
    const [buttonState, setButtonState] = useState(false)

    useEffect(() => {
        async function fetchCourses() {
            const response = await axios.post("/api/getrequest", { requestId: params.requestId });
            setData(response.data[0]);
            console.log(response.data[0]);

        }
        fetchCourses();
    }, [])

    const sendEmail = async (result: boolean) => {
        setButtonState(true)
        const response = await axios.post("/api/sendmail", { result: result, requestId: params.requestId });

        if (result) {
            const message = 'Hey congratulations your applications has been approved'
            try {
                emailjs.send(
                    'service_i8bz6pg',
                    'template_6ouvfa8',
                    { to_name: data?.name, email: data?.email, message, from_name: 'Kampili' },
                    'ktuekNevkbbL7FKm8'
                )
                    .then(
                        (response) => {
                            console.log('SUCCESS!', response.status, response.text);
                        },
                        (err) => {
                            console.log('FAILED...', err);
                        },
                    );
            } catch (error) {
                console.log(error);

            }


        } else {
            const message = 'Your application has been rejected.'

            emailjs.send(
                'service_i8bz6pg',
                'template_6ouvfa8',
                { to_name: data?.name, email: data?.email, message },
                'ktuekNevkbbL7FKm8'
            )
        }

        if (response.status === 200) {
            toast.success('Updated successfully')
        } else {
            toast.error('Somting went wrong')
        }

        setButtonState(false)
    }


    return (
        <div className="flex items-center justify-center flex-col space-y-11 p-10" >
            <p>Name: {data?.name}</p>
            <p>Email: {data?.email}</p>
            <div className="w-1/2 flex items-center justify-between" >
                <Button disabled={buttonState} onClick={() => sendEmail(true)} className="bg-green-700 hover:bg-green-500" >
                    Approve
                </Button>

                <Button disabled={buttonState} onClick={() => sendEmail(false)} className="bg-red-700 hover:bg-red-500" >
                    Reject
                </Button>
            </div>

        </div>
    )
}

export default RequestDetails