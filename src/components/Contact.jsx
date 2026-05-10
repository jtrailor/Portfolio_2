import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { useInView } from '../hooks/useInView'

const inputClass =
  'w-full p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-dark_blue dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200'

function Contact() {
  const form = useRef()
  const [toast, setToast] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const [ref, inView] = useInView()

  const showToast = (message, type) => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 4000)
  }

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSending(true)

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
      .finally(() => setIsSending(false))
  }

  return (
    <section
      id="contact"
      className="min-h-screen p-8 flex flex-col items-center justify-center"
    >
      <div
        ref={ref}
        className={`w-full max-w-md fade-in-up ${inView ? 'visible' : ''}`}
      >
        <div className="text-center">
          <h1 className="page-title">Contact Me</h1>
        </div>

        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4 mt-2">
          <input
            type="text"
            name="from_name"
            placeholder="Your Name"
            className={inputClass}
            required
          />
          <input
            type="email"
            name="from_email"
            placeholder="Your Email"
            className={inputClass}
            required
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            className={inputClass}
            required
          />
          <button
            type="submit"
            disabled={isSending}
            className="bg-brand-dark_blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-orange transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending…' : 'Send'}
          </button>
        </form>
      </div>

      {toast && (
        <div
          className={`fixed bottom-3 right-3 md:bottom-6 md:right-6 px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-lg text-white font-semibold transition-opacity duration-300 ${
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
