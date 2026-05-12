import { useState } from 'react'
import {
  FaBug,
  FaTimes,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa'

const GITHUB_NEW_ISSUE_URL =
  'https://github.com/jtrailor/Portfolio_2/issues/new'

const inputClass =
  'w-full p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark_blue dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200'

/**
 * Floating bug report button and modal. Builds a pre-filled GitHub new-issue
 * URL from the form fields and opens it in a new tab. No token required —
 * GitHub handles authentication on their end.
 */
function BugReport() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [steps, setSteps] = useState('')
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  /**
   * Resets all form fields and status, then closes the modal.
   */
  const close = () => {
    setIsOpen(false)
    setTitle('')
    setDescription('')
    setSteps('')
    setStatus(null)
  }

  /**
   * Builds a markdown issue body from the form fields plus auto-collected
   * environment details, constructs the pre-filled GitHub new-issue URL, and
   * opens it in a new tab. Falls back to the error panel if window.open is
   * blocked by the browser.
   * @param {React.FormEvent} e
   */
  const handleSubmit = (e) => {
    e.preventDefault()

    const bodyLines = [
      '## Description',
      description,
      '',
      ...(steps ? ['## Steps to Reproduce', steps, ''] : []),
      '## Environment',
      `- Page: ${window.location.href}`,
      `- User Agent: ${navigator.userAgent}`,
    ]

    const params = new URLSearchParams({
      title,
      body: bodyLines.join('\n'),
      labels: 'bug',
    })

    const opened = window.open(
      `${GITHUB_NEW_ISSUE_URL}?${params}`,
      '_blank',
      'noopener,noreferrer',
    )

    setStatus(opened ? 'success' : 'error')
  }

  const showForm = !status

  return (
    <>
      {/* Floating trigger — bottom-left to avoid the toast that appears bottom-right */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Report a bug"
        className="fixed bottom-6 left-6 z-40 bg-brand-dark_blue dark:bg-gray-700 text-white p-3 rounded-full shadow-lg hover:bg-brand-orange dark:hover:bg-brand-orange transition-colors duration-300"
      >
        <FaBug className="w-5 h-5" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 p-4"
          onClick={close}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">Report a Bug</h2>
              <button
                onClick={close}
                aria-label="Close"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            {/* Success panel */}
            {status === 'success' && (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <FaCheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
                <div>
                  <p className="text-lg font-semibold">GitHub opened in a new tab</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Your report is pre-filled — just click <strong>Submit new issue</strong> to file it.
                  </p>
                </div>
                <button
                  onClick={close}
                  className="mt-2 bg-brand-dark_blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-orange transition-colors duration-300"
                >
                  Done
                </button>
              </div>
            )}

            {/* Error panel */}
            {status === 'error' && (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <FaExclamationCircle className="w-12 h-12 text-brand-orange" />
                <div>
                  <p className="text-lg font-semibold">Popup was blocked</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Allow popups for this site, or{' '}
                    <a
                      href={GITHUB_NEW_ISSUE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-brand-orange transition-colors"
                    >
                      open GitHub directly <FaExternalLinkAlt className="inline w-3 h-3" />
                    </a>
                    .
                  </p>
                </div>
                <button
                  onClick={() => setStatus(null)}
                  className="mt-2 bg-brand-dark_blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-orange transition-colors duration-300"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Form */}
            {showForm && (
              <>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Found something broken? Fill in the details below — it will
                  open a pre-filled GitHub issue for you to review and submit.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Bug title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                    required
                  />
                  <textarea
                    placeholder="Describe what went wrong"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className={inputClass}
                    required
                  />
                  <textarea
                    placeholder="Steps to reproduce (optional)"
                    value={steps}
                    onChange={(e) => setSteps(e.target.value)}
                    rows={2}
                    className={inputClass}
                  />
                  <button
                    type="submit"
                    className="bg-brand-dark_blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-orange transition-colors duration-300"
                  >
                    Open GitHub Issue
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default BugReport
