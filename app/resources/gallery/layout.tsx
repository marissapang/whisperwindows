import NavBar from "../../components/NavBar";
import ContactForm from "../../components/ContactForm";

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <ContactForm />
    </>
  )
}