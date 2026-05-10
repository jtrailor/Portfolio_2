import { useState } from 'react'
import {
  FaBug,
  FaTimes,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from 'react-icons/fa'

const GITHUB_API_URL =
  'https://api.github.com/repos/jtrailor/Portfolio_2/issues'

const inputClass =
  'w-full p-3 rounded-lg border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-dark_blue dark:focus:ring-gray-400 focus:border-transparent transition-all duration-200'

/**
 * Floating bug report button and modal. Submits directly to the GitHub Issues
 * API using a fine-grained PAT stored in REACT_APP_GITHUB_TOKEN. The token is
 * scoped to "Issues: Read and Write" on this repo only, limiting exposure on
 * the client side.
 */
function BugReport() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [steps, setSteps] = useState('')
  const [status, setStatus] = useState(null) // null | 'submitting' | { url, number } | 'error'

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
   * POSTs a new issue to the GitHub API with a markdown body built from the
   * form fields plus auto-collected environment details. Transitions to the
   * success or error panel depending on the outcome.
   * @param {React.FormEvent} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const bodyLines = [
      '## Description',
      description,
      '',
      ...(steps ? ['## Steps to Reproduce', steps, ''] : []),
      '## Environment',
      `- Page: ${window.location.href}`,
      `- User Agent: ${navigator.userAgent}`,
    ]

    try {
      const res = await fetch(GITHUB_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
        body: JSON.stringify({
          title,
          body: bodyLines.join('\n'),
          labels: ['bug'],
        }),
      })

      if (!res.ok) throw new Error(`GitHub API returned ${res.status}`)

      const issue = await res.json()
      setStatus({ url: issue.html_url, number: issue.number })
    } catch (err) {
      console.error('Bug report failed:', err)
      setStatus('error')
    }
  }

  const isSuccess = status?.url
  const isError = status === 'error'
  const showForm = !isSuccess && !isError

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
            {isSuccess && (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <FaCheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
                <div>
                  <p className="text-lg font-semibold">Issue filed — thanks!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    #{status.number} has been added to the backlog.
                  </p>
                </div>
                <a
                  href={status.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-brand-dark_blue dark:text-brand-light_blue hover:text-brand-orange transition-colors font-medium text-sm"
                >
                  View on GitHub <FaExternalLinkAlt className="w-3 h-3" />
                </a>
                <button
                  onClick={close}
                  className="mt-2 bg-brand-dark_blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-brand-orange transition-colors duration-300"
                >
                  Done
                </button>
              </div>
            )}

            {/* Error panel */}
            {isError && (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <FaExclamationCircle className="w-12 h-12 text-brand-orange" />
                <div>
                  <p className="text-lg font-semibold">Submission failed</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Something went wrong on our end. You can try again or{' '}
                    <a
                      href="https://github.com/jtrailor/Portfolio_2/issues/new"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-brand-orange transition-colors"
                    >
                      open an issue directly on GitHub
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
                  Found something broken? Describe it below and it will be filed
                  directly as a GitHub issue.
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
                    disabled={status === 'submitting'}
                    className="bg-brand-dark_blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-orange transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? 'Filing issue…' : 'Submit Bug Report'}
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
