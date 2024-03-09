import {
  Container,
  Head,
  Heading,
  Html,
  Text,
  Font,
  Section,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import * as React from "react";

interface LeadNotificationProps {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function ContactNotification({
  name,
  phone,
  email,
  message,
}: LeadNotificationProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind>
        <Container>
          <Heading as="h1">New Contact</Heading>
          <Text>Somebody completed the contact form on Daveyreno.com!</Text>
          <Section>
            <Text className="text-sm">Name:</Text>
            <Text className="text-lg font-bold">{name}</Text>
            <Text className="text-sm">Phone:</Text>
            <Text className="text-lg font-bold">{phone}</Text>
            <Text className="text-sm">Email:</Text>
            <Text className="text-lg font-bold">{email}</Text>
            <Text className="text-sm">Message:</Text>
            <Text className="text-lg font-bold">{message}</Text>
          </Section>
        </Container>
      </Tailwind>
    </Html>
  );
}
