import React, { useEffect, useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Home() {
  let counter = 0
  const location = useLocation()
  const navigate = useNavigate()
  const [sleep, setSleep] = useState(null)
  const [contacts, setContacts] = useState([])
  const loadContacts = useCallback(async () => {
    const response = await axios.get('http://localhost:8000/api/contact')
    setContacts(response.data)
  }, [])
  const deleteContact = async (e) => {
    const { id } = e.target
    const response = await axios.delete(`http://localhost:8000/api/contact/`, {
      data: { id },
    })
    if (response.data.status === 'ok') {
      loadContacts()
    }
  }
  useEffect(() => {
    loadContacts()
    if (location.state?.msg && !sleep) {
      const id = setTimeout(() => {
        navigate(location.pathname, { replace: true })
      }, 5000)
      setSleep(id)
    }
  }, [loadContacts, navigate, location, sleep])
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-11/12  p-2 mt-12">
          <div className="mb-8 rounded shadow border border-gray-300">
            <div className="my-4 w-full flex justify-center mb-2">
              <h1 className="text-4xl font-bold text-center">Contact App</h1>
            </div>
            <div className="w-11/12 mx-auto mb-2 text-center rounded bg-blue-500 focus:outline-none text-white hover:bg-blue-700">
              <Link
                className="w-full inline-block py-2"
                replace={true}
                onClick={() => clearTimeout(sleep)}
                to="/add"
              >
                Tambah data
              </Link>
            </div>
          </div>
          <div className="p-2 rounded shadow border border-gray-300">
            <div className="w-full my-4">
              <h1 className="block mx-auto px-4 text-lg font-bold text-center border-b-2 border-gray-500">
                Data Contact
              </h1>
              <p
                className={
                  location.state?.msg &&
                  'my-4 block bg-green-50 border border-green-100 rounded text-green-500 px-4 py-3'
                }
              >
                {location.state?.msg.string}
              </p>
            </div>
            <div className="rounded overflow-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-5 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      no
                    </th>
                    <th
                      scope="col"
                      className="pl-4 py-3 text-left text-xs font-medium uppercase tracking-wider"
                    >
                      Nama
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                    >
                      Nomor HP
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-indigo-100">
                  {contacts?.map((contact) => (
                    <tr key={contact.id}>
                      <td className="pl-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {(counter += 1)}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {contact.name}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {contact.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {contact.number}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-500 flex gap-2">
                          <button
                            type="button"
                            className="rounded text-gray-700 px-2 py-1 border border-gray-600 transition-all duration-300 hover:bg-gray-600 hover:text-gray-50 active:bg-gray-600 active:text-gray-50"
                          >
                            <Link
                              onClick={() => clearTimeout(sleep)}
                              to="/edit"
                              state={contact}
                              replace={true}
                            >
                              Edit
                            </Link>
                          </button>
                          <button
                            id={contact.id}
                            onClick={deleteContact}
                            type="button"
                            className="rounded bg-gray-500 text-gray-50 px-2 py-1 transition-all duration-300 hover:bg-gray-600 active:bg-gray-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
