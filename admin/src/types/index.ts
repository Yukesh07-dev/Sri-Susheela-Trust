export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  date: string;
  category: string;
  status: 'Completed' | 'Pending' | 'Failed';
}

export interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: 'Upcoming' | 'Completed' | 'Draft';
}

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  joinedDate: string;
  status: 'Active' | 'Pending' | 'Inactive';
}

export interface DashboardStats {
  totalDonations: number;
  activeEvents: number;
  registeredVolunteers: number;
  beneficiariesHelped: number;
}
