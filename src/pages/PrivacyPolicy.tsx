import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-12"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-indigo max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p>
              This Privacy Policy explains how we collect, use, and protect your personal information
              when you use our website. We are committed to ensuring your privacy is protected in
              accordance with GDPR and other applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Payment information</li>
              <li>Order history</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Process your orders and payments</li>
              <li>Communicate with you about your orders</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Your Rights</h2>
            <p>Under GDPR, you have the following rights:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Right to access your personal data</li>
              <li>Right to rectification of incorrect data</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies</h2>
            <p>
              We use cookies to enhance your browsing experience. You can control cookies through
              your browser settings. For more information about the cookies we use, please see our
              Cookie Policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or would like to exercise your
              data protection rights, please contact us at:
            </p>
            <div className="mt-2">
              <p>Email: privacy@example.com</p>
              <p>Address: 123 Privacy Street, Data City, 12345</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The latest version will always
              be available on our website. Last updated: {new Date().toLocaleDateString()}
            </p>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy; 