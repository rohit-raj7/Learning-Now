import Social from './Social';
import Subscriber from './Subscribe';

const PrivacyPolicy = () => {
  return (
    <>
      <div className="container mx-auto px-4 py-8 text-gray-200">
        <br />
        <hr />
        <br />
        <h1 className="text-3xl font-bold text-center mb-8 text-green-500">Privacy Policy</h1>
        <p className="text-sm text-center mb-4"><strong>Last Updated: [01/07/2025]</strong></p>

        <p className="mb-6">
          Welcome to our Education Portal <a href="https://online-learning-yet.vercel.app/" className="text-blue-400 underline">Online Learning</a>. Your privacy and security are very important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our platform where teachers can upload educational videos and students can enroll in courses after logging in using Google authentication only.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p>To provide our educational services, we collect the following types of information:</p>
          <ul className="list-disc pl-6">
            <li><strong>Personal Information:</strong> Name, email address, and profile details collected during user registration via Google Login.</li>
            <li><strong>Course Enrollment Data:</strong> Information related to courses students enroll in, including payment details if applicable (handled via Stripe or Supabase).</li>
            <li><strong>Uploaded Content:</strong> Teachers may upload videos and course materials which may contain personal or sensitive information.</li>
            <li><strong>Usage Data:</strong> Information about how you interact with the platform, such as login times, course progress, and feature usage.</li>
            <li><strong>Technical Data:</strong> IP address, device information, browser type, and cookies to improve user experience and security.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <p>We use your data to:</p>
          <ul className="list-disc pl-6">
            <li>Authenticate and manage your account securely using Google Login.</li>
            <li>Enable teachers to upload and manage course videos and materials.</li>
            <li>Facilitate student enrollment and payment processing via Stripe/Supabase.</li>
            <li>Provide personalized course recommendations and track progress.</li>
            <li>Enhance platform performance and user experience.</li>
            <li>Ensure security and prevent unauthorized access or fraud.</li>
            <li>Communicate important updates, notifications, and support.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Data Sharing and Third-Party Services</h2>
          <p>We use trusted third-party services to deliver our platform:</p>
          <ul className="list-disc pl-6">
            <li><strong>Google:</strong> For user authentication and identity management. We use Google OAuth to securely log users in.</li>
            <li><strong>Stripe/Supabase:</strong> For payment processing and backend database management.</li>
            <li>Analytics providers to understand user behavior and improve the platform.</li>
          </ul>
          <p>We do not sell or rent your personal data to third parties.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>We employ robust security measures to protect your data, including:</p>
          <ul className="list-disc pl-6">
            <li>SSL/TLS encryption for data transmission.</li>
            <li>Secure storage of personal and payment information.</li>
            <li>Regular security audits and vulnerability assessments.</li>
            <li>Access control policies limiting data to authorized personnel only.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6">
            <li>Access and update your personal information.</li>
            <li>Request deletion of your account and data.</li>
            <li>Opt-out of marketing communications.</li>
            <li>Review and control cookies and tracking preferences.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Cookies and Tracking Technologies</h2>
          <p>We use cookies to improve functionality, personalize content, and analyze usage. You can control cookie settings through your browser preferences.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Data Retention</h2>
          <p>We retain your personal data only as long as necessary to provide our services and comply with legal obligations. When data is no longer needed, it is securely deleted or anonymized.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. International Data Transfers</h2>
          <p>Your data may be processed or stored in servers located outside your country, in compliance with applicable data protection laws.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Updates to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We encourage you to review it regularly. For questions, please contact us at <strong>rohit.raj.career@gmail.com</strong>.</p>
        </section>

        <div className="flex justify-center align-middle flex-col items-start">
          <Social />
          <br />
          <Subscriber />
          <br />
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
