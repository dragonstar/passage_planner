import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useJourneys } from './hooks/useJourneys';
import { JourneyStatus } from '../../lib/types/journey';
import { formatDistanceToNow } from 'date-fns';

export function JourneyList() {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = React.useState<JourneyStatus | undefined>();
  const { journeys, isLoading, deleteJourney, togglePublish } = useJourneys(statusFilter);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this journey?')) {
      await deleteJourney(id);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading journeys...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => setStatusFilter(undefined)}
            className={`px-3 py-1 rounded-full ${!statusFilter ? 'bg-navy text-white' : 'bg-gray-100'}`}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter('draft')}
            className={`px-3 py-1 rounded-full ${statusFilter === 'draft' ? 'bg-navy text-white' : 'bg-gray-100'}`}
          >
            Drafts
          </button>
          <button
            onClick={() => setStatusFilter('published')}
            className={`px-3 py-1 rounded-full ${statusFilter === 'published' ? 'bg-navy text-white' : 'bg-gray-100'}`}
          >
            Published
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Modified</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {journeys.map((journey) => (
              <tr key={journey.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{journey.title}</div>
                  <div className="text-sm text-gray-500">
                    Created {formatDistanceToNow(new Date(journey.created_at), { addSuffix: true })}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    journey.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {journey.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {journey.author?.full_name || journey.author?.username}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {formatDistanceToNow(new Date(journey.updated_at), { addSuffix: true })}
                </td>
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  <button
                    onClick={() => navigate(`/journeys/${journey.id}/edit`)}
                    className="text-navy hover:text-navy/70"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => togglePublish(journey.id, journey.status)}
                    className="text-navy hover:text-navy/70"
                  >
                    {journey.status === 'published' ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(journey.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}