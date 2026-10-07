import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

const contactLinkClass =
  "text-white transition-colors duration-200 hover:text-[#ddbc69]";

function PolicyShell({
  title,
  description,
  children,
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* ======================================================
          HERO
      ====================================================== */}
      <section className="relative overflow-hidden border-b border-white/[0.08]">
        {/* Gold ambient glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-1/2
            top-[-340px]
            h-[660px]
            w-[900px]
            -translate-x-1/2
            rounded-full
            bg-[#ddbc69]/[0.08]
            blur-[150px]
          "
        />

        {/* Fine grid */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            opacity-40
            bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)]
            bg-[size:64px_64px]
            [mask-image:linear-gradient(to_bottom,black,transparent)]
          "
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-[104px] sm:px-6 sm:pb-10 sm:pt-[112px] lg:px-8 lg:pb-12 lg:pt-[118px]">
          <div>
            {/* Main hero copy */}
            <div>
              <h1
                className="
                  max-w-4xl
                  text-[29px]
                  lg:text-[38px]
                  font-medium
                  leading-[1.15]
                  tracking-[-0.025em]
                  text-[#ddbc69]
                  font-playfair-display
                "
              >
                {title}
              </h1>

              {description ? (
                <p className="mt-4 max-w-2xl text-base leading-7 text-white sm:text-lg sm:leading-8">
                  {description}
                </p>
              ) : null}
            </div>

          </div>

        </div>
      </section>

      {/* ======================================================
          CONTENT
      ====================================================== */}
      <div className="relative mx-auto max-w-7xl px-4 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-6 lg:px-8 lg:pb-20 lg:pt-6">
        {children}
      </div>
    </main>
  );
}

