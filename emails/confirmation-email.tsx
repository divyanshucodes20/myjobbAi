import { Body, Container, Head, Heading, Html, Link, Preview, Section, Text } from "@react-email/components"

interface ConfirmationEmailProps {
  email: string
}

export default function ConfirmationEmail({ email }: ConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Dashboard App!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <div style={logo}>📊</div>
          </Section>
          <Heading style={h1}>Welcome to Dashboard App!</Heading>
          <Text style={heroText}>Hi there! Your email address {email} has been successfully verified.</Text>

          <Text style={text}>You now have access to your dashboard where you can:</Text>

          <ul style={list}>
            <li style={listItem}>View comprehensive product analytics</li>
            <li style={listItem}>Browse detailed product catalogs</li>
            <li style={listItem}>Access real-time data visualizations</li>
            <li style={listItem}>Manage your account settings</li>
          </ul>

          <Section style={buttonContainer}>
            <Link style={button} href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`}>
              Go to Dashboard
            </Link>
          </Section>

          <Text style={text}>
            If you have any questions or need assistance, feel free to reach out to our support team.
          </Text>

          <Section>
            <Text style={footerText}>Thank you for choosing Dashboard App!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
}

const container = {
  margin: "0 auto",
  padding: "0px 20px",
}

const logoContainer = {
  marginTop: "32px",
}

const logo = {
  fontSize: "32px",
  textAlign: "center" as const,
}

const h1 = {
  color: "#1d1c1d",
  fontSize: "36px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "42px",
}

const heroText = {
  fontSize: "20px",
  lineHeight: "28px",
  marginBottom: "30px",
}

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
  marginBottom: "16px",
}

const list = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
  marginBottom: "16px",
  paddingLeft: "20px",
}

const listItem = {
  marginBottom: "8px",
}

const buttonContainer = {
  margin: "32px 0",
  textAlign: "center" as const,
}

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
}

const footerText = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
}
