# Error Lainnya (Part 2)

## Error 5: Typo di State Variable Name
**Kode dengan Error:**
```jsx
const [formData, setFormData] = useState({
  namaLengkap: '',
  nomorTelepon: ''
})

return (
  <FieldInput 
    name="nomorTelpon"  ❌ TYPO: kurang 'e'
    value={formData.nomorTelepon}  ✅ ada 'e'
    onChange={handleChange}
  />
)
```

**Masalah:**
- User ketik nomor → tersimpan di key `nomorTelpon`
- Input baca dari `nomorTelepon` → undefined
- Input tetap kosong meskipun data tersimpan

**Solusi:** Pastikan nama key konsisten!

---

## Error 6: Lupa preventDefault
**Kode dengan Error:**
```jsx
const handleSubmit = (e) => {
  // ❌ LUPA e.preventDefault()
  setSubmittedData(formData)
}
```

**Masalah:**
- Form submit → page reload
- State hilang semua
- Data yang baru di-set hilang

**Solusi:**
```jsx
const handleSubmit = (e) => {
  e.preventDefault()  ✅
  setSubmittedData(formData)
}
```

---

## Error 7: Salah Syntax Event Handler
**Kode dengan Error:**
```jsx
// SALAH 1: Langsung execute
<button onClick={handleSubmit()}>  ❌
// Fungsi langsung dijalankan saat render

// SALAH 2: Lupa kurung
<FieldInput onChange={(e) => handleChange(name, e.target.value} ❌
```

**Solusi:**
```jsx
// BENAR
<button onClick={handleSubmit}>  ✅
<button onClick={(e) => handleSubmit(e)}>  ✅
<FieldInput onChange={(e) => handleChange(name, e.target.value)} ✅
```

---

## Error 8: Salah Conditional Rendering
**Kode dengan Error:**
```jsx
// SALAH: Gunakan ||
{errors.nama || <p>{errors.nama}</p>}  ❌
// Tampil string tanpa styling

// SALAH: Cek length tanpa cek undefined
{formData.nama.length > 0 && <p>Ada</p>}  ❌
// Error jika nama undefined
```

**Solusi:**
```jsx
// BENAR: Gunakan &&
{errors.nama && <p>{errors.nama}</p>}  ✅

// BENAR: Optional chaining
{formData.nama?.length > 0 && <p>Ada</p>}  ✅
```

---

## Error 9: Mutate State Langsung
**Kode dengan Error:**
```jsx
const handleChange = (name, value) => {
  formData[name] = value  ❌ MUTATE LANGSUNG
  setFormData(formData)
  // React tidak detect perubahan
}
```

**Masalah:**
- Object reference sama
- React tidak re-render
- UI tidak update

**Solusi:**
```jsx
const handleChange = (name, value) => {
  setFormData(prev => ({ ...prev, [name]: value }))  ✅
}
```

---

## Error 10: Lupa Key di List
**Kode dengan Error:**
```jsx
{options.map((option) => (
  <option value={option.value}>  ❌ LUPA KEY
    {option.label}
  </option>
))}
```

**Error Message:**
```
Warning: Each child in a list should have a unique "key" prop.
```

**Solusi:**
```jsx
{options.map((option) => (
  <option key={option.value} value={option.value}>  ✅
    {option.label}
  </option>
))}
```

---

## Bonus Error 11: Wrong Comparison Operator
**Kode dengan Error:**
```jsx
const isFormValid = () => {
  const namaError = validateNama(formData.nama)
  
  // ❌ SALAH: Gunakan = (assignment)
  if (namaError = '') {
    return true
  }
  return false
}
```

**Masalah:**
- `=` adalah assignment, bukan comparison
- `namaError = ''` selalu return `''` (falsy)
- Kondisi selalu false

**Solusi:**
```jsx
if (namaError === '') {  ✅ Gunakan ===
  return true
}
```

---

## Bonus Error 12: Async State Update
**Kode dengan Error:**
```jsx
const handleSubmit = (e) => {
  e.preventDefault()
  setSubmittedData(formData)
  console.log(submittedData)  ❌ Masih null!
}
```

**Masalah:**
- `setState` adalah asynchronous
- `console.log` jalan sebelum state update
- Tampil nilai lama

**Solusi:**
```jsx
// Gunakan useEffect untuk track perubahan
useEffect(() => {
  if (submittedData) {
    console.log(submittedData)  ✅
  }
}, [submittedData])
```

---

## Summary Error Baru:
5. Typo state name
6. Lupa preventDefault
7. Salah syntax event handler
8. Salah conditional rendering
9. Mutate state langsung
10. Lupa key di list
11. Salah operator comparison
12. Async state update

Total: 12 error umum di React!
