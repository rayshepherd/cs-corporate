import { company, contact } from "@/content/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { address } = company;
  return (
    <section id="contact">
      <div className="mx-auto grid max-w-[1180px] gap-14 px-5 py-20 md:grid-cols-[0.75fr_1.25fr] md:gap-20 md:px-8 md:py-28">
        <div>
          <h2 className="display text-[1.9rem] md:text-[2.5rem]">{contact.heading}</h2>
          <p className="mt-4 text-steel">{contact.intro}</p>

          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-sm text-steel">Address</dt>
              <dd className="mt-1">
                {address.line1}
                <br />
                {address.city}, {address.country}
                {address.mapUrl && (
                  <>
                    <br />
                    <a
                      href={address.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline-offset-4 hover:underline"
                    >
                      Open in Maps
                    </a>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-steel">Phone</dt>
              <dd className="mt-1">
                <a href={`tel:${company.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">
                  {company.phone}
                </a>
                {company.whatsapp && (
                  <>
                    {" "}
                    <a
                      href={`https://wa.me/${company.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent underline-offset-4 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-steel">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${company.email}`} className="hover:text-accent">
                  {company.email}
                </a>
              </dd>
            </div>
            {company.hours.length > 0 && (
              <div>
                <dt className="text-sm text-steel">Opening hours</dt>
                <dd className="mt-1">
                  {company.hours.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div id="apply" className="scroll-mt-24">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
