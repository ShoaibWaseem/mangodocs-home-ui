import type { ReactNode } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/sections/Footer'
import { CONTACT_EMAIL } from '@/config'

// Covers mangodocs.ai (this site and its interest form), plus the "Google user
// data" section, which applies to the app and is what Google's OAuth review
// reads. Customers' contract data is otherwise governed by their own agreement. Keep every statement
// literally true: if analytics, cookies or a new processor are ever added,
// this page changes in the same commit.
const UPDATED = '5 October 2026'

function H({ children }: { children: ReactNode }) {
  return <h2 className="display-3 mt-14 text-ink">{children}</h2>
}

function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">{children}</p>
}

const Mail = () => (
  <a
    href={`mailto:${CONTACT_EMAIL}`}
    className="text-ink underline decoration-mango-500 underline-offset-4 hover:decoration-ink"
  >
    {CONTACT_EMAIL}
  </a>
)

export function Privacy() {
  return (
    <div id="top">
      <Header />
      <main className="container max-w-3xl pb-24 pt-32 sm:pb-32 sm:pt-40">
        <p className="caps text-mango-800">Privacy</p>
        <h1 className="display-1 mt-6 text-ink">Privacy notice</h1>
        <p className="caps mt-8 text-ink-muted">Last updated {UPDATED}</p>

        <P>
          This notice explains what happens to personal information you share with MangoDocs through this website,
          mangodocs.ai. It’s short because we collect very little. If your organisation uses the MangoDocs application,
          the data in it is covered by your organisation’s agreement with us, not by this notice, except for the section
          on Google user data below, which applies to the application.
        </P>

        <H>What we collect</H>
        <P>
          Only what you type into the “Request a demo” form: your name, work email and company, plus your role and a
          message if you add them.
        </P>
        <P>
          Like any website, the services that host it record technical information such as IP addresses and browser
          types in their logs, to keep the site secure and working.
        </P>

        <H>What we don’t do</H>
        <P>
          This site sets no cookies and runs no analytics, advertising or tracking scripts. Its fonts are served from
          our own site, so visiting it doesn’t send your details to a font provider either.
        </P>

        <H>Why we use it</H>
        <P>
          To reply to your enquiry and arrange a demo if you want one. Our lawful basis is legitimate interests: you
          asked us to get in touch, and we use your details for nothing else. We never sell them or add you to a mailing
          list.
        </P>

        <H>Where it’s kept, and who else handles it</H>
        <P>
          Form submissions are stored in our own database. The website and that database run on our cloud infrastructure
          provider, which acts as our processor under a data-processing agreement. Ask us and we’ll tell you who it is.
        </P>

        <H>How long we keep it</H>
        <P>For as long as we need it to follow up on your enquiry. Ask us to delete it at any time and we will.</P>

        <H>Google user data in the MangoDocs application</H>
        <P>
          When your organisation connects Google Drive, the application asks Google for two permissions. The first lets
          it see your Drive, so you can choose folders and so it can read the documents in the folders your organisation
          connects. The second lets it create files, such as drafts, uploaded documents and templates, and change or
          delete only the files it created. It can’t edit or delete anything else in your Drive.
        </P>
        <P>
          We use that access only to provide the application’s features to your organisation: finding contracts,
          extracting their key terms and obligations, searching them and writing the documents you ask it to create. We
          store the text of those documents and the information extracted from them in our database, encrypted, along
          with the access Google grants us. To analyse documents we send their content to AI and text-recognition
          services that act as our processors and don’t use it to train their models.
        </P>
        <P>
          We don’t sell Google user data, use it for advertising, or use it to build models for anyone else. People at
          MangoDocs don’t read it unless you ask us to (for example, for support), it’s needed for security, or the law
          requires it.
        </P>
        <P>
          MangoDocs’ use and transfer to any other app of information received from Google APIs will adhere to the{' '}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            className="text-ink underline decoration-mango-500 underline-offset-4 hover:decoration-ink"
          >
            Google API Services User Data Policy
          </a>
          , including the Limited Use requirements.
        </P>
        <P>
          You can remove the application’s access at any time from your Google Account’s{' '}
          <a
            href="https://myaccount.google.com/permissions"
            className="text-ink underline decoration-mango-500 underline-offset-4 hover:decoration-ink"
          >
            third-party access page
          </a>
          . To have the data we hold from your Drive deleted, email <Mail />.
        </P>

        <H>Your rights</H>
        <P>
          Under UK data-protection law you can ask to see the information we hold about you, have it corrected or
          deleted, or object to how we use it. Email <Mail /> and a person will reply. If you’re unhappy with how we’ve
          handled your information, you can complain to the Information Commissioner’s Office at{' '}
          <a
            href="https://ico.org.uk/make-a-complaint/"
            className="text-ink underline decoration-mango-500 underline-offset-4 hover:decoration-ink"
          >
            ico.org.uk
          </a>
          .
        </P>

        <H>Contact</H>
        <P>
          Questions about this notice or your information: <Mail />.
        </P>
      </main>
      <Footer />
    </div>
  )
}
