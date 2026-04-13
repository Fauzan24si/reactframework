import React, { useState, useMemo } from 'react';
import booksData from './booksData.json';

const GuestView = ({ darkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setcategoryFilter] = useState('Semua');
  const [statusFilter, setStatusFilter] = useState('Semua');

  const categories = ['Semua', ...new Set(booksData.map(book => book.category))];
  const statuses = ['Semua', 'Tersedia', 'Dipinjam'];

  const filteredBooks = useMemo(() => {
    return booksData.filter(book => {
      const matchesSearch = book.title.includes(searchTerm.toLowerCase()) ||
        book.author.includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'Semua' || book.category === categoryFilter;
      const matchesStatus = statusFilter === 'Semua' || book.availability.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [searchTerm, categoryFilter, statusFilter]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Search and Filters box */}
      <div className="bg-[#4ECDC4] dark:bg-[#950740] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-6 sm:p-8">
        <h2 className="text-3xl font-black uppercase mb-6 border-b-4 border-black dark:border-white inline-block pb-1">Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Search */}
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase tracking-wider text-black dark:text-white">🔍 Cari Buku</label>
            <input
              type="text"
              placeholder="Judul atau penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 border-4 border-black dark:border-white bg-white dark:bg-[#1A1A1D] text-black dark:text-white font-bold placeholder-gray-500 focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase tracking-wider text-black dark:text-white">📂 Kategori</label>
            <select
              value={categoryFilter}
              onChange={(e) => setcategoryFilter(e.target.value)}
              className="px-4 py-3 border-4 border-black dark:border-white bg-[#FFE66D] dark:bg-[#4E4E50] text-black dark:text-white font-bold focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all appearance-none cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col gap-2">
            <label className="font-bold uppercase tracking-wider text-black dark:text-white">✅ Ketersediaan</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-4 border-black dark:border-white bg-[#FF6B6B] dark:bg-[#C3073F] text-black dark:text-white font-bold focus:outline-none focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all appearance-none cursor-pointer"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center bg-white dark:bg-black border-4 border-black dark:border-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
        <span className="font-black text-xl uppercase">Hasil Pencarian</span>
        <span className="font-black text-xl bg-[#FFE66D] dark:bg-[#950740] border-4 border-black dark:border-white px-3 py-1">
          {filteredBooks.length}
        </span>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredBooks.map(book => (
          <div
            key={book.id}
            className="group bg-white dark:bg-[#1A1A1D] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-200 flex flex-col"
          >
            {/* Book Image Space */}
            <div className="relative h-64 border-b-4 border-black dark:border-white bg-[#FFE66D] dark:bg-[#4E4E50] overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-0 right-0 m-2">
                <span className={`px-3 py-1 font-black text-sm uppercase border-4 border-black dark:border-white ${book.availability.status === 'Tersedia' ? 'bg-[#4ECDC4] dark:bg-[#4ECDC4] text-black' : 'bg-[#FF6B6B] dark:bg-[#FF6B6B] text-black'
                  }`}>
                  {book.availability.status}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 m-2">
                <span className="bg-white dark:bg-black text-black dark:text-white font-black px-2 py-1 border-4 border-black dark:border-white text-xs uppercase">
                  {book.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="font-black text-xl mb-1 line-clamp-2 uppercase leading-snug">
                {book.title}
              </h3>
              <p className="font-bold text-sm mb-4 text-gray-700 dark:text-gray-300">
                OLEH {book.author}
              </p>

              <div className="mt-auto grid grid-cols-2 gap-2 text-sm font-bold border-t-4 border-black dark:border-white pt-4">
                <div className="flex flex-col">
                  <span className="uppercase text-xs text-gray-500 dark:text-gray-400">Peringkat</span>
                  <span>★ {book.rating.average}</span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="uppercase text-xs text-gray-500 dark:text-gray-400">Tahun</span>
                  <span>{book.year}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="border-4 border-black dark:border-white bg-white dark:bg-[#1A1A1D] p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
          <p className="font-black text-4xl uppercase text-black dark:text-white">Buku Tidak Ditemukan</p>
          <p className="font-bold text-xl mt-4 bg-[#FFE66D] dark:bg-[#950740] inline-block px-4 py-2 border-4 border-black dark:border-white">
            UBAH KATA KUNCI PENCARIAN
          </p>
        </div>
      )}
    </div>
  );
};

export default GuestView;
