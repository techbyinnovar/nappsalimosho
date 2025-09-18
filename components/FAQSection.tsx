const FAQSection = () => {
    const faqs = [
        {
        question: "How can I become a NAPPS member?",
        answer: "You can apply for membership through our registration portal. Our team will review your application and contact you within 5 working days."
        },
        {
        question: "What services does NAPPS provide?",
        answer: "We offer advocacy, professional development, networking opportunities, conferences, and resources to support private school proprietors nationwide."
        },
        {
        question: "How often are conferences held?",
        answer: "We host an annual national conference and several regional events throughout the year. Check our Events page for upcoming events and programme dates."
        }
    ];

    return (
        <div className="bg-gray-50 p-8 rounded-lg py-20">
            <h2 className="text-2xl md:text-5xl font-medium text-center mb-2 text-green-800">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-lg text-center mb-8">Quick answers to common questions.</p>
            
            <div className="space-y-6 max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold mb-2 text-green-700">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                </div>
                ))}
            </div>
        </div>
    );
};

export default FAQSection;