'use client'
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";

interface Option {
    id: string;
    text: string;
}

interface QuizQuestionFormProps {
    initialData: {
        title: string;
    };
    courseId: string;
    moduleId: string;
    chapterId: string;
    quizId: string;
};

export const QuizQuestionForm = ({
    initialData,
    courseId,
    moduleId,
    chapterId,
    quizId
}: QuizQuestionFormProps) => {
    const [question, setQuestion] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [options, setOptions] = useState<Option[]>([
        { id: 'option1', text: '' },
        { id: 'option2', text: '' },
        { id: 'option3', text: '' },
        { id: 'option4', text: '' },
    ]);

    const router = useRouter();

    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.target.value);
    };

    const handleOptionClick = (optionId: string) => {
        setSelectedOption(optionId);
    };

    const handleAddQuestion = async () => {
        const data = {
            question,
            options: { data: options },
            answer: selectedOption,
            quizId
        }
        try {
            await axios.post(`/api/courses/${courseId}/${moduleId}/chapters/${chapterId}/quizzes/${quizId}`, data);
            toast.success("Quiz updated");
            router.refresh();
        } catch {
            toast.error("Something went wrong");
        }
    };

    return (
        <Card className="bg-slate-100 rounded-md mt-6 p-4">
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="question">Question</Label>
                            <Input
                                id="question"
                                placeholder="Enter the question"
                                value={question}
                                onChange={handleQuestionChange}
                            />

                            <div className="space-y-1.5">
                                <Label htmlFor="options">Options</Label>
                                {options.map((option) => (
                                    <div key={option.id} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={option.id}
                                            checked={selectedOption === option.id}
                                            onClick={() => handleOptionClick(option.id)}
                                        />
                                        <Input
                                            id={option.id}
                                            placeholder={`Enter option for ${option.id}`}
                                            value={option.text}
                                            onChange={(e) => {
                                                const updatedOptions = options.map((opt) =>
                                                    opt.id === option.id ? { ...opt, text: e.target.value } : opt
                                                );
                                                setOptions(updatedOptions);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleAddQuestion}>Add</Button>
            </CardFooter>
        </Card>
    );
}
