import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { submitToSupabase, FormData as SupabaseFormData } from "@/lib/supabase";
import { submitToGoogleSheets } from "@/lib/google-sheets";
import { Loader2 } from "lucide-react";

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  title: z.string().min(2, { message: "Title must be at least 2 characters" }),
  disposition: z.enum(["Supporter", "Neutral", "Detractor"], {
    message: "Please select a disposition"
  }),
  relationship: z.string({
    required_error: "Please select a relationship"
  }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string()
    .min(10, { message: "Phone number must be at least 10 digits" })
});

type FormValues = z.infer<typeof formSchema>;

const FormPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  // Initialize form with react-hook-form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      title: "",
      disposition: "Supporter",  // Set a default value to avoid undefined
      relationship: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Add timestamp to the data
      const submissionData: SupabaseFormData = {
        ...data,
        timestamp: new Date().toISOString(),
      };
      
      // 1. Submit to Supabase
      await submitToSupabase(submissionData);
      
      // 2. Submit to Google Sheets
      await submitToGoogleSheets(submissionData);
      
      // Show success message
      toast({
        title: "Form submitted successfully!",
        description: "Your information has been recorded.",
      });
      
      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was a problem submitting your form. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <Card className="w-full shadow-md bg-[#f8f9fa]">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold text-center">Contact Form</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex">
                      Name <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Short-answer text" {...field} className="border-b border-gray-300 bg-transparent focus-visible:ring-0 rounded-none px-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex">
                      Title <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Short-answer text" {...field} className="border-b border-gray-300 bg-transparent focus-visible:ring-0 rounded-none px-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Disposition Field */}
              <FormField
                control={form.control}
                name="disposition"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex">
                      Disposition <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup 
                        onValueChange={field.onChange} 
                        value={field.value}
                        className="flex flex-col space-y-3"
                      >
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Supporter" />
                          </FormControl>
                          <FormLabel className="font-normal">Supporter</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Neutral" />
                          </FormControl>
                          <FormLabel className="font-normal">Neutral</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="Detractor" />
                          </FormControl>
                          <FormLabel className="font-normal">Detractor</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Relationship Field */}
              <FormField
                control={form.control}
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex">
                      Highest Broadcom/Westcon Relationship <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Scott Dawes">1. Scott Dawes</SelectItem>
                        <SelectItem value="Manish M">2. Manish M</SelectItem>
                        <SelectItem value="Manoj S">3. Manoj S</SelectItem>
                        <SelectItem value="Thulasi R">4. Thulasi R</SelectItem>
                        <SelectItem value="Ankush S">5. Ankush S</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex">
                      Email <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Short-answer text" {...field} className="border-b border-gray-300 bg-transparent focus-visible:ring-0 rounded-none px-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Phone Number Field */}
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex">
                      Phone number <span className="text-red-500 ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Short-answer text" {...field} className="border-b border-gray-300 bg-transparent focus-visible:ring-0 rounded-none px-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground pt-0">
          <p>
            Your information will be synced to both Supabase and Google Sheets
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FormPage;
