"use client"

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect, useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"


const formSchema = z.object({
  heard: z.string().min(1, {
    message: "This field is required",
  }),
  other_value: z.string().min(1, {
    message: "This field is required",
  }).optional(),
  curr_role: z.string().min(1, {
    message: "This field is required",
  }),
  career: z.string().min(1, {
    message: "This field is required",
  }),
  public_profile: z.string().min(1, {
    message: "This field is required",
  }),
  profession: z
    .string()
    .min(10, {
      message: "profession must be at least 10 characters.",
    })
    .max(160, {
      message: "profession must not be longer than 30 characters.",
    }),
  questions: z
    .string()
    .min(10, {
      message: "questions must be at least 10 characters.",
    })
    .max(160, {
      message: "questions must not be longer than 30 characters.",
    })
    .optional(),
  batchId: z.string(),
  email: z.string().email().min(5, {
    message: "questions must be at least 5 characters.",
  })
});

const Apply = (
  { params }: { params: { batchId: string; } }
) => {

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      heard: "",
      other_value: "",
      curr_role: "",
      career: "",
      public_profile: "",
      profession: "",
      questions: "",
      email: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.heard === "other" && values.other_value !== undefined) {
      values.heard = values.other_value;
    }
    delete values.other_value;
    values.batchId = params.batchId

    try {
      await axios.post("/api/apply", values);
      toast.success("Your Application is under review");
      router.replace('/')
    } catch {
      toast.error("Something went wrong");
    }
  }


  return (
    <div className="max-w-5xl flex h-full p-6">
      <Form {...form}>
        <form
          className="space-y-8 mt-8"
        >

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Enter your email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="jhondoe@example.com"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex space-x-8" >
            <FormField
              control={form.control}
              name="heard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Where did you hear about this course
                  </FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="linkedin">linkedin</SelectItem>
                      <SelectItem value="twitter">twitter</SelectItem>
                      <SelectItem value="instagram">instagram</SelectItem>
                      <SelectItem value="google">google</SelectItem>
                      <SelectItem value="friend">from a friend</SelectItem>
                      <SelectItem value="other">other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            {form.getValues('heard') === 'other' &&
              <FormField
                control={form.control}
                name="other_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Other
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Other..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            }

          </div>

          <FormField
            control={form.control}
            name="curr_role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What’s your current role? (Example : business analyst @ freshworks) <br />
                  if you are a student, mention your college and year of study.*
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="current role"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="career"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  What stage are you at in your career?
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Stage of career" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="I’m a student or looking for my first job">I’m a student or looking for my first job</SelectItem>
                    <SelectItem value="Early stage (1-3 years of work experience)">Early stage (1-3 years of work experience)</SelectItem>
                    <SelectItem value="Mid senior (3-5 years of work experience)">Mid senior (3-5 years of work experience)</SelectItem>
                    <SelectItem value="5+ years of work experience">5+ years of work experience</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="public_profile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  your public profile (linkedin/twitter)
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
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tell us about your professional journey so far.<br />
                  we would love to learn more about you
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="questions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Do you have any questions about this program?
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">SUBMIT</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure to submit application?</AlertDialogTitle>
                <AlertDialogDescription>
                  would you like to proceed and submit
                  your application for the course ?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>no, cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onSubmit(form.getValues())} >submit now</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <div className="h-5" />

        </form>
      </Form>

    </div>
  );
}

export default Apply;
