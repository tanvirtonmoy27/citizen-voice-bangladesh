import { HashRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import { PublicLayout } from './layouts/PublicLayout';
import { DashboardLayout } from './layouts/DashboardLayout';

import { Home } from './pages/Home';
import { ReportProblem } from './pages/ReportProblem';
import { TrackComplaint } from './pages/TrackComplaint';
import { ComplaintDetail } from './pages/ComplaintDetail';
import { SmartMap } from './pages/SmartMap';
import { Leaderboard } from './pages/Leaderboard';
import { Transparency } from './pages/Transparency';
import { Emergency } from './pages/Emergency';
import { Disaster } from './pages/Disaster';
import { Announcements } from './pages/Announcements';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

import { DashboardHome } from './pages/dashboard/DashboardHome';
import { MyReports } from './pages/dashboard/MyReports';
import { Favorites } from './pages/dashboard/Favorites';
import { ComplaintQueue } from './pages/dashboard/ComplaintQueue';
import { OfficerPerformance } from './pages/dashboard/OfficerPerformance';
import { OfficersList } from './pages/dashboard/OfficersList';
import { Analytics } from './pages/dashboard/Analytics';
import { ManageUsers } from './pages/dashboard/ManageUsers';
import { ManageDepartments } from './pages/dashboard/ManageDepartments';
import { ManageDistricts } from './pages/dashboard/ManageDistricts';
import { Settings } from './pages/dashboard/Settings';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <HashRouter>
              <Routes>
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/report" element={<ReportProblem />} />
                  <Route path="/track" element={<TrackComplaint />} />
                  <Route path="/complaint/:id" element={<ComplaintDetail />} />
                  <Route path="/map" element={<SmartMap />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/transparency" element={<Transparency />} />
                  <Route path="/emergency" element={<Emergency />} />
                  <Route path="/disaster" element={<Disaster />} />
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </Route>

                <Route path="/dashboard" element={<DashboardLayout />}>
                  <Route index element={<DashboardHome />} />
                  <Route path="my-reports" element={<MyReports />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="queue" element={<ComplaintQueue />} />
                  <Route path="performance" element={<OfficerPerformance />} />
                  <Route path="officers" element={<OfficersList />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="users" element={<ManageUsers />} />
                  <Route path="departments" element={<ManageDepartments />} />
                  <Route path="districts" element={<ManageDistricts />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </HashRouter>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
