import frameworkData from "./framework.json";

export default function FrameworkList() {
    return (
        <div className="p-8">
            {frameworkData.map((item) => (
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