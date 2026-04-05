export default function FieldSelect({ label, name, value, onChange, options, error }) {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">⚠️ {error}</p>}
    </div>
  )
}
