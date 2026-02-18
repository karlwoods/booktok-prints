"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import emailjs from '@emailjs/browser';
import { siteConfig } from "@/config/site";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID!;

emailjs.init(PUBLIC_KEY);

interface EmailJSError {
  status?: number;
  text?: string;
  message?: string;
  response?: unknown;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const templateParams = {
        to_email: siteConfig.company.supportEmail,
        to_name: `${siteConfig.name} Support`,
        contactName: formData.name,            // Changed from from_name to contactName
        email: formData.email,                 // Sender's email
        subject: formData.subject,
        message: formData.message
      };

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: unknown) {
      const emailError = error as EmailJSError;
      console.error("EmailJS error:", {
        status: emailError.status,
        message: emailError.message || emailError.text
      });
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-main-light flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-1">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-main mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-main mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  rows={5}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-main text-white hover:bg-main/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              {submitStatus === "success" && (
                <p className="text-green-600 text-center">Message sent successfully!</p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-center">Something went wrong. Please try again.</p>
              )}
            </form>
          </div>

          {/* Contact Information Section */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-main mb-6">Quick Contact</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Email</h3>
                  <a
                    href={`mailto:${siteConfig.company.supportEmail}`}
                    className="text-main hover:underline"
                  >
                    {siteConfig.company.supportEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-semibold text-main mb-6">Company Information</h2>
              <div className="space-y-2 text-gray-600">
                <p>{siteConfig.company.legalName}</p>
                <div>
                  <h3 className="font-semibold text-gray-800">Etsy Store</h3>
                  <a
                    href="https://booktokprint.etsy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-main hover:underline"
                  >
                    booktokprint.etsy.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
