export default function KartuHasil({ data }) {
  return (
    <div className="mt-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded">
      <h2 className="text-xl font-semibold mb-3">✅ Pendaftaran Berhasil!</h2>
      <div className="space-y-2">
        <p className="text-sm">
          <strong className="font-semibold">Nama Lengkap:</strong> {data.namaLengkap}
        </p>
        <p className="text-sm">
          <strong className="font-semibold">Email:</strong> {data.email}
        </p>
        <p className="text-sm">
          <strong className="font-semibold">Nomor Telepon:</strong> {data.nomorTelepon}
        </p>
        <p className="text-sm">
          <strong className="font-semibold">Jenis Kelamin:</strong> {data.jenisKelamin}
        </p>
        <p className="text-sm">
          <strong className="font-semibold">Program Studi:</strong> {data.programStudi}
        </p>
      </div>
    </div>
  )
}
