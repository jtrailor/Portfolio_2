import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'

function Contact() {
  const form = useRef()
  const [toast, setToast] = useState(null)

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          showToast('Message sent successfully!', 'success')
          form.current.reset()
        },
        (error) => {
          console.error('EmailJS error:', error)
          showToast('Oops, something went wrong.', 'error')
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
          className="bg-brand-dark_blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-orange transition-colors duration-300"
        >
          Send
        </button>
      </form>

      {toast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-4 rounded-lg shadow-lg text-white font-semibold transition-opacity duration-300 ${
            toast.type === 'success' ? 'bg-brand-dark_blue' : 'bg-brand-orange'
          }`}
        >
          {toast.message}
        </div>
      )}
    </section>
  )
}

export default Contact
