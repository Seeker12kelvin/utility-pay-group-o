import { useState } from "react";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdMailOutline, MdPhoneInTalk, MdAccessTime } from "react-icons/md";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SupportPage = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const faqs = [
    {
      id: 1,
      question: "How do I pay my utility bill?",
      answer:
        "You can pay your utility bill through our dashboard. Simply log in, navigate to the Pending Utilities section, and click 'Pay Now' on the bill you want to pay. Fill in your card details and confirm the payment. Your transaction will be processed instantly.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "Currently, we accept all major credit and debit cards including Visa, Mastercard, and American Express. We're working on adding more payment methods like digital wallets and bank transfers soon.",
    },
    {
      id: 3,
      question: "Can I schedule automatic payments?",
      answer:
        "Yes! You can set up automatic payments for your recurring utility bills. Enable auto-pay in your account settings, and we'll process your payments on the due date automatically.",
    },
    {
      id: 4,
      question: "How do I download my payment receipt?",
      answer:
        "All your payment receipts are available in your Transaction History. Click on any transaction to view details, and you'll have the option to download or email the receipt to yourself.",
    },
    {
      id: 5,
      question: "What should I do if I notice an incorrect charge?",
      answer:
        "If you see an incorrect charge, please contact our support team immediately. Go to the Support page, fill out the contact form, and select 'Billing Issue' as the subject. We'll investigate and resolve it within 24 hours.",
    },
    {
      id: 6,
      question: "How is my payment information secured?",
      answer:
        "Your payment information is encrypted with military-grade AES-256 security. We comply with PCI DSS standards and never store your full card details on our servers.",
    },
    {
      id: 7,
      question: "Can I update my billing address?",
      answer:
        "Yes, you can update your billing and account information in your profile settings. Log in, go to Account Settings, and update your information. Changes take effect immediately.",
    },
    {
      id: 8,
      question: "What are your business hours?",
      answer:
        "We provide 24/7 customer support via our chat system and email. Our dedicated support team responds to emails within 2 hours during business hours (9 AM - 6 PM EST, Monday-Friday).",
    },
  ];

  const helpTopics = [
    {
      icon: "💳",
      title: "Payment & Billing",
      description: "Learn about payments, billing, and invoices",
      topics: [
        "Pay a bill",
        "Update payment method",
        "Download receipt",
        "Payment history",
      ],
    },
    {
      icon: "👤",
      title: "Account Management",
      description: "Manage your account and profile",
      topics: [
        "Update profile",
        "Change password",
        "Account settings",
        "Delete account",
      ],
    },
    {
      icon: "🔒",
      title: "Security & Privacy",
      description: "Information about security and data privacy",
      topics: [
        "Data encryption",
        "Privacy policy",
        "Security guarantee",
        "Two-factor auth",
      ],
    },
    {
      icon: "🐛",
      title: "Technical Issues",
      description: "Troubleshoot common technical problems",
      topics: [
        "Login issues",
        "App not loading",
        "Payment failed",
        "Connection problems",
      ],
    },
  ];

  const toggleFAQ = (id) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name &&
      formData.email &&
      formData.subject &&
      formData.message
    ) {
      setSubmitMessage(
        "Thank you! Your message has been sent. We'll get back to you within 2 hours.",
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitMessage(""), 5000);
    }
  };

  return (
    <section className="w-full flex flex-col items-start justify-start gap-6 sm:gap-8 px-4 sm:px-8 md:px-12 lg:px-20 py-4 sm:py-8">
      <div className="w-full flex items-center gap-2 text-xs text-[#434654] mb-2 sm:mb-5 flex-wrap">
        <Link to="/dashboard" className="hidden sm:inline">
          Dashboard
        </Link>
        <MdNavigateNext className="hidden sm:block" />{" "}
        <span className="text-xs font-bold text-[#091C35]">Support</span>
      </div>

      {/* Header */}
      <div className="w-full">
        <h1 className="text-[#091C35] text-2xl sm:text-[32px] font-semibold tracking-[-0.32px]">
          How can we help?
        </h1>
        <p className="text-[#434654] font-normal text-sm sm:text-base">
          Get support from our team or explore answers to common questions.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="w-full flex gap-3 sm:gap-4 lg:gap-6 flex-wrap flex-col sm:flex-row">
        <div className="box flex-1 min-w-full sm:min-w-[250px] p-4 sm:p-6 rounded-lg bg-white border border-[#DFE8FF]">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="size-10 sm:size-12 flex items-center justify-center rounded-lg bg-[#E7EEFF] flex-shrink-0">
              <MdMailOutline size={20} className="sm:size-24 text-[#003D9B]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#091C35]">
                Email Support
              </h3>
              <p className="text-xs sm:text-sm text-[#434654]">
                support@utilitypay.com
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#434654]">
            Response time: 2 hours during business hours
          </p>
        </div>

        <div className="box flex-1 min-w-full sm:min-w-[250px] p-4 sm:p-6 rounded-lg bg-white border border-[#DFE8FF]">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="size-10 sm:size-12 flex items-center justify-center rounded-lg bg-[#E7EEFF] flex-shrink-0">
              <MdPhoneInTalk size={20} className="sm:size-24 text-[#003D9B]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#091C35]">
                Phone Support
              </h3>
              <p className="text-xs sm:text-sm text-[#434654]">
                +1 (800) 123-4567
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#434654]">
            Mon-Fri, 9 AM - 6 PM EST
          </p>
        </div>

        <div className="box flex-1 min-w-full sm:min-w-[250px] p-4 sm:p-6 rounded-lg bg-white border border-[#DFE8FF]">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="size-10 sm:size-12 flex items-center justify-center rounded-lg bg-[#E7EEFF] flex-shrink-0">
              <MdAccessTime size={20} className="sm:size-24 text-[#003D9B]" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[#091C35]">
                Live Chat
              </h3>
              <p className="text-xs sm:text-sm text-[#434654]">
                Chat with us instantly
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-[#434654]">Available 24/7</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-2xl">
        <div className="box bg-white rounded-lg p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#091C35] mb-4 sm:mb-6">
            Send us a message
          </h2>

          {submitMessage && (
            <div className="w-full bg-[#82F9BE] border border-green-500 text-green-700 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-4 sm:mb-6 text-xs sm:text-sm">
              {submitMessage}
            </div>
          )}

          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col gap-4 sm:gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-semibold text-[#434654]">
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="John Doe"
                  className="border border-[#C3C6D6] rounded-lg px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-[#003D9B] placeholder:text-[#6B7280] text-sm"
                  required
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs sm:text-sm font-semibold text-[#434654]">
                  Email Address
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="john@example.com"
                  className="border border-[#C3C6D6] rounded-lg px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-[#003D9B] placeholder:text-[#6B7280] text-sm"
                  required
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-xs sm:text-sm font-semibold text-[#434654]">
                Subject
              </span>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                className="border border-[#C3C6D6] rounded-lg px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-[#003D9B] text-[#434654] text-sm"
                required
              >
                <option value="">Select a subject</option>
                <option value="Billing Issue">Billing Issue</option>
                <option value="Payment Problem">Payment Problem</option>
                <option value="Account Issue">Account Issue</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Feature Request">Feature Request</option>
                <option value="Other">Other</option>
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs sm:text-sm font-semibold text-[#434654]">
                Message
              </span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Please describe your issue or question in detail..."
                rows="5"
                className="border border-[#C3C6D6] rounded-lg px-3 sm:px-4 py-2 sm:py-3 outline-none focus:border-[#003D9B] placeholder:text-[#6B7280] resize-none text-sm"
                required
              />
            </label>

            <button
              type="submit"
              className="bg-[#003D9B] text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-[#002a7a] transition-colors text-sm sm:text-base"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Help Topics */}
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#091C35] mb-4 sm:mb-6">
          Help Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {helpTopics.map((topic) => (
            <div
              key={topic.title}
              className="box bg-white rounded-lg p-4 sm:p-6 border border-[#DFE8FF]"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                {topic.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-[#091C35] mb-2">
                {topic.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#434654] mb-3 sm:mb-4">
                {topic.description}
              </p>
              <ul className="space-y-1 sm:space-y-2">
                {topic.topics.map((t) => (
                  <li
                    key={t}
                    className="text-xs sm:text-sm text-[#003D9B] font-medium hover:underline cursor-pointer"
                  >
                    • {t}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full">
        <h2 className="text-xl sm:text-2xl font-semibold text-[#091C35] mb-4 sm:mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-2 sm:space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="box bg-white rounded-lg border border-[#DFE8FF] overflow-hidden hover:border-[#003D9B] transition-colors"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-3 sm:p-6 hover:bg-[#F9F9FF] transition-colors gap-3"
              >
                <h3 className="text-sm sm:text-lg font-semibold text-[#091C35] text-left">
                  {faq.question}
                </h3>
                <div className="text-[#003D9B] flex-shrink-0 text-lg sm:text-xl">
                  {expandedFAQ === faq.id ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              </button>

              {expandedFAQ === faq.id && (
                <div className="px-3 sm:px-6 pb-3 sm:pb-6 text-[#434654] border-t border-[#DFE8FF]">
                  <p className="mt-2 sm:mt-4 leading-relaxed text-sm">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional Help */}
      <div className="w-full bg-gradient-to-r from-[#E7EEFF] to-[#DFE8FF] rounded-lg p-4 sm:p-6 lg:p-8 text-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#091C35] mb-2 sm:mb-3">
          Didn't find what you're looking for?
        </h3>
        <p className="text-[#434654] mb-4 sm:mb-6 text-sm sm:text-base">
          Our support team is here to help. Reach out to us and we'll get back
          to you as soon as possible.
        </p>
        <button
          onClick={() =>
            document
              .querySelector("form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-[#003D9B] text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-lg hover:bg-[#002a7a] transition-colors text-sm sm:text-base"
        >
          Contact Support
        </button>
      </div>
    </section>
  );
};

export default SupportPage;
