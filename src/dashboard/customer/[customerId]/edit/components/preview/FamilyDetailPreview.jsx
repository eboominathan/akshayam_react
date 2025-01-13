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
        className="mb-2 text-sm font-bold text-left"
        style={{
          color: customerInfo?.theme_color,
        }}
      >
        Family Details
      </h2>
      <hr
        style={{
          borderColor: customerInfo?.theme_color,
        }}
      />
      {customerInfo?.family?.length > 0 && (
        <table className="w-full my-5 text-left border border-collapse border-gray-300">
          <thead>
            <tr style={{ color: customerInfo?.theme_color }}>
              <th className="px-4 py-2 border border-gray-300">Image</th>
              <th className="px-4 py-2 border border-gray-300">Name</th>              
              <th className="px-4 py-2 border border-gray-300">Date of Birth</th>
              <th className="px-4 py-2 border border-gray-300">Relationship</th>
              <th className="px-4 py-2 border border-gray-300">Phone</th>
              <th className="px-4 py-2 border border-gray-300">Gender</th>
            </tr>
          </thead>
          <tbody>
            {customerInfo?.family?.map((famil, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border border-gray-300">
                  {famil?.photo ? (
                    <img
                      src={famil.photo}
                      alt={`${famil?.first_name} ${famil?.last_name}'s photo`}
                      className="object-cover w-16 h-16 rounded-full"
                    />
                  ) : (
                    <span>No photo</span>
                  )}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {famil?.first_name} {famil?.last_name}
                </td>
                <td className="px-4 py-2 border border-gray-300">{formatDate(famil?.dob)}</td>
                <td className="px-4 py-2 border border-gray-300">{famil?.relationship}</td>
                <td className="px-4 py-2 border border-gray-300">{famil?.phone}</td>
                <td
                  className="px-4 py-2 border border-gray-300"
                  dangerouslySetInnerHTML={{ __html: famil?.gender }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FamilyDetailPreview;
