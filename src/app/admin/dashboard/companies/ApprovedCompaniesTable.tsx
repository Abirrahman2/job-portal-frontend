import React from 'react';
export interface Company {
  id: number;
  name: string;
  companyType: string;
  email: string;
  address: string;
  website: string | null;
  status: string;
}
interface ApprovedCompaniesTableProps {
  companies: Company[];
}
export default function ApprovedCompaniesTable({ companies }: ApprovedCompaniesTableProps) {
  return (
   
     <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Website</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">{company.name}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{company.email}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    <a href={company.website || '#'} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">{company.website}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}