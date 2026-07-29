import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';

interface AdminLayoutProps {
  title: string;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ title, children }) => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <main className="admin-main">
        <Header title={title} />
        <div className="content-body">
          {children}
        </div>
      </main>
    </div>
  );
};
