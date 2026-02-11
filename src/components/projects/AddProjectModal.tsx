import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import countries from "world-countries";
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import * as z from "zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Code, CreditCard, Database, Eye, EyeOff, FolderOpenDot, Loader2, Plus, Server, Trash2, Upload, User, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { indianGateways, globalGateways } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useAddProject } from "@/services/project/mutations";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";







// Worker schema definition using Zod
const workerSchema = z.object({
    worker_name: z.string().nonempty("Worker name is required"),
    work_role: z.string().nonempty("Work role is required"),
    work_status: z.string().nonempty("Work status is required"),
    work_started_date: z.date().refine((val) => !!val, { message: "Start date is required" }),
    worker_end_date: z.date().nullable(),
    assigned_end_date: z.date().refine((val) => !!val, { message: "Assigned end date is required" }),
});






// Project schema definition using Zod
const projectSchema = z.object({


    // Client Information
    client_name: z.string().nonempty("Client name is required"),
    country: z.string().nonempty("Country is required"),
    phone_number: z.string().min(1, "Phone number is required").transform((val) => val.replace(/[^\d+]/g, "")).refine((val) => /^\+[1-9]\d{6,14}$/.test(val), "Enter a valid phone number with country code"),
    email: z.string().email("Enter a valid email address"),
    company_sector: z.string().nonempty("Company sector is required"),
    about: z.string().min(1, "About client is required"),
    client_logo: z.any()
        .refine(
            (file) =>
                file === null ||
                typeof file === "string" ||
                (file instanceof File &&
                    ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(file.type) &&
                    file.size <= 1.5 * 1024 * 1024),
            {
                message: "Logo must be JPEG, PNG, JPG, or WEBP and under 1.5MB",
            }
        ).optional(),
    client_approach_date: z.date().refine((val) => !!val, { message: "Client approach date is required", }),
    proposed_project_value: z.number().min(1, "Project value is required"),
    status_of_payment: z.enum(["Paid", "Unpaid", "Pending"]),
    pending_amount: z.number().min(1, "Pending amount is required"),
    payment_received_date: z.date(),
    payment_received_amount: z.number().min(1, "Payment amount is required"),



    // Project Details
    project_name: z.string().nonempty("Project name is required"),
    project_type: z.enum(["Web Development", "Mobile Application", "Custom Software", "Web & App"]),
    work_type: z.string().nonempty("Work type is required"),
    scope_of_work: z.string().nonempty("Scope of work is required"),
    work_assigned_date: z.date().refine((val) => !!val, { message: "Work assigned date is required", }),
    work_assigned_delivery_date: z.date().refine((val) => !!val, { message: "Assigned delivery date is required", }),
    work_completed_date: z.date().nullable(),
    project_status: z.enum(["Delivered", "Completed", "In Development", "On Hold", "Cancelled"]),



    // Domain and Server Information    
    domain_status: z.enum(["Active", "Expired", "Pending"]),
    domain_name: z.string().nonempty("Domain name is required"),
    domain_provider: z.string().nonempty("Domain provider is required"),
    domain_owned_by: z.enum(["Own", "Client"]),
    domain_purchased_date: z.date().refine((val) => !!val, { message: "Domain purchase date is required", }),
    domain_expiry_date: z.date().refine((val) => !!val, { message: "Domain expiry date is required", }),
    domain_cost: z.number().min(1, "Domain cost is required").optional(),
    domain_cost_status: z.enum(["Paid", "Unpaid", "Pending"]),


    server_status: z.enum(["Active", "Expired", "Pending"]),
    server_type: z.string().nonempty("Server type is required"),
    server_name: z.string().nonempty("Server name is required"),
    server_owned_by: z.enum(["Own", "Client"]),
    server_accrued_date: z.date().refine((val) => !!val, { message: "Client approach date is required", }),
    server_expiry_date: z.date().refine((val) => !!val, { message: "Client approach date is required", }),
    server_cost: z.number().min(1, "Server cost is required").optional(),
    server_cost_status: z.enum(["Paid", "Unpaid", "Pending"]),


    // Workers Information
    workers: z.array(workerSchema).min(1, "At least one worker is required"),


    // Payment gateway Information
    gateway_used: z.enum(["Yes", "No"]),
    payment_gateway: z.string().optional(),
    payment_gateway_url: z.string().optional(),
    payment_gateway_username: z.string().optional(),
    payment_gateway_password: z.string().optional(),

});






// Type definition for the form data based on the Zod schema
type ProjectFormData = z.infer<typeof projectSchema>;





// Props for the AddProjectModal component
interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}






