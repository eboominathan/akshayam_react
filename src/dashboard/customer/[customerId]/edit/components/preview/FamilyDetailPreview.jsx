import React from 'react';

function FamilyDetailPreview({ customerInfo }) {
  const formatDate = (date) => {
    if (!date) return ''; // Handle null or undefined dates
    const parts = date.split('-'); // Assuming date is in YYYY-MM-DD format
    return parts.reverse().join('-'); // Rearrange to DD-MM-YYYY
  };

  return (
    <div className="my-6">
      <h2
        className="mb-4 text-lg font-bold text-left"
        style={{
          color: customerInfo?.theme_color,
        }}
      >
        Family Details
      </h2>
      <hr
        className="mb-4"
        style={{
          borderColor: customerInfo?.theme_color,
        }}
      />
      {customerInfo?.family?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border border-collapse border-gray-300 rounded-lg shadow-md">
            <thead>
              <tr
                style={{ backgroundColor: customerInfo?.theme_color, color: 'white' }}
                className="text-sm uppercase"
              >
                <th className="px-3 py-3 text-left"></th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Date of Birth</th>
                <th className="px-6 py-3 text-left">Relationship</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Gender</th>
              </tr>
            </thead>
            <tbody>
              {customerInfo?.family?.map((famil, index) => (
                <tr
                  key={index}
                  className={`text-sm ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-gray-100`}
                >
                  <td className="px-6 py-3 border-t border-gray-300">
                    {famil?.photo ? (
                      <img
                        src={famil.photo}
                        alt={`${famil?.first_name} ${famil?.last_name}'s photo`}
                        className="object-cover w-8 h-8 rounded-full"
                      />
                    ) : (
                      <span className="italic text-gray-500"></span>
                    )}
                  </td>
                  <td className="px-6 py-3 border-t border-gray-300">
                    {famil?.first_name} {famil?.last_name}
                  </td>
                  <td className="px-6 py-3 border-t border-gray-300">{formatDate(famil?.dob)}</td>
                  <td className="px-6 py-3 border-t border-gray-300">{famil?.relationship}</td>
                  <td className="px-6 py-3 border-t border-gray-300">{famil?.phone}</td>
                  <td
                    className="px-6 py-3 border-t border-gray-300"
                    dangerouslySetInnerHTML={{ __html: famil?.gender }}
                  />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="italic text-gray-500">No family details available.</p>
      )}
    </div>
  );
}

export default FamilyDetailPreview;
