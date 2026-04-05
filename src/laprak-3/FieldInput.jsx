export default function FieldInput({ label, name, type, value, onChange, error, placeholder }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">⚠️ {error}</p>}
    </div>
  )
}
