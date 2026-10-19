import { A, CompanyIdentity, H, LegalPage, Mail, P } from '@/components/Legal'

// Website terms plus the standard terms of the service. MangoDocs sells only to
// businesses, which is what lets the no-refunds clause stand: there are no
// consumer cancellation rights to preserve. A signed order form or agreement
// overrides this page.
const UPDATED = '19 October 2026'

export function Terms() {
  return (
    <LegalPage eyebrow="Legal" title="Terms" updated={UPDATED}>
      <H>Who we are</H>
      <P>
        MangoDocs is provided by <CompanyIdentity />. In these terms, “we” and “us” mean that company, and “you” means
        the organisation using the website or the MangoDocs service.
      </P>
      <P>
        These terms cover your use of this website, mangodocs.ai, and of the MangoDocs application. If your organisation
        has signed an order form or agreement with us, that document takes priority wherever it differs from this page.
      </P>

      <H>Business customers only</H>
      <P>
        MangoDocs is sold only to businesses and other organisations, not to consumers. By using the service you confirm
        you are acting for your organisation and have authority to accept these terms on its behalf.
      </P>

      <H>Using the website</H>
      <P>
        You may use this website to learn about MangoDocs and contact us. Don’t misuse it: no attempts to break or
        overload it, gain unauthorised access, or copy its content for a competing product. We try to keep the
        information here accurate, but it is a general description of the service, not a binding specification.
      </P>

      <H>Your account and your contracts</H>
      <P>
        Your organisation is responsible for who it gives access to, for keeping sign-in details secure, and for having
        the right to connect the Google Drive or SharePoint folders it connects. You keep all rights in your documents.
        We use them only to provide the service to you, as our <A href="/privacy">privacy notice</A> and your
        data-processing terms with us describe.
      </P>

      <H>AI-generated information</H>
      <P>
        MangoDocs uses AI to read your documents. Extracted terms, risk flags and answers can be wrong or incomplete,
        which is why each one shows its source so you can check it. They are not legal advice, and you remain
        responsible for decisions you make using them.
      </P>

      <H>Fees and payment</H>
      <P>
        Fees, the subscription period and the number of users are set out in your order form. Unless it says otherwise,
        fees are invoiced in advance, are payable within 30 days of the invoice date and exclude VAT. We may charge
        statutory interest on late payments and suspend the service if an invoice remains unpaid 30 days after we have
        reminded you.
      </P>

      <H>No refunds</H>
      <P>
        Fees are non-refundable, including for any part of a subscription period you don’t use, for users removed during
        a period, and if you stop using the service early. The only exceptions are where we end the service without you
        being at fault, in which case we refund fees you paid in advance for the period after it ends, or where the law
        requires a refund.
      </P>

      <H>Ending the service</H>
      <P>
        Your subscription runs for the period in your order form. Either of us may end it early if the other commits a
        material breach and doesn’t fix it within 30 days of being told. When the service ends, your access stops, and
        we delete the data we hold for your organisation 30 days later, except anything you have placed under a legal
        hold in the application or that we are required by law to keep. Your documents in your own Drive or SharePoint
        are not affected.
      </P>

      <H>Our intellectual property</H>
      <P>
        We own the MangoDocs software, website and brand. Your subscription gives your organisation the right to use the
        service for its own internal business purposes during the subscription. It doesn’t transfer ownership of
        anything to you.
      </P>

      <H>Confidentiality</H>
      <P>
        Each of us will keep the other’s confidential information confidential and use it only for the purposes of our
        relationship. That includes your documents and everything extracted from them.
      </P>

      <H>Liability</H>
      <P>
        Nothing in these terms limits liability for death or personal injury caused by negligence, for fraud, or for
        anything else the law doesn’t allow to be limited. Otherwise, neither of us is liable for indirect or
        consequential loss, or for loss of profits, revenue or goodwill. Our total liability in any 12-month period is
        limited to the fees you paid for the service in the 12 months before the claim arose.
      </P>

      <H>Changes to these terms</H>
      <P>
        We may update these terms. If a change materially affects a current subscription, we’ll tell you at least 30
        days before it applies. The date at the top of this page shows when they last changed.
      </P>

      <H>Law and disputes</H>
      <P>
        These terms are governed by the law of England and Wales, and the courts of England and Wales have exclusive
        jurisdiction over any dispute about them.
      </P>

      <H>Contact</H>
      <P>
        Questions about these terms: <Mail />.
      </P>
    </LegalPage>
  )
}
