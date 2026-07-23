import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Complaint, Citizen, Officer, Status, Comment } from '../types';
import { generateComplaints, generateCitizens, generateOfficers } from '../data/generateComplaints';

interface DataContextValue {
  complaints: Complaint[];
  citizens: Citizen[];
  officers: Officer[];
  addComplaint: (c: Complaint) => void;
  upvoteComplaint: (id: string) => void;
  addComment: (id: string, comment: Comment) => void;
  updateStatus: (id: string, status: Status, note?: string, actor?: string) => void;
  assignOfficer: (id: string, officer: string) => void;
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const STORAGE_KEY = 'cvb_complaints_v1';

function loadComplaints(): Complaint[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch { /* fallthrough */ }
  }
  return generateComplaints(72);
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>(loadComplaints);
  const [citizens] = useState<Citizen[]>(() => generateCitizens());
  const [officers] = useState<Officer[]>(() => generateOfficers());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

  const addComplaint = (c: Complaint) => setComplaints(prev => [c, ...prev]);

  const upvoteComplaint = (id: string) =>
    setComplaints(prev => prev.map(c => (c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c)));

  const addComment = (id: string, comment: Comment) =>
    setComplaints(prev => prev.map(c => (c.id === id ? { ...c, comments: [...c.comments, comment] } : c)));

  const updateStatus = (id: string, status: Status, note?: string, actor = 'Officer') =>
    setComplaints(prev =>
      prev.map(c => {
        if (c.id !== id) return c;
        const event = {
          id: `t-${Date.now()}`,
          date: new Date().toISOString(),
          actor,
          role: 'officer' as const,
          action: `Status updated to ${status.replace('_', ' ')}`,
          note,
        };
        return { ...c, status, updatedAt: new Date().toISOString(), timeline: [...c.timeline, event] };
      })
    );

  const assignOfficer = (id: string, officer: string) =>
    setComplaints(prev =>
      prev.map(c => {
        if (c.id !== id) return c;
        const event = {
          id: `t-${Date.now()}`,
          date: new Date().toISOString(),
          actor: officer,
          role: 'officer' as const,
          action: `Assigned to officer: ${officer}`,
        };
        return { ...c, assignedOfficer: officer, timeline: [...c.timeline, event] };
      })
    );

  const resetDemoData = () => {
    const fresh = generateComplaints(72);
    setComplaints(fresh);
  };

  return (
    <DataContext.Provider
      value={{ complaints, citizens, officers, addComplaint, upvoteComplaint, addComment, updateStatus, assignOfficer, resetDemoData }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
