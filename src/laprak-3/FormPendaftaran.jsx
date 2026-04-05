import { useState } from 'react'
import FieldInput from './FieldInput'
import FieldSelect from './FieldSelect'
import KartuHasil from './KartuHasil'

export default function FormPendaftaran() {
  const [formData, setFormData] = useState({
    namaLengkap: '',
    email: '',
    nomorTelepon: '',
    jenisKelamin: '',
    programStudi: ''
  })

  const [errors, setErrors] = useState({})
  const [submittedData, setSubmittedData] = useState(null)

  const validateNamaLengkap = (value) => {
    if (!value.trim()) {
      return 'Nama lengkap wajib diisi'
    }
    if (/\d/.test(value)) {
      return 'Nama tidak boleh mengandung angka'
    }
    if (value.trim().length < 3) {
      return 'Nama minimal 3 karakter'
    }
    return ''
  }

  const validateEmail = (value) => {
    if (!value.trim()) {
      return 'Email wajib diisi'
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return 'Format email tidak valid'
    }
    if (value.length > 50) {
      return 'Email maksimal 50 karakter'
    }
    return ''
  }

  const validateNomorTelepon = (value) => {
    if (!value.trim()) {
      return 'Nomor telepon wajib diisi'
    }
    if (!/^\d+$/.test(value)) {
      return 'Nomor telepon hanya boleh berisi angka'
    }
    if (value.length < 10 || value.length > 13) {
      return 'Nomor telepon harus 10-13 digit'
    }
    return ''
  }

  const validateJenisKelamin = (value) => {
    if (!value) {
      return 'Jenis kelamin wajib dipilih'
    }
    return ''
  }

  const validateProgramStudi = (value) => {
    if (!value) {
      return 'Program studi wajib dipilih'
    }
    return ''
  }

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    
    let error = ''
    switch (name) {
      case 'namaLengkap':
        error = validateNamaLengkap(value)
        break
      case 'email':
        error = validateEmail(value)
        break
      case 'nomorTelepon':
        error = validateNomorTelepon(value)
        break
      case 'jenisKelamin':
        error = validateJenisKelamin(value)
        break
      case 'programStudi':
        error = validateProgramStudi(value)
        break
    }
    
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const isFormValid = () => {
    const namaError = validateNamaLengkap(formData.namaLengkap)
    const emailError = validateEmail(formData.email)
    const teleponError = validateNomorTelepon(formData.nomorTelepon)
    const jenisKelaminError = validateJenisKelamin(formData.jenisKelamin)
    const prodiError = validateProgramStudi(formData.programStudi)

    return !namaError && !emailError && !teleponError && !jenisKelaminError && !prodiError
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedData(formData)
  }

  const jenisKelaminOptions = [
    { value: '', label: 'Pilih Jenis Kelamin' },
    { value: 'Laki-laki', label: 'Laki-laki' },
    { value: 'Perempuan', label: 'Perempuan' }
  ]

  const programStudiOptions = [
    { value: '', label: 'Pilih Program Studi' },
    { value: 'Teknik Informatika', label: 'Teknik Informatika' },
    { value: 'Sistem Informasi', label: 'Sistem Informasi' },
    { value: 'Teknik Komputer', label: 'Teknik Komputer' },
    { value: 'Teknologi Informasi', label: 'Teknologi Informasi' }
  ]

  return (
    <div className="flex flex-col items-center justify-center m-5 p-5 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-center mb-2 text-gray-700">Form Pendaftaran Mahasiswa</h1>
        <p className="text-center text-gray-600 text-sm mb-6">Silakan lengkapi data diri Anda dengan benar</p>
        
        <form onSubmit={handleSubmit}>
        <FieldInput
          label="Nama Lengkap"
          name="namaLengkap"
          type="text"
          value={formData.namaLengkap}
          onChange={handleChange}
          error={errors.namaLengkap}
          placeholder="Masukkan nama lengkap"
        />

        <FieldInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="contoh@email.com"
        />

        <FieldInput
          label="Nomor Telepon"
          name="nomorTelepon"
          type="tel"
          value={formData.nomorTelepon}
          onChange={handleChange}
          error={errors.nomorTelepon}
          placeholder="08123456789"
        />

        <FieldSelect
          label="Jenis Kelamin"
          name="jenisKelamin"
          value={formData.jenisKelamin}
          onChange={handleChange}
          options={jenisKelaminOptions}
          error={errors.jenisKelamin}
        />

        <FieldSelect
          label="Program Studi"
          name="programStudi"
          value={formData.programStudi}
          onChange={handleChange}
          options={programStudiOptions}
          error={errors.programStudi}
        />

        {isFormValid() && (
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold transition-colors">
            Submit Pendaftaran
          </button>
        )}
      </form>

      {submittedData && (
        <KartuHasil data={submittedData} />
      )}
      </div>
    </div>
  )
}
