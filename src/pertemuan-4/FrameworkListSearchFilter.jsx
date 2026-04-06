import { useState } from "react";
import frameworkData from "./framework.json";

export default function FrameworkList() {
    const [dataForm, setDataForm] = useState({
        searchTerm: "",
        selectedTag: "",
    });

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setDataForm({
            ...dataForm,
            [name]: value,
        });
    };

    const _searchTerm = dataForm.searchTerm.toLowerCase();
    const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name
				.toLowerCase()
				.includes(_searchTerm) ||
      framework.description
				.toLowerCase()
				.includes(_searchTerm);

    const matchesTag = dataForm.selectedTag ? framework.tags.includes(dataForm.selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];


    return (
        <div className="p-8">
            <input
                type="text"
                name="searchTerm"
                value={dataForm.searchTerm}
                onChange={handleChange}
                placeholder="Search framework..."
                className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <select
                name="selectedTag"
                value={dataForm.selectedTag}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
            >
                <option value="">All Tags</option>
                {allTags.map((tag, index) => (
                  <option key={index} value={tag}>
                    {tag}
                  </option>
                ))}
            </select>

            {filteredFrameworks.map((item) => (
		            <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-md bg-white">
		                <h2 className="text-lg font-bold text-gray-800">{item.name}</h2>
		                <p className="text-gray-600">{item.description}</p>
                        <p className="text-sm text-gray-500">Developer: {item.details.developer}</p>
                        <a href={item.details.officialWebsite} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-blue-500 hover:underline">
                            Official Website
                        </a>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {item.tags.map((tag, index) => (
                                <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 text-xs rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
		            </div>
            ))}
        </div>
    )
}