import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

function Contact() {
  const form = useRef()
  const [success, setSuccess] = useState('')

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_nzhvh3z',
        'template_3em3p6f',
        form.current,
        '_BBX2rrQzH78ECYHH',
      )
      .then(
        (result) => {
          console.log(result.text)
          setSuccess('Message sent successfully!')
          form.current.reset()
        },
        (error) => {
          console.log(error.text)
          setSuccess('Oops, something went wrong.')
        },
      )
  }

  return (
    <section
      id="contact"
      className="min-h-screen p-8 flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl mb-6">Contact Me</h1>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          className="p-3 rounded border border-gray-300"
          required
        />
        <input
          type="email"
          name="from_email"
          placeholder="Your Email"
          className="p-3 rounded border border-gray-300"
          required
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          className="p-3 rounded border border-gray-300"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Send
        </button>
      </form>
      {success && <p className="mt-4 text-green-500">{success}</p>}
    </section>
  )
}

export default Contact
