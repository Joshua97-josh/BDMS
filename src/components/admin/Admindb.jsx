import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Table, TableHead, TableRow, TableCell, TableBody } from '../ui/table';
import { Input } from '../ui/input';
import { Bell, CheckCircle2, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from 'recharts';
import { format } from 'date-fns';

export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [bloodStock, setBloodStock] = useState({
    'A+': 10,
    'A-': 5,
    'B+': 8,
    'B-': 4,
    'O+': 12,
    'O-': 6,
    'AB+': 3,
    'AB-': 2
  });
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const dummyRequests = [
      { id: 1, patient: 'Sachin R', bloodGroup: 'O+', units: 2, status: 'pending' },
      { id: 2, patient: 'Santhanakrishnan S', bloodGroup: 'B-', units: 1, status: 'pending' },
      { id: 3, patient: 'Sabari S', bloodGroup: 'B+', units: 3, status: 'accepted' }
    ];
    const dummyDonors = [
      { id: 1, name: 'Anita S', bloodGroup: 'B+', phone: '9876543210', city: 'Chennai' },
      { id: 2, name: 'Ravi K', bloodGroup: 'O-', phone: '7894561230', city: 'Coimbatore' },
      { id: 3, name: 'Sonal P', bloodGroup: 'AB+', phone: '9081726354', city: 'Madurai' }
    ];
    setRequests(dummyRequests);
    setDonors(dummyDonors);
  }, []);

  const handleStatusUpdate = (id, status) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status } : req));
  };

  const handleStockUpdate = (type, value) => {
    setBloodStock(prev => ({ ...prev, [type]: parseInt(value) }));
  };

  const chartData = Object.entries(bloodStock).map(([type, units]) => ({ bloodType: type, units }));

  const donationTrendData = [
    { date: 'Apr 1', donations: 5 },
    { date: 'Apr 2', donations: 7 },
    { date: 'Apr 3', donations: 6 },
    { date: 'Apr 4', donations: 9 },
    { date: 'Apr 5', donations: 4 },
    { date: 'Apr 6', donations: 8 }
  ];

  const donorDistribution = Object.values(donors.reduce((acc, donor) => {
    acc[donor.bloodGroup] = acc[donor.bloodGroup] || { name: donor.bloodGroup, value: 0 };
    acc[donor.bloodGroup].value++;
    return acc;
  }, {}));

  const COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899', '#F97316'];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🩸 Admin Blood Management Dashboard</h1>

      {/* Search and Export Section */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex justify-between items-center">
            <Input
              placeholder="Search by patient or blood group..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-1/3"
            />
            <Button variant="default">Export Report</Button>
          </div>

          {/* Blood Requests Table */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient Name</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Units</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.filter(req =>
                req.patient.toLowerCase().includes(search.toLowerCase()) ||
                req.bloodGroup.toLowerCase().includes(search.toLowerCase())
              ).map(req => (
                <TableRow key={req.id}>
                  <TableCell>{req.patient}</TableCell>
                  <TableCell>{req.bloodGroup}</TableCell>
                  <TableCell>{req.units}</TableCell>
                  <TableCell>{req.status}</TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm" variant="outline" onClick={() => handleStatusUpdate(req.id, 'accepted')}>
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Accept
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(req.id, 'rejected')}>
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Blood Stock Management Section */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">🧪 Blood Stock Management</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Blood Type</TableCell>
                <TableCell>Units Available</TableCell>
                <TableCell>Update Units</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(bloodStock).map(([type, units]) => (
                <TableRow key={type}>
                  <TableCell>{type}</TableCell>
                  <TableCell>{units}</TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      min="0"
                      defaultValue={units}
                      onChange={(e) => handleStockUpdate(type, e.target.value)}
                      className="w-24"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Donor List Section */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <h2 className="text-xl font-semibold">👥 Registered Donors</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>City</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {donors.map(donor => (
                <TableRow key={donor.id}>
                  <TableCell>{donor.name}</TableCell>
                  <TableCell>{donor.bloodGroup}</TableCell>
                  <TableCell>{donor.phone}</TableCell>
                  <TableCell>{donor.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Analytics Section */}
      <Card>
        <CardContent className="p-4 space-y-6">
          <h2 className="text-xl font-semibold">📊 Blood Stock Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="bloodType" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>

          <h2 className="text-xl font-semibold">📈 Daily Donation Trends</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationTrendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="donations" stroke="#3B82F6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

          <h2 className="text-xl font-semibold">🧁 Donor Distribution by Blood Group</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donorDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {donorDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
