import { A, CompanyIdentity, H, LegalPage, Mail, P } from '@/components/Legal'
import { COMPANY } from '@/config'

// Covers mangodocs.ai (this site and its interest form), plus the "Google user
// data" section, which applies to the app and is what Google's OAuth review
// reads. Customers' contract data is otherwise governed by their own agreement. Keep every statement
// literally true: if analytics, cookies or a new processor are ever added (or
// the cookieless visit counting in src/lib/countVisit.ts changes),
// this page changes in the same commit.
const UPDATED = '9 October 2026'

export function Privacy() {
  return (
    <LegalPage eyebrow="Privacy" title="Privacy notice" updated={UPDATED}>
      <P>
        This notice explains what happens to personal information you share with MangoDocs through this website,
        mangodocs.ai. It’s short because we collect very little. If your organisation uses the MangoDocs application,
        the data in it is covered by your organisation’s agreement with us, not by this notice, except for the section
        on Google user data below, which applies to the application.
      </P>

      <H>Who we are</H>
      <P>
        MangoDocs is provided by <CompanyIdentity />. We are the controller of the information described here, and are
        registered with the Information Commissioner’s Office (registration number {COMPANY.icoNumber}).
      </P>

      <H>What we collect</H>
      <P>
        Only what you type into the “Request a demo” form: your name, work email and company, plus your role and a
        message if you add them.
      </P>
      <P>
        We don’t keep your IP address with your form submission. Like any website, the services that host this one keep
        standard technical logs, such as IP addresses and browser types, for a short time to keep the site secure and
        working.
      </P>

      <H>Counting visits</H>
      <P>
        To know how many people visit, each time a page opens we record which page it was, the date, and the website you
        came from, if any. To count each visitor once a day without a cookie, we combine your IP address and browser
        type with a random value that changes every day and keep only the scrambled result, never the IP address itself.
        The daily value is deleted once the day is over, after which nobody, including us, can link that result back to
        you or to your visits on other days. If your browser sends a Global Privacy Control or Do Not Track signal, we
        don’t count your visit at all.
      </P>

      <H>What we don’t do</H>
      <P>
        This site sets no cookies, stores nothing in your browser, and runs no third-party analytics, advertising or
        tracking scripts. Its fonts are served from our own site, so visiting it doesn’t send your details to a font
        provider either.
      </P>

      <H>Why we use it</H>
      <P>
        To reply to your enquiry and arrange a demo if you want one. Our lawful basis is legitimate interests: you asked
        us to get in touch, and we use your details for nothing else. We never sell them or add you to a mailing list.
        Visit counts are also kept on the basis of legitimate interests: knowing, in aggregate, how many people visit
        and which pages they read.
      </P>

      <H>Where it’s kept, and who else handles it</H>
      <P>
        Form submissions and visit counts are stored in our own database. The website and that database run on our cloud
        infrastructure provider, which acts as our processor under a data-processing agreement. Ask us and we’ll tell
        you who it is.
      </P>

      <H>How long we keep it</H>
      <P>
        We keep form submissions and visit counts for 24 months, then delete them automatically. Ask us to delete your
        form submission sooner and we will.
      </P>

      <H>Transfers outside the UK</H>
      <P>
        If any of your information is processed outside the UK, by us or by a processor, we make sure it is protected by
        the safeguards UK law requires, such as an adequacy decision or the UK International Data Transfer Agreement.
      </P>

      <H>Google user data in the MangoDocs application</H>
      <P>
        When your organisation connects Google Drive, the application asks Google for two permissions. The first lets it
        see your Drive, so you can choose folders and so it can read the documents in the folders your organisation
        connects. The second lets it create files, such as drafts, uploaded documents and templates, and change or
        delete only the files it created. It can’t edit or delete anything else in your Drive.
      </P>
      <P>
        We use that access only to provide the application’s features to your organisation: finding contracts,
        extracting their key terms and obligations, searching them and writing the documents you ask it to create. We
        store the text of those documents and the information extracted from them in our database, encrypted, along with
        the access Google grants us. To analyse documents we send their content to AI and text-recognition services that
        act as our processors and don’t use it to train their models.
      </P>
      <P>
        We don’t sell Google user data, use it for advertising, or use it to build models for anyone else. People at
        MangoDocs don’t read it unless you ask us to (for example, for support), it’s needed for security, or the law
        requires it.
      </P>
      <P>
        MangoDocs’ use and transfer to any other app of information received from Google APIs will adhere to the{' '}
        <A href="https://developers.google.com/terms/api-services-user-data-policy">
          Google API Services User Data Policy
        </A>
        , including the Limited Use requirements.
      </P>
      <P>
        You can remove the application’s access at any time from your Google Account’s{' '}
        <A href="https://myaccount.google.com/permissions">third-party access page</A>
        . To have the data we hold from your Drive deleted, email <Mail />.
      </P>

      <H>Your rights</H>
      <P>
        Under UK data-protection law you can ask to see the information we hold about you, have it corrected or deleted,
        restrict or object to how we use it, or receive a copy to take elsewhere. Email <Mail /> and a person will
        reply. If you’re unhappy with how we’ve handled your information, you can complain to the Information
        Commissioner’s Office at <A href="https://ico.org.uk/make-a-complaint/">ico.org.uk</A>.
      </P>

      <H>Contact</H>
      <P>
        Questions about this notice or your information: <Mail />.
      </P>
    </LegalPage>
  )
}
