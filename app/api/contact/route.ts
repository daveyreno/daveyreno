import LeadNotification from "@/emails/ContactNotification";
import { render } from "@react-email/components";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;

export async function POST(request: Request, res: Response) {
  const { name, email, phone, message } = await request.json();

  const { data, error } = await resend.emails.send({
    from: "DaveyReno Website <onboarding@resend.dev>",
    to: [toEmail],
    subject: "New Lead - Call Back",
    html: render(LeadNotification({ name, email, phone, message })),
  });

  if (error) {
    return Response.json(error);
  }

  return Response.json({ message: "Success" });
}