export function AddProjectModal({ isOpen, onClose }: AddProjectModalProps) {



    // State to manage the current step in the multi-step form
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false)
    const totalSteps = 5;



    // Auth Context
    const { getToken, userType } = useAuth();



    // Add project mutation
    const { isPending, mutate: AddProjectMutation } = useAddProject();




    // Initialize form with react-hook-form and Zod schema
    const form = useForm<ProjectFormData>({
        resolver: zodResolver(projectSchema),
        mode: "onChange",
        defaultValues: {

            client_name: "",
            country: "",
            phone_number: "",
            email: "",
            company_sector: "",
            about: "",
            client_logo: "",
            client_approach_date: new Date(),
            proposed_project_value: 0,
            payment_received_amount: 0,
            payment_received_date: new Date(),
            pending_amount: 0,
            status_of_payment: "Pending",


            project_name: "",
            project_type: "Web Development",
            work_type: "",
            scope_of_work: "",
            work_assigned_date: new Date(),
            work_assigned_delivery_date: new Date(),
            work_completed_date: null,
            project_status: "In Development",

            domain_name: "",
            domain_provider: "",
            domain_owned_by: "Own",
            domain_purchased_date: new Date(),
            domain_expiry_date: new Date(),
            domain_status: "Active",
            domain_cost: 0,
            domain_cost_status: "Unpaid",

            server_status: "Active",
            server_type: "",
            server_name: "",
            server_owned_by: "Own",
            server_accrued_date: new Date(),
            server_expiry_date: new Date(),
            server_cost: 0,
            server_cost_status: "Unpaid",

            gateway_used: "No",
            payment_gateway: "",
            payment_gateway_url: "",
            payment_gateway_username: "",
            payment_gateway_password: "",

            workers: [
                {
                    worker_name: "",
                    work_role: "",
                    work_status: "",
                    work_started_date: new Date(),
                    worker_end_date: null,
                    assigned_end_date: new Date(),
                }
            ]
        }

    });




    // Use react-hook-form's useFieldArray to manage the workers field
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "workers",
    })




    // Function to format a date as "YYYY-MM-DD"
    function formatDateOnly(date: Date): string {
        return date.toISOString().split("T")[0];
    }




    // Handle form submission
    const formsubmit = (data: ProjectFormData) => {


        // Create a FormData object
        const formdata = new FormData();

        formdata.append('client_name', data.client_name);
        formdata.append('country', data.country);
        formdata.append('phone_number', data.phone_number);
        formdata.append('email', data.email);
        formdata.append('company_sector', data.company_sector);
        formdata.append('about', data.about);
        formdata.append('client_logo', data.client_logo);
        formdata.append('client_approach_date', formatDateOnly(data.client_approach_date));

        formdata.append('project_name', data.project_name);
        formdata.append('project_type', data.project_type);
        formdata.append('work_type', data.work_type);
        formdata.append('scope_of_work', data.scope_of_work);
        formdata.append('work_assigned_date', formatDateOnly(data.work_assigned_date));
        formdata.append('work_assigned_delivery_date', formatDateOnly(data.work_assigned_delivery_date));
        formdata.append('work_completed_date', data.work_completed_date ? formatDateOnly(data.work_completed_date) : "");
        formdata.append('project_status', data.project_status);

        formdata.append('domain_name', data.domain_name);
        formdata.append('domain_provider', data.domain_provider);
        formdata.append('domain_owned_by', data.domain_owned_by);
        formdata.append('domain_purchased_date', formatDateOnly(data.domain_purchased_date));
        formdata.append('domain_expiry_date', formatDateOnly(data.domain_expiry_date));
        formdata.append('domain_status', data.domain_status);

        formdata.append('server_status', data.server_status);
        formdata.append('server_type', data.server_type);
        formdata.append('server_name', data.server_name);
        formdata.append('server_owned_by', data.server_owned_by);
        formdata.append('server_accrued_date', formatDateOnly(data.server_accrued_date));
        formdata.append('server_expiry_date', formatDateOnly(data.server_expiry_date));

        formdata.append('gateway_used', data.gateway_used);
        formdata.append('payment_gateway', data.payment_gateway ?? "");
        formdata.append('payment_gateway_url', data.payment_gateway_url ?? "");
        formdata.append('payment_gateway_username', data.payment_gateway_username ?? "");
        formdata.append('payment_gateway_password', data.payment_gateway_password ?? "");

        formdata.append('workers', JSON.stringify(data.workers));


        AddProjectMutation({ data: formdata, token: getToken() }, {

            onSuccess: () => {
                form.reset();
                setCurrentStep(1);
                onClose();
            }

        });

    };




    // Navigation functions for steps
    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };




    // Navigation functions for steps
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };





    // DatePicker component for selecting dates
    const DatePicker = ({ field, label, disabled }: { field: any; label: string, disabled?: boolean }) => (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                    >
                        {field.value ? format(field.value, "PPP") : `Select ${label.toLowerCase()}`}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => disabled && date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );





    // Step indicator
    const StepIndicator = () => (
        <div className="flex items-center justify-center mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
                <div key={i} className="flex items-center">
                    <div
                        className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                            currentStep > i + 1
                                ? "bg-[#6495f7] text-black"
                                : currentStep === i + 1
                                    ? "bg-[#6495f7] ring-4 ring-[#6495f733] text-black"
                                    : "bg-[#1f2533] dark:ext-muted-foreground text-white"
                        )}
                    >
                        {i + 1}
                    </div>
                    {i < totalSteps - 1 && (
                        <div
                            className={cn(
                                "w-12 h-0.5 mx-2 transition-all",
                                currentStep > i + 1 ? "bg-[#6495f7]" : "bg-[#1f2533]"
                            )}
                        />
                    )}
                </div>
            ))}
        </div>
    );



    // Check if user is superadmin
    if (isOpen && userType !== "superadmin") {

        onClose();
        return toast.error("Oops..!", { description: `You are not authorized to access this page.`, duration: 5000 });

    }



    return (



        <Dialog open={isOpen} onOpenChange={onClose}>


            <DialogContent className="overflow-y-auto !max-w-6xl !h-[95vh] w-full dark:bg-[#0d121c] ">


                <DialogHeader>

                    <DialogTitle className="text-2xl flex items-center font-bold dark:text-[#6495f7]">
                        Add New Project
                    </DialogTitle>

                    <DialogDescription className="dark:!text-[#94a0b8]">
                        Create a comprehensive project record with all necessary details
                    </DialogDescription>

                </DialogHeader>



                <StepIndicator />




                <Form {...form}>


                    <form onSubmit={form.handleSubmit(formsubmit)} className="space-y-6">



                        {/* Step 1: Client Information */}
                        {currentStep === 1 && (


                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >


                                {/* Client Information */}
                                <Card className="card-elevated dark:bg-[#0e141d] border-1">


                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <div className="w-2 h-2 rounded-full bg-[#6495f7] dark:drop-shadow-[0_0_6px_#3B82F6] animate-pulse"></div>
                                            Client Information <User className="mt-1" />
                                        </CardTitle>
                                    </CardHeader>



                                    {/* Logo */}
                                    <FormField
                                        control={form.control}
                                        name="client_logo"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col items-center justify-center md:col-span-2">
                                                <FormLabel className="text-lg font-medium">Client Logo (Optional)</FormLabel>
                                                <FormControl>
                                                    <div className="relative flex flex-col items-center">


                                                        {/* Hidden File Input */}
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => {
                                                                if (e.target.files && e.target.files[0]) {
                                                                    field.onChange(e.target.files[0])
                                                                }
                                                            }}
                                                            className="hidden"
                                                            id="logo-upload"
                                                        />

                                                        {/* Logo Preview */}
                                                        {field.value ? (
                                                            <div className="relative group">
                                                                <img
                                                                    src={
                                                                        typeof field.value === "string"
                                                                            ? field.value
                                                                            : URL.createObjectURL(field.value)
                                                                    }
                                                                    alt="Client Logo"
                                                                    className="w-28 h-28 rounded-full object-cover border border-gray-300 dark:border-gray-700 shadow-md"
                                                                />
                                                                {/* Delete Button */}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => field.onChange(null)}
                                                                    className="absolute top-1 right-1 hover:cursor-pointer bg-black/70 hover:bg-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                                                                >
                                                                    <X size={16} />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            /* Placeholder */
                                                            <div
                                                                onClick={() => document.getElementById("logo-upload")?.click()}
                                                                className="w-28 h-28 rounded-full flex flex-col items-center justify-center bg-gray-100 dark:bg-[#181c24] border-2 border-dashed border-blue-400 text-gray-500 hover:bg-gray-200 dark:hover:bg-[#20242c] cursor-pointer transition shadow-inner"
                                                            >
                                                                <Upload size={22} className="mb-1" />
                                                                <span className="text-xs">Upload Logo</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />




                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                        {/* Name */}
                                        <FormField
                                            control={form.control}
                                            name="client_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Client Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter client name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Country */}
                                        <FormField
                                            control={form.control}
                                            name="country"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Country</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select a country" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="max-h-70 overflow-y-auto dark:bg-[#181c24]">
                                                            {countries
                                                                .sort((a, b) =>
                                                                    a.name.common.localeCompare(b.name.common)
                                                                )
                                                                .map((country) => (
                                                                    <SelectItem key={country.cca2} value={country.name.common} className="hover:dark:bg-[#20242c]">
                                                                        {country.name.common}
                                                                    </SelectItem>
                                                                ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />




                                        {/* Phone Number */}
                                        <FormField
                                            control={form.control}
                                            name="phone_number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <PhoneInput
                                                            country={"in"}
                                                            value={field.value}
                                                            onChange={(value) => field.onChange("+" + value)}
                                                            inputClass="!w-full !py-2 !pl-12 !pr-2 !rounded-md !border !border-gray-300 dark:!border-gray-700 dark:!bg-[#181c24] dark:!text-white bg-white text-black"
                                                            buttonClass="!border !border-gray-300 dark:!border-gray-700 dark:!bg-[#181c24] dark:!text-white bg-white text-black"
                                                            dropdownClass="!rounded-md !shadow-lg !mt-1 !bg-white dark:!bg-[#181c24] dark:!text-white !text-black custom-phone-dropdown"
                                                            containerClass="!w-full"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />




                                        {/* Email */}
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter email address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Company Sector */}
                                        <FormField
                                            control={form.control}
                                            name="company_sector"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Comapny Sector</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select company sector" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="dark:bg-[#181c24]">
                                                            <SelectItem value="Goverment" className="hover:dark:bg-[#20242c]">Goverment</SelectItem>
                                                            <SelectItem value="Private" className="hover:dark:bg-[#20242c]">Private</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Client Approach Date */}
                                        <FormField
                                            control={form.control}
                                            name="client_approach_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Client Approach Date</FormLabel>
                                                    <DatePicker field={field} label="Client Approach Date" disabled={true} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Proposed Project Value */}
                                        <FormField
                                            control={form.control}
                                            name="proposed_project_value"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Proposed Project Value</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter proposed project value"
                                                            value={field.value ? field.value.toLocaleString("en-IN") : ""}
                                                            onChange={(e) => {
                                                                const rawValue = e.target.value.replace(/,/g, ""); // remove commas
                                                                if (!/^\d*$/.test(rawValue)) return; // allow only numbers
                                                                field.onChange(rawValue ? Number(rawValue) : undefined); // ✅ undefined if empty
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Pending Payment */}
                                        <FormField
                                            control={form.control}
                                            name="pending_amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Pending Payment</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter pending payment amount"
                                                            value={field.value ? field.value.toLocaleString("en-IN") : ""}
                                                            onChange={(e) => {
                                                                const rawValue = e.target.value.replace(/,/g, ""); // remove commas
                                                                if (!/^\d*$/.test(rawValue)) return; // allow only numbers
                                                                field.onChange(rawValue ? Number(rawValue) : undefined); // ✅ undefined if empty
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                        {/* Recived Payment */}
                                        <FormField
                                            control={form.control}
                                            name="payment_received_amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Recived Payment</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter recived payment amount"
                                                            value={field.value ? field.value.toLocaleString("en-IN") : ""}
                                                            onChange={(e) => {
                                                                const rawValue = e.target.value.replace(/,/g, ""); // remove commas
                                                                if (!/^\d*$/.test(rawValue)) return; // allow only numbers
                                                                field.onChange(rawValue ? Number(rawValue) : undefined); // ✅ undefined if empty
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Payment Received Date */}
                                        <FormField
                                            control={form.control}
                                            name="payment_received_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Received Date</FormLabel>
                                                    <DatePicker field={field} label="Payment Received Date" disabled={true} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                        {/* Payment Status */}
                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="status_of_payment"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Payment Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Current Project Status" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="dark:bg-[#181c24]">
                                                                <SelectItem value="Pending" className="hover:dark:bg-[#20242c]">Pending</SelectItem>
                                                                <SelectItem value="Unpaid" className="hover:dark:bg-[#20242c]">Unpaid</SelectItem>
                                                                <SelectItem value="Paid" className="hover:dark:bg-[#20242c]">Paid</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>


                                        {/* About Client */}
                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="about"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>About Client</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Describe the client and their business" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>


                                    </CardContent>


                                </Card>

                            </motion.div>


                        )}






                        {/* Step 2: Project Details */}
                        {currentStep === 2 && (


                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >


                                <Card className="card-elevated dark:bg-[#0e141d] border-1">


                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <div className="w-2 h-2 rounded-full bg-[#6495f7] dark:drop-shadow-[0_0_6px_#3B82F6] animate-pulse"></div>
                                            Project Details <FolderOpenDot className="mt-1" />
                                        </CardTitle>
                                    </CardHeader>



                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">


                                        {/* Name */}
                                        <FormField
                                            control={form.control}
                                            name="project_name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Project Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Enter project name" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Project Status */}
                                        <FormField
                                            control={form.control}
                                            name="project_status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Project Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Current Project Status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="dark:bg-[#181c24]">
                                                            <SelectItem value="Delivered" className="hover:dark:bg-[#20242c]">Delivered</SelectItem>
                                                            <SelectItem value="Completed" className="hover:dark:bg-[#20242c]">Completed</SelectItem>
                                                            <SelectItem value="In Development" className="hover:dark:bg-[#20242c]">In Development</SelectItem>
                                                            <SelectItem value="On Hold" className="hover:dark:bg-[#20242c]">On Hold</SelectItem>
                                                            <SelectItem value="Cancelled" className="hover:dark:bg-[#20242c]">Cancelled</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Project Type */}
                                        <FormField
                                            control={form.control}
                                            name="project_type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Project Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select project type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="dark:bg-[#181c24]">
                                                            <SelectItem value="Web Development" className="hover:dark:bg-[#20242c]">Web Development</SelectItem>
                                                            <SelectItem value="Mobile Application" className="hover:dark:bg-[#20242c]">Mobile Application</SelectItem>
                                                            <SelectItem value="Custom Software" className="hover:dark:bg-[#20242c]">Custom Software</SelectItem>
                                                            <SelectItem value="Web & App" className="hover:dark:bg-[#20242c]">Web & App</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* Work Type */}
                                        <FormField
                                            control={form.control}
                                            name="work_type"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Work Type</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select project type" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="dark:bg-[#181c24]">
                                                            <SelectItem value="Landing Page" className="hover:dark:bg-[#20242c]">Landing Page</SelectItem>
                                                            <SelectItem value="For Ex-Bot" className="hover:dark:bg-[#20242c]">For Ex-Bot</SelectItem>
                                                            <SelectItem value="E-commerce" className="hover:dark:bg-[#20242c]">E-commerce</SelectItem>
                                                            <SelectItem value="Portfolio" className="hover:dark:bg-[#20242c]">Portfolio</SelectItem>
                                                            <SelectItem value="CRM-Dashboard" className="hover:dark:bg-[#20242c]">CRM-Dashboard</SelectItem>
                                                            <SelectItem value="Social Media Applications" className="hover:dark:bg-[#20242c]">Social Media Application</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />




                                        {/* work assigned date */}
                                        <FormField
                                            control={form.control}
                                            name="work_assigned_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Work Assigned Date</FormLabel>
                                                    <DatePicker field={field} label="Work Assigned Date" disabled={true} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />




                                        {/* assigned delivery date */}
                                        <FormField
                                            control={form.control}
                                            name="work_assigned_delivery_date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Work Assigned Delivery Date</FormLabel>
                                                    <DatePicker field={field} label="Assigned Delivery Date" disabled={false} />
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />




                                        {/* Work Completed Date */}
                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="work_completed_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Work Completed Date (Optional)</FormLabel>
                                                        <DatePicker field={field} label="Work Completed Date" disabled={false} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>




                                        {/* Scope of Work */}
                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="scope_of_work"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Scope of Work</FormLabel>
                                                        <FormControl>
                                                            <Textarea placeholder="Detailed description of project scope" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>


                                    </CardContent>


                                </Card>

                            </motion.div>


                        )}





                        {/* Step 3: Domain & Server */}
                        {currentStep === 3 && (


                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >


                                <div className="space-y-6">


                                    <Card className="card-elevated dark:bg-[#0e141d] border-1">


                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-xl">
                                                <div className="w-2 h-2 rounded-full bg-[#6495f7] dark:drop-shadow-[0_0_6px_#3B82F6] animate-pulse"></div>
                                                Domain Information <Database className="mt-1" />
                                            </CardTitle>
                                        </CardHeader>


                                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">


                                            {/* Domain Status */}
                                            <FormField
                                                control={form.control}
                                                name="domain_status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Domain Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="dark:bg-[#181c24]">
                                                                <SelectItem value="Active" className="hover:dark:bg-[#20242c]">Active</SelectItem>
                                                                <SelectItem value="Expired" className="hover:dark:bg-[#20242c]">Expired</SelectItem>
                                                                <SelectItem value="Pending" className="hover:dark:bg-[#20242c]">Pending</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />



                                            {/* Domain Name */}
                                            <FormField
                                                control={form.control}
                                                name="domain_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Domain Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="example.com" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />



                                            {/* Domain Owner */}
                                            <FormField
                                                control={form.control}
                                                name="domain_owned_by"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Domain Owner</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select domain owner" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="dark:bg-[#181c24]">
                                                                <SelectItem value="Own" className="hover:dark:bg-[#20242c]">Own</SelectItem>
                                                                <SelectItem value="Client" className="hover:dark:bg-[#20242c]">Client</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />



                                            {/* Domain Provider */}
                                            <FormField
                                                control={form.control}
                                                name="domain_provider"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Domain Provider</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="GoDaddy, Namecheap, etc." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />



                                            {/* Domain Purchase Date */}
                                            <FormField
                                                control={form.control}
                                                name="domain_purchased_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Purchase Date</FormLabel>
                                                        <DatePicker field={field} label="Purchase Date" disabled={true} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />



                                            {/* Domain Expiry Date */}
                                            <FormField
                                                control={form.control}
                                                name="domain_expiry_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Expiry Date</FormLabel>
                                                        <DatePicker field={field} label="Expiry Date" disabled={false} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />



                                            {/* Domain Cost */}
                                            <FormField
                                                control={form.control}
                                                name="domain_cost"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Domain Cost</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter Domain Cost"
                                                                value={field.value ? field.value.toLocaleString("en-IN") : ""}
                                                                onChange={(e) => {
                                                                    const rawValue = e.target.value.replace(/,/g, ""); // remove commas
                                                                    if (!/^\d*$/.test(rawValue)) return; // allow only numbers
                                                                    field.onChange(rawValue ? Number(rawValue) : undefined); // ✅ undefined if empty
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            {/* Payment Status */}
                                            <FormField
                                                control={form.control}
                                                name="domain_cost_status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Payment Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Current Project Status" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="dark:bg-[#181c24]">
                                                                <SelectItem value="Pending" className="hover:dark:bg-[#20242c]">Pending</SelectItem>
                                                                <SelectItem value="Unpaid" className="hover:dark:bg-[#20242c]">Unpaid</SelectItem>
                                                                <SelectItem value="Paid" className="hover:dark:bg-[#20242c]">Paid</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                        </CardContent>


                                    </Card>




                                    {/* Server Information */}
                                    <Card className="card-elevated dark:bg-[#0e141d] border-1">


                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2 text-xl">
                                                <div className="w-2 h-2 rounded-full bg-[#6495f7] dark:drop-shadow-[0_0_6px_#3B82F6] animate-pulse"></div>
                                                Server Information <Server className="mt-1" />
                                            </CardTitle>
                                        </CardHeader>



                                        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">



                                            {/* Server Status */}
                                            <FormField
                                                control={form.control}
                                                name="server_status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Server Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="dark:bg-[#181c24]">
                                                                <SelectItem value="Active" className="hover:dark:bg-[#20242c]">Active</SelectItem>
                                                                <SelectItem value="Expired" className="hover:dark:bg-[#20242c]">Expired</SelectItem>
                                                                <SelectItem value="Pending" className="hover:dark:bg-[#20242c]">Pending</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />




                                            {/* Server Type */}
                                            <FormField
                                                control={form.control}
                                                name="server_type"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Server Type</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="VPS, Cloud, Shared, etc." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />




                                            {/* Server Name */}
                                            <FormField
                                                control={form.control}
                                                name="server_name"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Server Name</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="AWS, DigitalOcean, etc." {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />




                                            {/* Server Owner */}
                                            <FormField
                                                control={form.control}
                                                name="server_owned_by"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Server Owner</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Server Owner" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="dark:bg-[#181c24]">
                                                                <SelectItem value="Own" className="hover:dark:bg-[#20242c]">Own</SelectItem>
                                                                <SelectItem value="Client" className="hover:dark:bg-[#20242c]">Client</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />



                                            {/* Acquired Date */}
                                            <FormField
                                                control={form.control}
                                                name="server_accrued_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Acquired Date</FormLabel>
                                                        <DatePicker field={field} label="Acquired Date" disabled={true} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />




                                            {/* Expiry Date */}
                                            <FormField
                                                control={form.control}
                                                name="server_expiry_date"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Expiry Date</FormLabel>
                                                        <DatePicker field={field} label="Expiry Date" disabled={false} />
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            {/* Domain Cost */}
                                            <FormField
                                                control={form.control}
                                                name="server_cost"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Domain Cost</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                placeholder="Enter Domain Cost"
                                                                value={field.value ? field.value.toLocaleString("en-IN") : ""}
                                                                onChange={(e) => {
                                                                    const rawValue = e.target.value.replace(/,/g, ""); // remove commas
                                                                    if (!/^\d*$/.test(rawValue)) return; // allow only numbers
                                                                    field.onChange(rawValue ? Number(rawValue) : undefined); // ✅ undefined if empty
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                            {/* Payment Status */}
                                            <FormField
                                                control={form.control}
                                                name="server_cost_status"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Payment Status</FormLabel>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Current Project Status" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent className="dark:bg-[#181c24]">
                                                                <SelectItem value="Pending" className="hover:dark:bg-[#20242c]">Pending</SelectItem>
                                                                <SelectItem value="Unpaid" className="hover:dark:bg-[#20242c]">Unpaid</SelectItem>
                                                                <SelectItem value="Paid" className="hover:dark:bg-[#20242c]">Paid</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />


                                        </CardContent>


                                    </Card>


                                </div>


                            </motion.div>


                        )}






                        {/* Step 4: Payment Gateway */}
                        {currentStep === 4 && (


                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >


                                <Card className="card-elevated dark:bg-[#0e141d] border-1">


                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <div className="w-2 h-2 rounded-full bg-[#6495f7] dark:drop-shadow-[0_0_6px_#3B82F6] animate-pulse"></div>
                                            Payment Gateway <CreditCard className="mt-1" />
                                        </CardTitle>
                                    </CardHeader>



                                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">



                                        {/* Gateway Used */}
                                        <FormField
                                            control={form.control}
                                            name="gateway_used"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gateway Used / Not</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Payment Gateway is Used / Not" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="dark:bg-[#181c24]">
                                                            <SelectItem value="Yes" className="hover:dark:bg-[#20242c]">Yes</SelectItem>
                                                            <SelectItem value="No" className="hover:dark:bg-[#20242c]">No</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />




                                        {/* Payment Gateway */}
                                        <FormField
                                            control={form.control}
                                            name="payment_gateway"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Gateway</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger className="w-full">
                                                                <SelectValue placeholder="Select Payment Gateway" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="dark:bg-[#181c24]">
                                                            {/* Indian Gateways */}
                                                            {indianGateways.map((gateway) => (
                                                                <SelectItem
                                                                    key={gateway}
                                                                    value={gateway}
                                                                    className="hover:dark:bg-[#20242c]"
                                                                >
                                                                    {gateway}
                                                                </SelectItem>
                                                            ))}

                                                            {/* Global Gateways */}
                                                            {globalGateways.map((gateway) => (
                                                                <SelectItem
                                                                    key={gateway}
                                                                    value={gateway}
                                                                    className="hover:dark:bg-[#20242c]"
                                                                >
                                                                    {gateway}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>

                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />


                                        {/* payment gateway username */}
                                        <FormField
                                            control={form.control}
                                            name="payment_gateway_username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Gateway Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Payment Gateway Username" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* payment gateway password */}
                                        <FormField
                                            control={form.control}
                                            name="payment_gateway_password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Gateway Password</FormLabel>
                                                    <div className="relative">
                                                        <FormControl>
                                                            <Input
                                                                type={showPassword ? "text" : "password"}
                                                                placeholder="Payment Gateway Password"
                                                                {...field}
                                                                className="pr-10" // space for the eye button
                                                            />
                                                        </FormControl>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => setShowPassword((prev) => !prev)}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
                                                        >
                                                            {showPassword ? (
                                                                <EyeOff className="h-5 w-5 text-gray-500" />
                                                            ) : (
                                                                <Eye className="h-5 w-5 text-gray-500" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />



                                        {/* payment gateway url */}
                                        <div className="md:col-span-2">
                                            <FormField
                                                control={form.control}
                                                name="payment_gateway_url"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Payment Gateway Url</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Payment Gateway Url" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>


                                    </CardContent>


                                </Card>


                            </motion.div>

                        )}




                        {/* Step 5: Developer informations */}
                        {currentStep === 5 && (



                            <motion.div
                                key={currentStep}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            >

                                <Card className="card-elevated dark:bg-[#0e141d] border-1">

                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-xl">
                                            <div className="w-2 h-2 rounded-full bg-[#6495f7] dark:drop-shadow-[0_0_6px_#3B82F6] animate-pulse"></div>
                                            Developer Information <Code className="mt-1" />
                                        </CardTitle>
                                    </CardHeader>



                                    <CardContent>


                                        {fields.map((field, index) => (


                                            <div key={field.id} className="border p-4 rounded-xl mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">


                                                {/* Worker Name */}
                                                <FormField
                                                    control={form.control}
                                                    name={`workers.${index}.worker_name`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Developer Name</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="Enter worker name" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />


                                                {/* Work Role */}
                                                <FormField
                                                    control={form.control}
                                                    name={`workers.${index}.work_role`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Work Role</FormLabel>
                                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                <FormControl>
                                                                    <SelectTrigger className="w-full">
                                                                        <SelectValue placeholder="Select Work Role" />
                                                                    </SelectTrigger>
                                                                </FormControl>
                                                                <SelectContent className="dark:bg-[#181c24]">
                                                                    <SelectItem value="Front-end Developer" className="hover:dark:bg-[#20242c]">Front-end Developer</SelectItem>
                                                                    <SelectItem value="Back-end Developer" className="hover:dark:bg-[#20242c]">Back-end Developer</SelectItem>
                                                                    <SelectItem value="Flutter Developer" className="hover:dark:bg-[#20242c]">Flutter Developer</SelectItem>
                                                                    <SelectItem value="Full-stack Developer" className="hover:dark:bg-[#20242c]">Full-stack Developer</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />



                                                {/* Work Status */}
                                                <FormField
                                                    control={form.control}
                                                    name={`workers.${index}.work_status`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Work Status</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="e.g. In Progress" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />



                                                {/* Dates */}
                                                <FormField
                                                    control={form.control}
                                                    name={`workers.${index}.assigned_end_date`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Assigned Work End Date</FormLabel>
                                                            <DatePicker field={field} label="Assigned End Date" disabled={false} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />


                                                <FormField
                                                    control={form.control}
                                                    name={`workers.${index}.work_started_date`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Work Start Date</FormLabel>
                                                            <DatePicker field={field} label="Start Date" disabled={true} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />


                                                <FormField
                                                    control={form.control}
                                                    name={`workers.${index}.worker_end_date`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Work Ended Date (Optional)</FormLabel>
                                                            <DatePicker field={field} label="End Date" disabled={false} />
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />



                                                {/* Remove Button */}
                                                <div className="md:col-span-2 flex justify-end">
                                                    <Button disabled={isPending} type="button" className="bg-red-500 text-white font-medium hover:bg-red-700 hover:cursor-pointer" onClick={() => remove(index)}>
                                                        Remove Developer <Trash2 />
                                                    </Button>
                                                </div>


                                            </div>

                                        ))}


                                        {/* Add Button */}
                                        <Button
                                            type="button"
                                            className="hover:cursor-pointer "
                                            disabled={isPending}
                                            onClick={() =>
                                                append({
                                                    worker_name: "",
                                                    work_role: "",
                                                    work_status: "",
                                                    work_started_date: new Date(),
                                                    worker_end_date: new Date(),
                                                    assigned_end_date: new Date(),
                                                })
                                            }
                                        >
                                            Add Developer <Plus />
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        )}


                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-6">


                            <Button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1 || isPending}
                                className={`flex items-center gap-2 px-5 py-2 font-medium rounded-lg border-2 hover:cursor-pointer transition-all duration-300 ease-in-out ${currentStep === 1 ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400 dark:border-gray-600" : "bg-white text-black border-[#6495f7] hover:bg-[#6495f7] hover:text-white shadow-sm hover:shadow-md hover:scale-105 dark:bg-[#6495f7] dark:text-black dark:border-[#6495f7] dark:hover:bg-[#4a7de6] dark:hover:border-[#4a7de6]"} `}
                            >
                                Previous
                            </Button>



                            <div className="flex gap-2">


                                <Button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isPending}
                                    className="flex items-center hover:cursor-pointer gap-2 px-4 py-2 rounded-lg border border-gray-500/40 text-white bg-[#11161e] hover:bg-[#1a202c] hover:border-gray-400/60 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md"
                                >
                                    <X className="h-4 w-4" />
                                    Cancel
                                </Button>


                                {currentStep < totalSteps ? (

                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        disabled={isPending}
                                        className="flex items-center gap-2 px-5 py-2 hover:cursor-pointer font-medium rounded-lg border-2 bg-white text-black border-[#6495f7] hover:bg-[#6495f7] hover:text-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 dark:bg-[#6495f7] dark:text-black dark:border-[#6495f7]  dark:hover:bg-[#4a7de6] dark:hover:border-[#4a7de6]"
                                    >
                                        Next
                                    </Button>

                                ) : (

                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="flex items-center gap-2 border-2 font-medium px-4 py-2 rounded-lg hover:cursor-pointer bg-white text-black border-[#6495f7] hover:bg-[#6495f7] hover:text-white  transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:scale-105 dark:bg-[#6495f7] dark:text-black dark:border-[#6495f7]  dark:hover:bg-[#4a7de6] dark:hover:border-[#4a7de6]"
                                    >
                                        {isPending ? <Loader2 className="animate-spin duration-100 h-4 w-4" /> : <Plus className="h-4 w-4" />}

                                        Create Project
                                    </Button>

                                )}

                            </div>


                        </div>


                    </form>


                </Form>


            </DialogContent>


        </Dialog>


    );


}