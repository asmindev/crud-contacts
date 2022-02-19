import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function TambahContact() {
  let indexId = 0
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nohp, setNohp] = useState('')
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:8000/api/contact', {
      name,
      email,
      number: nohp,
    })
    const { errors } = response.data
    if (errors) {
      setErrors(errors)
    } else {
      navigate('/', {
        state: {
          msg: { name, email, number: nohp, string: 'sukses tambah contact' },
        },
      })
    }
  }
  return (
    <div className="w-full mt-12">
      <h1 className="font-bold text-4xl text-center">Tambah Contact</h1>
      <div className={errors.length ? 'mt-8 mx-4' : 'hidden'}>
        {errors.map((error) => (
          <h1
            key={(indexId += 1)}
            className="text-red-400 my-2 px-4 py-2 bg-red-100 border border-red-200 rounded"
          >
            {error.msg}
          </h1>
        ))}
      </div>
      <div className="w-11/12 p-4 rounded border border-gray-300 shadow mt-12 mx-auto">
        <div className="w-full flex justify-center">
          <form onSubmit={submitHandler} className="w-full text-gray-800">
            <div className="w-full my-2">
              <label htmlFor="nama">
                Nama
                <input
                  autoComplete="off"
                  placeholder="Masukkan nama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="nama"
                  type="text"
                  id="nama"
                  className="w-full px-3 py-2 text-gray-800 rounded border border-gray-400 placeholder:text-gray-500 focus:outline-none"
                />
              </label>
            </div>
            <div className="w-full my-2">
              <label htmlFor="email">
                Email
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  placeholder="Masukkan email"
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 text-gray-800 rounded border border-gray-400 placeholder:text-gray-500 focus:outline-none"
                />
              </label>
            </div>
            <div className="w-full my-2">
              <label htmlFor="nohp">
                No HP
                <input
                  autoComplete="off"
                  placeholder="Masukkan nomor Hp"
                  value={nohp}
                  onChange={(e) => setNohp(e.target.value)}
                  type="number"
                  id="nohp"
                  className="w-full px-3 py-2 text-gray-800 rounded border border-gray-400 placeholder:text-gray-500 focus:outline-none"
                />
              </label>
            </div>
            <button
              className="py-2 block w-1/2 px-3 bg-gray-500 rounded focus:outline-none hover:bg-gray-600 focus:bg-gray-600 transition-all duration-300 text-gray-50"
              type="submit"
              name="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default TambahContact
