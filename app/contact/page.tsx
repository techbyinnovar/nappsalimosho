import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import FAQSection from "@/components/FAQSection";
import location from "../../public/images/icons/location.png"
import email from "../../public/images/icons/email.png"
import phone from "../../public/images/icons/phone.png"
const ContactSection = () => {
  return (
    <section className="">
      <div className="text-center py-24 bg-[url('../public/images/tealbg.png')] bg-no-repeat bg-bottom bg-cover">
        <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-4">Get In Touch</h1>
        <p className="max-w-4xl mx-auto text-lg md:text-2xl text-gray-700">We are here to support Private School Proprietors within Alimosho. Reach out to us for any inquiries, support or partnership opportunities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-6 md:px-64">
        <ContactInfoCard 
          title="Call Us" 
          content="0803 678 9605, 0802 312 4449, 0802 329 4261, 0802 336 6082."
          note="Mon - Fri, 9:00am - 6:00pm"
          icon={<Image src={phone} width={200} height={200} alt="phone" className="w-14 h-14" />}
        />
        
        <ContactInfoCard 
          title="Email Us" 
          content="nappsalimosho1@gmail.com "
          note="We'll respond within 24 hours."
          icon={<Image src={email} width={200} height={200} alt="email" className="w-14 h-14" />}
        />
        
        <ContactInfoCard 
          title="Visit Us" 
          content="69, Akowonjo road, Combine plaza, Micom bus stop, Egbeda."
          note="Lagos, Nigeria."
          icon={<Image src={location} width={200} height={200} alt="location" className="w-14 h-14" />}
        />
      </div>

      <div className="bg-[#EDFBEE] px-6 md:px-32 py-20 flex flex-col items-center">
        <h2 className="text-2xl md:text-5xl font-medium text-center mb-10 text-green-800">Send Us A Message</h2>
        <ContactForm />
      </div>
      <FAQSection />
    </section>
  );
};

export default ContactSection;

export function ContactInfoCard({ title, content, note, icon }: { icon: React.ReactNode, title: string; content: string, note?: string }) {
  return (
    <div className="bg-white border-2 border-[#f0f0f0] p-6 md:mt-24 mt-10 rounded-lg shadow-md text-center flex flex-col items-center justify-center">
      <div className="mb-2">{icon}</div>
      <h3 className="text-xl md:text-3xl text-green-800 font-semibold mb-4">{title}</h3>
      <p className="text-[#4e4e4e] font-medium text-lg md:text-xl">{content}</p>
      <p className="text-[#717171] font-normal text-lg">{note}</p>
    </div>
  );
}