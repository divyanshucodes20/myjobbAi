import { Body, Container, Head, Heading, Html, Preview, Section, Text } from "@react-email/components"

interface OTPEmailProps {
  otp: string
}

export default function OTPEmail({ otp }: OTPEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your verification code: {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <div style={logo}>📊</div>
          </Section>
          <Heading style={h1}>Verify your email address</Heading>
          <Text style={heroText}>
            Your verification code is below - enter it in your open browser window and we'll help you get signed in.
          </Text>

          <Section style={codeContainer}>
            <Text style={confirmationCodeText}>{otp}</Text>
          </Section>

          <Text style={text}>
            If you didn't request this email, there's nothing to worry about, you can safely ignore it.
          </Text>

          <Section>
            <Text style={footerText}>This code will expire in 10 minutes.</Text>
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

const codeContainer = {
  background: "rgba(0,0,0,.05)",
  borderRadius: "4px",
  margin: "16px auto 14px",
  verticalAlign: "middle",
  width: "280px",
}

const confirmationCodeText = {
  fontSize: "30px",
  textAlign: "center" as const,
  verticalAlign: "middle",
  color: "#000",
  margin: "0",
  padding: "20px 0",
  letterSpacing: "6px",
}

const text = {
  color: "#000",
  fontSize: "14px",
  lineHeight: "24px",
}

const footerText = {
  color: "#898989",
  fontSize: "12px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
}
