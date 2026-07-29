import React from 'react';
import { AdminLayout } from '../layouts/AdminLayout';
import { Plus } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const mockArticles = [
    { id: 'N-01', title: 'Sri Susheela Trust Distributes 500+ School Kits to Rural Students', date: '2026-07-20', author: 'Admin', category: 'Education' },
    { id: 'N-02', title: 'Annual Free Health & Eye Checkup Camp Announced', date: '2026-07-15', author: 'Admin', category: 'Healthcare' },
  ];

  return (
    <AdminLayout title="News & Press Releases">
      <div className="data-card">
        <div className="data-card-header">
          <h3>Published News Articles</h3>
          <button className="btn-primary">
            <Plus size={16} /> Publish Article
          </button>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Published Date</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {mockArticles.map((article) => (
                <tr key={article.id}>
                  <td style={{ fontWeight: 600 }}>{article.id}</td>
                  <td style={{ fontWeight: 500 }}>{article.title}</td>
                  <td>{article.category}</td>
                  <td>{article.date}</td>
                  <td>{article.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
