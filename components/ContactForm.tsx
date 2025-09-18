const ContactForm = () => {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-md mb-16 w-[70%] flex flex-col items-center">
            <form className="w-full">
                <div className="grid md:grid-cols-2 gap-6 w-full mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                        </label>
                        <input
                        type="text"
                        placeholder="Enter your first name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                        </label>
                        <input
                        type="text"
                        placeholder="Enter your last name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                        </label>
                        <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                        </label>
                        <input
                        type="tel"
                        placeholder="+234 801 234 5678"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                        />
                    </div> 
                </div>       

                <div className="col-span-2 mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    School Name
                    </label>
                    <input
                    type="text"
                    placeholder="Enter your school name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                </div>

                <div className="cols-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                    </label>
                    <textarea
                    placeholder="Tell us how we can help you..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                    ></textarea>
                </div>
            </form>
            
            <div className="mt-8 text-center w-full">
                <button className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-xl text-lg transition duration-200 w-full cursor-pointer">
                SEND MESSAGE
                </button>
            </div>
        </div>
    );
};

export default ContactForm;