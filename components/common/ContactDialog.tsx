"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { sendContactEmail } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  message: z.string(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactDialog({ open, onOpenChange }: ContactDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      const result = await sendContactEmail(data);
      if (result.success) {
        reset();
        onOpenChange(false);
      } else {
        // Handle error - you might want to show a toast or error message
        console.error("Failed to send email:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <DialogDescription>I can't wait to hear from you!</DialogDescription>
        </DialogHeader>
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="gap-4">
            <Field data-invalid={!!errors.name}>
              <Input
                {...register("name")}
                id="contact-name"
                aria-invalid={!!errors.name}
                placeholder="Name"
                autoComplete="name"
              />
              {errors.name && <FieldError errors={[errors.name]} />}
            </Field>
            <Field data-invalid={!!errors.email}>
              <Input
                {...register("email")}
                id="contact-email"
                type="email"
                aria-invalid={!!errors.email}
                placeholder="Email"
                autoComplete="email"
              />
              {errors.email && <FieldError errors={[errors.email]} />}
            </Field>
            <Field data-invalid={!!errors.phone}>
              <Input
                {...register("phone")}
                id="contact-phone"
                type="tel"
                aria-invalid={!!errors.phone}
                placeholder="Phone"
                autoComplete="tel"
              />
              {errors.phone && <FieldError errors={[errors.phone]} />}
            </Field>
            <Field data-invalid={!!errors.message}>
              <Textarea
                {...register("message")}
                id="contact-message"
                aria-invalid={!!errors.message}
                placeholder="Message"
                rows={6}
                className="min-h-24 resize-none"
              />
              {errors.message && <FieldError errors={[errors.message]} />}
            </Field>
          </FieldGroup>
        </form>
        <DialogFooter>
          <Button
            type="submit"
            form="contact-form"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
