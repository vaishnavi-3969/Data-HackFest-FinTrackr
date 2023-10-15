import React from 'react';

function Contact() {
  return (
    <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:bg-gray-800 dark:text-gray-100">
      <div className="flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold leading-lg text-5xl">Get In Touch With Us!</h2>
          <div className="dark:text-gray-400">Have Questions? Ask Us</div>
        </div>
        <img src={process.env.PUBLIC_URL + '/Contact.png'} alt="" className="p-6 w:full md:w-auto h-auto md:h-auto" />
      </div>
      <form noValidate className="space-y-6">
        <div>
          <label htmlFor="name" className="text-sm">Full name</label>
          <input id="name" type="text" placeholder="" className="w-full p-3 rounded dark:bg-gray-800 border border-gray-300" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm">Email</label>
          <input id="email" type="email" className="w-full p-3 rounded dark:bg-gray-800 border border-gray-300" />
        </div>
        <div>
          <label htmlFor="message" className="text-sm">Message</label>
          <textarea id="message" rows="3" className="w-full p-3 rounded dark-bg-gray-800" />
        </div>
        <button type="submit" className="w-full p-3 text-sm font-bold tracking-widest uppercase rounded dark:bg-violet-700 dark:text-gray-900">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