function PolicySection({ number, title, children }) {
  return (
    <section
      id={`policy-section-${number}`}
      className="
        group
        relative
        grid
        scroll-mt-28
        grid-cols-[34px_minmax(0,1fr)]
        gap-x-4
        sm:grid-cols-[54px_minmax(0,1fr)]
        sm:gap-x-6
        lg:grid-cols-[120px_1px_minmax(0,1fr)]
        lg:gap-x-10
      "
    >
      {/* =========================================
          NUMBER
      ========================================= */}
      <div className="relative">
        <span
          className="
            sticky top-28
            block
            text-[13px]
            font-semibold
            tracking-[0.14em]
            text-[#ddbc69]

            lg:text-[44px]
            lg:font-light
            lg:leading-none
            lg:tracking-[-0.05em]
            lg:text-[#ddbc69]/35
          "
        >
          {String(number).padStart(2, "0")}
        </span>
      </div>

      {/* =========================================
          VERTICAL SPINE
      ========================================= */}
      <div
        aria-hidden="true"
        className="
          absolute
          left-[33px]
          top-0
          h-full
          w-px
          bg-gradient-to-b
          from-[#ddbc69]/70
          via-[#ddbc69]/20
          to-white/[0.06]

          sm:left-[53px]

          lg:static
          lg:block
          lg:h-full
        "
      />

      {/* =========================================
          CONTENT
      ========================================= */}
      <div className="relative pb-14 pl-2 sm:pb-16 sm:pl-3 lg:pb-24 lg:pl-0">
        {/* Gold timeline node */}
        <span
          aria-hidden="true"
          className="
            absolute
            -left-[21px]
            top-[7px]
            h-2.5
            w-2.5
            rounded-full
            border-2
            border-[#050505]
            bg-[#ddbc69]

            sm:-left-[29px]

            lg:-left-[46px]
            lg:top-[10px]
          "
        />

        <header className="mb-6 sm:mb-7">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.22em] text-white">
            Section {String(number).padStart(2, "0")}
          </span>

          <h2
            className="
              max-w-3xl
              text-[clamp(1.45rem,3vw,2.25rem)]
              font-medium
              leading-[1.15]
              tracking-[-0.03em]
              text-[#ddbc69]
            "
          >
            {title}
          </h2>

          <div className="mt-5 h-px w-12 bg-[#ddbc69]/80 transition-all duration-500 group-hover:w-24" />
        </header>

        <div
          className="
            max-w-3xl
            space-y-5
            text-[15px]
            leading-7
            text-white

            sm:text-base
            sm:leading-8

            [&_a]:text-[#ddbc69]
            [&_strong]:font-semibold
            [&_strong]:text-white
          "
        >
          {children}
        </div>
      </div>
    </section>
  );
}

function PolicyList({ children }) {
  return (
    <ul
      className="
        my-6
        grid
        gap-3

        [&>li]:relative
        [&>li]:pl-7
        [&>li]:text-white

        [&>li]:before:absolute
        [&>li]:before:left-0
        [&>li]:before:top-[0.7rem]
        [&>li]:before:h-[7px]
        [&>li]:before:w-[7px]
        [&>li]:before:rotate-45
        [&>li]:before:bg-[#ddbc69]
      "
    >
      {children}
    </ul>
  );
}

function ContactDetails({ label = "Call" }) {
  return (
    <address className="mt-6 grid gap-3 not-italic md:grid-cols-2">
      {/* Email */}
      <a
        href="mailto:info@bookmyassets.com"
        className="
          group flex items-start gap-4 rounded-2xl
          border border-white/[0.07]
          bg-black/20
          p-4
          transition-all duration-200
          hover:border-[#ddbc69]/25
          hover:bg-[#ddbc69]/[0.035]
        "
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.045]">
          <Mail size={17} strokeWidth={1.7} className="text-[#ddbc69]" />
        </div>

        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
            Email
          </span>

          <span className={`${contactLinkClass} mt-1 block break-all text-sm`}>
            info@bookmyassets.com
          </span>
        </div>
      </a>

      {/* Phone */}
      <a
        href="tel:+918130371647"
        className="
          group flex items-start gap-4 rounded-2xl
          border border-white/[0.07]
          bg-black/20
          p-4
          transition-all duration-200
          hover:border-[#ddbc69]/25
          hover:bg-[#ddbc69]/[0.035]
        "
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.045]">
          <Phone size={17} strokeWidth={1.7} className="text-[#ddbc69]" />
        </div>

        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
            {label}
          </span>

          <span className={`${contactLinkClass} mt-1 block text-sm`}>
            +91 81 30 37 16 47
          </span>
        </div>
      </a>

      {/* Address */}
      <div
        className="
          flex items-start gap-4 rounded-2xl
          border border-white/[0.07]
          bg-black/20
          p-4
          md:col-span-2
        "
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.045]">
          <MapPin size={17} strokeWidth={1.7} className="text-[#ddbc69]" />
        </div>

        <div>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
            Office
          </span>

          <span className="mt-1 block max-w-xl text-sm leading-6 text-white/65">
            620, 6th Floor, JMD Megapolis, Sector 48, Gurugram, Haryana 122018
          </span>
        </div>
      </div>
    </address>
  );
}

function TermsIntroduction() {
  return (
    <section className="mb-16 border-y border-white/[0.08] py-9 sm:mb-20 sm:py-12 lg:mb-28">
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
            Before you continue
          </span>
        </div>

        <div className="max-w-4xl">
          <p
            className="
              text-[25px]
              lg:text-[36px]
              font-medium
              leading-[1.3]
              tracking-[-0.035em]
              text-[#ddbc69]
              font-playfair-display
            "
          >
            Clear terms help define how BookMyAssets and its users interact.
          </p>

          <div className="mt-7 max-w-3xl space-y-4 text-[15px] leading-7 text-white sm:text-base sm:leading-8">
            <p>
              Welcome to BookMyAssets. These Terms and Conditions govern your
              access to and use of our website, services, content, and features.
            </p>

            <p>
              By using the BookMyAssets website, you agree to these Terms and
              Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TermsPolicyContent() {
  return (
    <PolicyShell
      title="Terms & Conditions"
      eyebrow="Terms of Use"
      description="The rules, responsibilities, and conditions that apply when you use BookMyAssets."
      lastUpdated="08 August 2026"
    >

      <TermsIntroduction />

      <div>
        <PolicySection number="1" title="About These Terms">
          <p>
            BookMyAssets and its affiliates may update these Terms from time to
            time.
          </p>

          <p>
            When changes are made, the updated version will be posted on the
            website along with the revised &quot;Last Updated&quot; date.
          </p>

          <p>
            Your continued use of the website after an update means that you
            accept the revised Terms. We recommend reviewing these Terms
            periodically.
          </p>

          <p>
            If you are using BookMyAssets on behalf of a company, organization,
            or other entity, you confirm that you have the authority to accept
            these Terms on its behalf.
          </p>
        </PolicySection>

        <PolicySection number="2" title="Intellectual Property">
          <p>
            All content available on the BookMyAssets website, including its
            design, layout, text, graphics, logos, features, and overall
            appearance, is owned by or licensed to BookMyAssets and is protected
            by applicable intellectual property laws.
          </p>

          <p>
            Unless you have received written permission from BookMyAssets, you
            may not:
          </p>

          <PolicyList>
            <li>Copy, reproduce, publish, or distribute website content.</li>

            <li>Sell or license any part of the website.</li>

            <li>
              Modify, translate, or create derivative works from our content.
            </li>

            <li>Publicly display or commercially use our website content.</li>
          </PolicyList>

          <p>
            All rights not expressly granted under these Terms remain with
            BookMyAssets.
          </p>
        </PolicySection>

        <PolicySection number="3" title="Age Requirement">
          <p>You must be at least 18 years old to use BookMyAssets.</p>

          <p>
            By using the website, you confirm that you are 18 years of age or
            older and are legally able to agree to these Terms.
          </p>

          <p>
            If we believe that a user is under 18 or is not legally able to
            enter into this agreement, we may suspend or terminate their access
            and remove any related content or information.
          </p>
        </PolicySection>

        <PolicySection number="4" title="Changes to the Website and Services">
          <p>
            BookMyAssets may update, modify, suspend, or discontinue any part of
            the website, service, feature, or functionality at any time.
          </p>

          <p>
            Certain features may be added, removed, or changed without prior
            notice.
          </p>

          <p>
            We may also restrict or terminate access to the website where
            necessary, including in cases of misuse, violation of these Terms,
            security concerns, or legal requirements.
          </p>
        </PolicySection>

        <PolicySection number="5" title="Acceptable Use">
          <p>
            You agree to use BookMyAssets only for lawful and appropriate
            purposes.
          </p>

          <p>You must not use the website or its content to:</p>

          <PolicyList>
            <li>Violate any applicable law or regulation.</li>

            <li>
              Harm, threaten, harass, defame, or mislead another person or
              organization.
            </li>

            <li>
              Interfere with the security or proper operation of the website.
            </li>

            <li>
              Attempt to gain unauthorized access to BookMyAssets systems or
              data.
            </li>

            <li>
              Use the website in any way that may damage BookMyAssets, its
              users, or third parties.
            </li>
          </PolicyList>
        </PolicySection>

        <PolicySection number="6" title="Use of the Website at Your Own Risk">
          <p>Your use of BookMyAssets is at your own risk.</p>

          <p>
            Unless specifically stated otherwise, the website, its content,
            third-party content, products, and services are provided on an
            &quot;as is&quot; and &quot;as available&quot; basis.
          </p>

          <p>
            BookMyAssets does not guarantee that the website will always be
            available, uninterrupted, error-free, secure, or suitable for every
            purpose.
          </p>
        </PolicySection>

        <PolicySection number="7" title="Suspension or Termination">
          <p>
            BookMyAssets may suspend, restrict, or terminate your access to the
            website if you violate these Terms, misuse the platform, create
            security or legal risks, or where we are otherwise permitted to do
            so by law.
          </p>

          <p>
            Where appropriate, we may also remove content or information
            associated with your use of the website.
          </p>
        </PolicySection>

        <PolicySection number="8" title="Contact Us">
          <p>
            If you have questions about these Terms and Conditions, you can
            contact BookMyAssets at:
          </p>

          <ContactDetails />
        </PolicySection>
      </div>
    </PolicyShell>
  );
}

function PrivacyIntroduction() {
  return (
    <section className="mb-16 border-y border-white/[0.08] py-9 sm:mb-20 sm:py-12 lg:mb-28">
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <div>
          <span className="text-[12px] font-semibold uppercase tracking-[0.24em] text-white">
            Our commitment
          </span>
        </div>

        <div className="max-w-4xl">
          <p
            className="
              text-[25px]
              lg:text-[36px]
              font-medium
              leading-[1.3]
              tracking-[-0.035em]
              text-[#ddbc69]
              font-playfair-display
            "
          >
            We believe understanding how your information is handled should be
            simple.
          </p>

          <div className="mt-7 max-w-3xl space-y-4 text-[15px] leading-7 text-white sm:text-base sm:leading-8">
            <p>
              At BookMyAssets, we respect your privacy and are committed to
              protecting your personal information.
            </p>

            <p>
              This Privacy Policy explains what information we collect, how we
              use it, and how we protect it when you use our website and
              services.
            </p>

            <p>
              By using BookMyAssets or creating an account, you agree to this
              Privacy Policy and our Terms and Conditions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PrivacyPolicyContent() {
  return (
    <PolicyShell
      title="Privacy Policy"
      description="Your information. Clearly explained."
    >

      <PrivacyIntroduction />

      <PolicySection number="1" title="Information We Collect">
        <p>
          We may collect information that you provide directly to us, such as:
        </p>
        <PolicyList>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Information submitted through forms or inquiries</li>
          <li>Any other information you choose to provide</li>
        </PolicyList>
        <p>
          You may choose not to provide optional information. However, some
          information may be required to access certain services or features.
        </p>
        <p>
          We may also automatically collect limited technical information, such
          as:
        </p>
        <PolicyList>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device information</li>
          <li>Website usage data</li>
          <li>Cookies and similar technologies</li>
        </PolicyList>
      </PolicySection>

      <PolicySection number="2" title="How We Use Your Information">
        <p>We may use your information to:</p>
        <PolicyList>
          <li>Create and manage your account.</li>
          <li>Provide and improve our services.</li>
          <li>Respond to your questions, requests, or inquiries.</li>
          <li>Communicate with you about your account or our services.</li>
          <li>Improve the performance and user experience of our website.</li>
          <li>Maintain the security of our website and services.</li>
          <li>Meet legal or regulatory requirements.</li>
        </PolicyList>
      </PolicySection>

      <PolicySection number="3" title="Cookies">
        <p>
          BookMyAssets may use cookies and similar technologies to improve your
          browsing experience and understand how our website is used.
        </p>
        <p>
          You can choose to accept, block, or delete cookies through your
          browser settings.
        </p>
        <p>
          Please note that disabling certain cookies may affect how some parts
          of the website function.
        </p>
      </PolicySection>

      <PolicySection number="4" title="Sharing Your Information">
        <p>
          We do not sell or unnecessarily share your personal information with
          third parties.
        </p>
        <p>We may share limited information when required to:</p>
        <PolicyList>
          <li>Provide our services through trusted service providers.</li>
          <li>Operate or improve our website.</li>
          <li>Comply with legal or regulatory obligations.</li>
          <li>
            Protect the rights, safety, and security of BookMyAssets, our users,
            or others.
          </li>
        </PolicyList>
        <p>
          We may also share anonymous or aggregated information that does not
          directly identify you.
        </p>
      </PolicySection>

      <PolicySection number="5" title="Communication">
        <p>
          If you create an account, submit a form, contact us, or request
          information, we may communicate with you through:
        </p>
        <PolicyList>
          <li>Email</li>
          <li>Phone calls</li>
          <li>SMS or text messages</li>
          <li>Mail</li>
          <li>Other communication methods you have provided</li>
        </PolicyList>
        <p>
          Where required, we will obtain your consent before sending promotional
          communications.
        </p>
        <p>
          You may opt out of marketing communications at any time using the
          available unsubscribe or opt-out options.
        </p>
      </PolicySection>

      <PolicySection number="6" title="Account Information and Security">
        <p>
          Some features of BookMyAssets may require you to create an account and
          password.
        </p>
        <p>You are responsible for:</p>
        <PolicyList>
          <li>Providing accurate and up-to-date information.</li>
          <li>Keeping your login details confidential.</li>
          <li>
            Protecting your password and account from unauthorized access.
          </li>
          <li>
            Informing us if you believe your account has been compromised.
          </li>
        </PolicyList>
        <p>
          You are responsible for activities performed through your account
          unless caused by circumstances outside your reasonable control.
        </p>
        <p>
          BookMyAssets takes reasonable measures to protect your personal
          information from unauthorized access, misuse, loss, or disclosure.
        </p>
        <p>However, no online system can guarantee complete security.</p>
      </PolicySection>

      <PolicySection number="7" title="Third-Party Content and Links">
        <p>
          Our website may contain advertisements, content, services, or links
          provided by third parties.
        </p>
        <p>
          The presence of third-party content does not mean that BookMyAssets
          endorses or approves that third party, its products, or its services.
        </p>
        <p>
          BookMyAssets is not responsible for the accuracy, availability,
          security, or privacy practices of third-party websites or services.
        </p>
        <p>
          If you visit a third-party website through a link on BookMyAssets,
          their own terms and privacy policies will apply.
        </p>
        <p>
          We recommend reviewing their policies before providing any personal
          information.
        </p>
      </PolicySection>

      <PolicySection number="8" title="Your Responsibilities">
        <p>
          You must not misuse the website, another user&apos;s information, or
          any content available through BookMyAssets.
        </p>
        <p>
          You are responsible for ensuring that your use of the website complies
          with applicable laws, including privacy, copyright, trademark, and
          other relevant laws.
        </p>
      </PolicySection>

      <PolicySection number="9" title="Data Protection">
        <p>
          We take reasonable administrative, technical, and security measures to
          protect the information we collect.
        </p>
        <p>
          Access to personal information is limited to authorized persons and
          service providers who require it for legitimate business purposes.
        </p>
      </PolicySection>

      <PolicySection number="10" title="Changes to This Privacy Policy">
        <p>We may update this Privacy Policy from time to time.</p>
        <p>
          When changes are made, we will publish the updated version on this
          page and revise the &quot;Last Updated&quot; date.
        </p>
        <p>We encourage you to review this Privacy Policy periodically.</p>
      </PolicySection>

      <PolicySection number="11" title="Contact Us">
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy or your personal information, please contact us at:
        </p>
        <ContactDetails />
      </PolicySection>
    </PolicyShell>
  );
}

function CopyrightIntroduction() {
  return (
    <section className="mb-16 border-y border-white/[0.08] py-9 sm:mb-20 sm:py-12 lg:mb-28">
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white">
            Intellectual property
          </span>
        </div>

        <div className="max-w-4xl">
          <p
            className="
              text-[25px]
              lg:text-[36px]
              font-medium
              leading-[1.3]
              tracking-[-0.035em]
              text-[#ddbc69]
              font-playfair-display
            "
          >
            Original work deserves clear ownership and responsible use.
          </p>

          <div className="mt-7 max-w-3xl space-y-4 text-[15px] leading-7 text-white sm:text-base sm:leading-8">
            <p>
              BookMyAssets respects intellectual property rights and expects its
              users to do the same.
            </p>

            <p>
              This Copyright Policy explains how content available through our
              website and services is protected and how copyright owners can
              report possible infringement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CopyrightPolicyContent() {
  return (
    <PolicyShell
      title="Copyright Policy"
      eyebrow="Intellectual Property"
      description="How BookMyAssets protects intellectual property, defines content usage, and handles copyright infringement concerns."
      lastUpdated="08 August 2026"
    >

      <CopyrightIntroduction />

      <div>
        <PolicySection number="1" title="Ownership of Content">
          <p>
            Unless otherwise stated, the content available on BookMyAssets,
            including:
          </p>

          <PolicyList>
            <li>Text</li>
            <li>Graphics</li>
            <li>Logos</li>
            <li>Images</li>
            <li>Icons</li>
            <li>Videos and media</li>
            <li>Downloads</li>
            <li>Data compilations</li>
            <li>Software</li>
            <li>Website design and layout</li>
          </PolicyList>

          <p>
            is owned by, licensed to, or legally used by BookMyAssets, its
            affiliates, users, or content providers.
          </p>

          <p>
            This content is protected by applicable copyright, trademark, and
            intellectual property laws.
          </p>

          <p>
            Third-party trademarks, logos, and brand names appearing on
            BookMyAssets remain the property of their respective owners. Their
            appearance on our platform does not necessarily mean that they are
            affiliated with or endorsed by BookMyAssets.
          </p>
        </PolicySection>

        <PolicySection number="2" title="Restrictions on Use">
          <p>
            You may not copy, reproduce, publish, distribute, sell, license,
            modify, translate, publicly display, or create derivative works from
            BookMyAssets content without prior written permission from
            BookMyAssets or the relevant rights owner.
          </p>

          <p>
            You must also not upload, publish, distribute, or use copyrighted
            material, trademarks, or other protected content belonging to
            another person without proper authorization.
          </p>

          <p>
            All rights not specifically granted to users remain reserved.
          </p>
        </PolicySection>

        <PolicySection number="3" title="Reporting Copyright Infringement">
          <p>
            If you believe that content available on BookMyAssets infringes your
            copyright, please send us a copyright infringement notice
            containing:
          </p>

          <PolicyList>
            <li>Your name and contact information.</li>

            <li>
              A description of the copyrighted work you believe has been
              infringed.
            </li>

            <li>
              A description or link showing where the allegedly infringing
              content appears on BookMyAssets.
            </li>

            <li>
              A statement that you believe, in good faith, that the use of the
              material is not authorized by the copyright owner, its agent, or
              applicable law.
            </li>

            <li>
              A statement confirming that the information in your notice is
              accurate and that you are the copyright owner or are authorized to
              act on the owner&apos;s behalf.
            </li>

            <li>Your physical or electronic signature.</li>
          </PolicyList>

          <p>Please send copyright infringement notices to:</p>

          <div className="mt-6 border-y border-[#ddbc69]/25">
            <a
              href="mailto:info@bookmyassets.com"
              className="
                group
                flex
                items-center
                justify-between
                gap-4
                border-b
                border-white/[0.08]
                py-5
              "
            >
              <div>
                <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                  Email
                </span>

                <span className="mt-1 block break-all text-sm text-white sm:text-base">
                  info@bookmyassets.com
                </span>
              </div>

              <span className="text-[#ddbc69]">↗</span>
            </a>

            <div className="py-5">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.2em] text-white">
                Address
              </span>

              <span className="mt-1 block max-w-2xl text-sm leading-6 text-white sm:text-base">
                620, 6th Floor, JMD Megapolis, Sector 48, Gurugram, Haryana
                122018
              </span>
            </div>
          </div>
        </PolicySection>

        <PolicySection number="4" title="Removal of Infringing Content">
          <p>
            BookMyAssets may review copyright infringement complaints and,
            where appropriate, remove or restrict access to content that appears
            to violate intellectual property rights.
          </p>

          <p>
            We may also suspend or terminate accounts that repeatedly upload or
            use infringing content.
          </p>
        </PolicySection>

        <PolicySection number="5" title="User Responsibility">
          <p>
            You are responsible for the content you upload, publish, share, or
            otherwise make available through BookMyAssets.
          </p>

          <p>
            By submitting content, you confirm that you own the necessary rights
            or have permission to use and share that content.
          </p>

          <p>
            Unauthorized use of copyrighted works, trademarks, personal
            information, or other protected material may violate applicable
            laws and may result in removal of the content or restriction of your
            account.
          </p>
        </PolicySection>

        <PolicySection
          number="6"
          title="Protection of BookMyAssets Intellectual Property"
        >
          <p>
            BookMyAssets reserves the right to protect and enforce its
            intellectual property rights where necessary.
          </p>

          <p>
            Unauthorized use of our name, branding, content, software, website
            design, or other protected materials may result in legal action.
          </p>
        </PolicySection>
      </div>
    </PolicyShell>
  );
}

function RefundIntroduction() {
  return (
    <section className="mb-16 border-b border-white/[0.08] pb-9 sm:mb-20 sm:pb-12 lg:mb-28">
      <div>

        <div className="max-w-4xl">
          <p
            className="
              text-[25px]
              lg:text-[36px]
              font-medium
              leading-[1.3]
              tracking-[-0.035em]
              text-[#ddbc69]
              font-playfair-display
            "
          >
            Clear booking terms help you understand payments, cancellations,
            refunds, and additional charges.
          </p>

          <div className="mt-7 max-w-3xl space-y-4 text-[15px] leading-7 text-white sm:text-base sm:leading-8">
            <p>
              This Refund & Cancellation Policy explains the cancellation,
              refund, payment, and additional charge terms applicable to
              bookings made with BookMyAssets.
            </p>

            <p>
              Please review these terms carefully before completing your
              booking or property transaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RefundCancellationPolicyContent() {
  return (
    <PolicyShell
      title="Refund & Cancellation Policy"
      eyebrow="Payments & Bookings"
      description="Booking amounts, cancellation timelines, refunds, payment obligations, and applicable property charges."
    >

      <RefundIntroduction />

      <div>
        <PolicySection number="1" title="Booking Amount">
          <p>
            The standard booking amount is <strong>₹50,000</strong>.
          </p>

          <p>
            BookMyAssets may revise the booking amount from time to time. The
            amount applicable at the time of booking will apply to the customer.
          </p>
        </PolicySection>

        <PolicySection number="2" title="Cancellation & Refund">
          <p>
            Customers may request cancellation and apply for a refund within{" "}
            <strong>15 days of booking</strong>, subject to the applicable
            booking terms.
          </p>

          <p>
            Once a refund is approved and initiated, the refundable amount will
            generally be credited within <strong>24 hours</strong>.
          </p>

          <p>
            Refund processing timelines may vary depending on the payment
            method, banking partner, or other operational factors.
          </p>
        </PolicySection>

        <PolicySection
          number="3"
          title="Property Pricing & Additional Charges"
        >
          <p>
            Plot prices and other applicable charges may vary depending on the
            property, location, availability, and applicable terms.
          </p>

          <p>
            The final price and applicable charges will be communicated to the
            buyer before completion of the transaction.
          </p>
        </PolicySection>

        <PolicySection number="4" title="Maintenance Charges">
          <p>
            Maintenance charges are payable as communicated at the time of
            booking or purchase.
          </p>

          <p>
            Once paid, maintenance charges are non-refundable, unless otherwise
            required by applicable law.
          </p>
        </PolicySection>

        <PolicySection number="5" title="Preferred Location Charge (PLC)">
          <p>
            A Preferred Location Charge (PLC) may apply to selected plots or
            properties based on factors such as location, facing,
            accessibility, or other preferences.
          </p>

          <p>
            Where applicable, the PLC will be added to the total property cost.
          </p>
        </PolicySection>

        <PolicySection number="6" title="Payment Timeline">
          <p>
            Buyers are required to complete the full payment within{" "}
            <strong>30 days from the date of booking</strong>, unless a
            different payment schedule has been agreed to in writing.
          </p>

          <p>
            Failure to complete payment within the applicable period may result
            in cancellation or other action in accordance with the booking
            terms.
          </p>
        </PolicySection>

        <PolicySection number="7" title="Stamp Duty">
          <p>
            Stamp duty and registration-related government charges will be
            payable as per the rates applicable under the laws and regulations
            of the Government of Gujarat at the time of the transaction.
          </p>

          <p>At present, the stated stamp duty rates are:</p>

          <PolicyList>
            <li>
              Female buyers: <strong>4.90%</strong>
            </li>

            <li>
              Male buyers: <strong>5.90%</strong>
            </li>
          </PolicyList>

          <p>
            These rates may change based on government rules, notifications,
            concessions, or amendments. The rate applicable on the date of
            registration will apply.
          </p>
        </PolicySection>

        <PolicySection number="8" title="Goods and Services Tax (GST)">
          <p>
            GST, where applicable, will be charged according to the prevailing
            rates and regulations issued by the Government of India.
          </p>

          <p>
            Any change in applicable GST rates or rules may affect the final
            amount payable.
          </p>
        </PolicySection>

        <PolicySection number="9" title="Legal & Documentation Charges">
          <p>Legal fees may include charges related to:</p>

          <PolicyList>
            <li>Property documentation</li>
            <li>Agreement preparation</li>
            <li>Registration assistance</li>

            <li>
              Other legal or administrative services related to the transaction
            </li>
          </PolicyList>

          <p>
            Applicable charges will be communicated to the buyer as part of the
            transaction.
          </p>
        </PolicySection>

        <PolicySection number="10" title="Contact Us">
          <p>
            For cancellation requests, refund-related queries, or any
            clarification regarding this policy, please contact us:
          </p>

          <ContactDetails label="Phone" />
        </PolicySection>
      </div>
    </PolicyShell>
  );
}
