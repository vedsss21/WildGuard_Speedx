
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "../ui/textarea"
import { Incident } from "@/app/dashboard/incidents/page"

const formSchema = z.object({
  type: z.string().min(1, { message: "Incident type is required." }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  status: z.string().min(1, { message: "Status is required." }),
  animalType: z.string().optional(),
  description: z.string().optional(),
  actionTaken: z.string().optional(),
})

type IncidentFormProps = {
    onSubmit: (values: z.infer<typeof formSchema>) => void;
    incident?: Incident;
}

export function IncidentForm({ onSubmit, incident }: IncidentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: incident?.type || "",
      location: incident?.location || "",
      status: incident?.status || "Pending",
      animalType: incident?.animalType || "",
      description: incident?.description || "",
      actionTaken: incident?.actionTaken || "",
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Incident Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select incident type" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="Crop Damage">Crop Damage</SelectItem>
                        <SelectItem value="Property Damage">Property Damage</SelectItem>
                        <SelectItem value="Animal Attack">Animal Attack</SelectItem>
                        <SelectItem value="Sighting">Sighting</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Near Moharli Village" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                </FormControl>
                <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="animalType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Animal Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Tiger, Leopard" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Detailed description of the incident." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="actionTaken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action Taken</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the actions taken." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
