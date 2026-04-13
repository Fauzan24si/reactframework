import React, { useState, useMemo } from 'react';
import booksData from './booksData.json';

const AdminView = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setcategoryFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const categories = ['Semua', ...new Set(booksData.map(book => book.category))];
  const statuses = ['Semua', 'Tersedia', 'Dipinjam'];

  const filteredAndSortedBooks = useMemo(() => {
    let filtered = booksData.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.isbn.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'Semua' || book.category === categoryFilter;
      const matchesStatus = statusFilter === 'Semua' || book.availability.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'rating') {
          aValue = a.rating.average;
          bValue = b.rating.average;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, categoryFilter, statusFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return '↕️';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-[#FFE66D] dark:bg-[#4E4E50] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-6 sm:p-8 flex justify-between items-end flex-wrap gap-4">
        <div>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black dark:text-white">
            Panel Admin
          </h1>
          <p className="text-xl font-bold mt-2 uppercase border-l-4 border-black dark:border-white pl-4 text-black dark:text-white">Kelola & Pantau</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#4ECDC4] dark:bg-[#950740] border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] p-4 flex flex-col justify-between">
          <p className="font-bold uppercase text-sm border-b-4 border-black dark:border-white pb-2 mb-2 text-black dark:text-white">Total Buku</p>
          <p className="text-4xl font-black text-black dark:text-white">{filteredAndSortedBooks.length}</p>
        </div>
        <div className="bg-[#FFF4E0] dark:bg-[#1A1A1D] border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] p-4 flex flex-col justify-between">
          <p className="font-bold uppercase text-sm border-b-4 border-black dark:border-white pb-2 mb-2 text-black dark:text-white">Tersedia</p>
          <p className="text-4xl font-black text-black dark:text-white">
            {filteredAndSortedBooks.filter(b => b.availability.status === 'Tersedia').length}
          </p>
        </div>
        <div className="bg-[#FF6B6B] dark:bg-[#C3073F] border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] p-4 flex flex-col justify-between">
          <p className="font-bold uppercase text-sm border-b-4 border-black dark:border-white pb-2 mb-2 text-black dark:text-white">Dipinjam</p>
          <p className="text-4xl font-black text-black dark:text-white">
            {filteredAndSortedBooks.filter(b => b.availability.status === 'Dipinjam').length}
          </p>
        </div>
        <div className="bg-white dark:bg-black border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] p-4 flex flex-col justify-between">
          <p className="font-bold uppercase text-sm border-b-4 border-black dark:border-white pb-2 mb-2 text-black dark:text-white">Total Salinan</p>
          <p className="text-4xl font-black text-black dark:text-white">
            {filteredAndSortedBooks.reduce((sum, b) => sum + b.availability.copies, 0)}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-[#1A1A1D] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase text-black dark:text-white">🔍 Cari</label>
            <input
              type="text"
              placeholder="Judul, penulis, atau ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 border-4 border-black dark:border-white bg-[#FFF4E0] dark:bg-[#4E4E50] text-black dark:text-white font-bold placeholder-gray-600 dark:placeholder-gray-300 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
             <label className="font-bold uppercase text-black dark:text-white">📂 Kategori</label>
             <select
                value={categoryFilter}
                onChange={(e) => setcategoryFilter(e.target.value)}
                className="px-4 py-3 border-4 border-black dark:border-white bg-[#4ECDC4] dark:bg-[#950740] text-black dark:text-white font-bold focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all appearance-none cursor-pointer"
             >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
             </select>
          </div>

          <div className="flex flex-col gap-2">
             <label className="font-bold uppercase text-black dark:text-white">✅ Status</label>
             <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border-4 border-black dark:border-white bg-[#FFE66D] dark:bg-[#C3073F] text-black dark:text-white font-bold focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all appearance-none cursor-pointer"
             >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
             </select>
          </div>
        </div>
      </div>

      {/* Table - Desktop View */}
      <div className="hidden lg:block border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-[#1A1A1D] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FFE66D] dark:bg-[#950740] text-black dark:text-white border-b-4 border-black dark:border-white uppercase font-black text-sm">
              <th className="p-4 border-r-4 border-black dark:border-white">Sampul</th>
              <th className="p-4 border-r-4 border-black dark:border-white cursor-pointer hover:bg-black/10 transition-colors" onClick={() => handleSort('title')}>
                Judul {getSortIcon('title')}
              </th>
              <th className="p-4 border-r-4 border-black dark:border-white cursor-pointer hover:bg-black/10 transition-colors" onClick={() => handleSort('author')}>
                Penulis {getSortIcon('author')}
              </th>
              <th className="p-4 border-r-4 border-black dark:border-white cursor-pointer hover:bg-black/10 transition-colors" onClick={() => handleSort('year')}>
                Tahun {getSortIcon('year')}
              </th>
              <th className="p-4 border-r-4 border-black dark:border-white">Status / Salinan</th>
              <th className="p-4 cursor-pointer hover:bg-black/10 transition-colors" onClick={() => handleSort('rating')}>
                Peringkat {getSortIcon('rating')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedBooks.map((book, i) => (
              <tr key={book.id} className={`${i % 2 === 0 ? 'bg-white dark:bg-[#1A1A1D]' : 'bg-gray-100 dark:bg-gray-800'} border-b-4 border-black dark:border-white last:border-b-0 hover:bg-[#4ECDC4]/20`}>
                <td className="p-4 border-r-4 border-black dark:border-white w-20">
                  <div className="border-4 border-black dark:border-white w-12 h-16 bg-gray-200 overflow-hidden">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
                  </div>
                </td>
                <td className="p-4 border-r-4 border-black dark:border-white">
                  <p className="font-black text-lg text-black dark:text-white uppercase leading-tight">{book.title}</p>
                  <span className="inline-block px-2 py-1 bg-black text-white dark:bg-white dark:text-black text-xs font-bold mt-2 uppercase">{book.category}</span>
                </td>
                <td className="p-4 border-r-4 border-black dark:border-white font-bold text-black dark:text-gray-300">
                  {book.author}
                </td>
                <td className="p-4 border-r-4 border-black dark:border-white font-bold text-black dark:text-gray-300">
                  {book.year}
                </td>
                <td className="p-4 border-r-4 border-black dark:border-white">
                  <div className="flex flex-col gap-2">
                    <span className={`inline-block px-2 py-1 font-black text-xs uppercase border-4 border-black dark:border-white w-max ${
                        book.availability.status === 'Tersedia' ? 'bg-[#4ECDC4] text-black' : 'bg-[#FF6B6B] text-black'
                    }`}>
                      {book.availability.status}
                    </span>
                    <span className="text-sm font-bold text-black dark:text-gray-300 text-nowrap">
                      {book.availability.copies - book.availability.borrowed} / {book.availability.copies} Ada
                    </span>
                  </div>
                </td>
                <td className="p-4 font-black text-black dark:text-white">
                  ★ {book.rating.average}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards - Mobile/Tablet View */}
      <div className="lg:hidden space-y-6">
        {filteredAndSortedBooks.map(book => (
          <div key={book.id} className="bg-white dark:bg-[#1A1A1D] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-4 flex gap-4">
            <div className="border-4 border-black dark:border-white w-24 h-32 shrink-0 bg-gray-200">
              <img src={book.image} alt={book.title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal" />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="font-black text-lg uppercase leading-tight line-clamp-2 text-black dark:text-white">{book.title}</h3>
                <p className="font-bold text-sm text-gray-700 dark:text-gray-300">{book.author}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="px-2 py-1 text-xs font-black uppercase bg-black text-white dark:bg-white dark:text-black">
                  {book.category}
                </span>
                <span className={`px-2 py-1 text-xs font-black uppercase border-2 border-black dark:border-white ${
                    book.availability.status === 'Tersedia' ? 'bg-[#4ECDC4] text-black' : 'bg-[#FF6B6B] text-black'
                }`}>
                  {book.availability.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedBooks.length === 0 && (
        <div className="border-4 border-black dark:border-white bg-[#FF6B6B] dark:bg-[#C3073F] p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          <p className="font-black text-4xl uppercase text-black dark:text-white">Ruang Kosong</p>
        </div>
      )}
    </div>
  );
};

export default AdminView;
