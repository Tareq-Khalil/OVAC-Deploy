import React, { useState, useEffect } from 'react';

const AdminPanel = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGrade, setFilterGrade] = useState('');
  const [filterGender, setFilterGender] = useState('');
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminKey, setAdminKey] = useState('');

  // Admin authentication
  const handleAdminLogin = () => {
    const correctKey = process.env.REACT_APP_ADMIN_KEY || 'your_admin_key_here';
    if (adminKey === correctKey) {
      setIsAuthenticated(true);
      fetchRegistrations();
    } else {
      alert('Invalid admin key!');
    }
  };

  const fetchFromSupabase = async () => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_SERVICE_KEY || process.env.REACT_APP_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/bootcamp_registrations?select=*&order=created_at.desc`, {
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch registrations');
    }

    return response.json();
  };

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchFromSupabase();
      setRegistrations(data);
    } catch (err) {
      setError(err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Full Name',
      'Email',
      'Phone',
      'Gender',
      'School',
      'Grade',
      'Experience',
      'Other Experience',
      'Experience Details',
      'Registration Date'
    ];

    const csvData = registrations.map(reg => [
      reg.full_name,
      reg.email,
      reg.phone,
      reg.gender,
      reg.school,
      reg.grade,
      reg.experience ? reg.experience.join(', ') : '',
      reg.other_experience || '',
      reg.experience_details || '',
      new Date(reg.created_at).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bootcamp_registrations_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Filter registrations based on search and filters
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reg.school.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGrade = !filterGrade || reg.grade.includes(filterGrade);
    const matchesGender = !filterGender || reg.gender === filterGender;
    
    return matchesSearch && matchesGrade && matchesGender;
  });

  // Get unique grades and genders for filters
  const uniqueGrades = [...new Set(registrations.map(reg => reg.grade.split(' ')[0]))];
  const uniqueGenders = [...new Set(registrations.map(reg => reg.gender))];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full border border-white/20">
          <div className="text-center mb-6">
            <span className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">👥</span>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Access</h2>
            <p className="text-gray-300">Enter admin key to view registrations</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter admin key"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
            />
            <button
              onClick={handleAdminLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
            >
              Access Admin Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white">🎨</span>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                <p className="text-gray-300">October Visual Arts Club Bootcamp</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchRegistrations}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <span className={`text-sm ${loading ? 'animate-spin' : ''}`}>🔄</span>
                Refresh
              </button>
              <button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <span className="text-sm">📥</span>
                Export CSV
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Total Registrations</span>
              </div>
              <p className="text-2xl font-bold text-white">{registrations.length}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Today's Registrations</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {registrations.filter(reg => 
                  new Date(reg.created_at).toDateString() === new Date().toDateString()
                ).length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Palette className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">With Experience</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {registrations.filter(reg => reg.experience && reg.experience.length > 0).length}
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <School className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Unique Schools</span>
              </div>
              <p className="text-2xl font-bold text-white">
                {new Set(registrations.map(reg => reg.school)).size}
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or school..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <select
              value={filterGrade}
              onChange={(e) => setFilterGrade(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Grades</option>
              {uniqueGrades.map(grade => (
                <option key={grade} value={grade} className="bg-gray-800">
                  {grade}
                </option>
              ))}
            </select>
            <select
              value={filterGender}
              onChange={(e) => setFilterGender(e.target.value)}
              className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Genders</option>
              {uniqueGenders.map(gender => (
                <option key={gender} value={gender} className="bg-gray-800">
                  {gender}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 text-white">
              <Filter className="w-4 h-4" />
              <span>Showing {filteredRegistrations.length} of {registrations.length}</span>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 text-red-300">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white">Loading registrations...</p>
          </div>
        ) : (
          /* Registrations Table */
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left text-white font-medium p-4">Name</th>
                    <th className="text-left text-white font-medium p-4">Email</th>
                    <th className="text-left text-white font-medium p-4">School</th>
                    <th className="text-left text-white font-medium p-4">Grade</th>
                    <th className="text-left text-white font-medium p-4">Gender</th>
                    <th className="text-left text-white font-medium p-4">Registration Date</th>
                    <th className="text-left text-white font-medium p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRegistrations.map((registration, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                      <td className="p-4 text-white">{registration.full_name}</td>
                      <td className="p-4 text-gray-300">{registration.email}</td>
                      <td className="p-4 text-gray-300">{registration.school}</td>
                      <td className="p-4 text-gray-300">{registration.grade}</td>
                      <td className="p-4 text-gray-300">{registration.gender}</td>
                      <td className="p-4 text-gray-300">
                        {new Date(registration.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedRegistration(registration)}
                          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm transition-colors"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredRegistrations.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No registrations found matching your criteria.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Registration Detail Modal */}
        {selectedRegistration && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 z-50">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Registration Details</h3>
                <button
                  onClick={() => setSelectedRegistration(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-blue-400" />
                      <span className="text-white font-medium">Full Name</span>
                    </div>
                    <p className="text-gray-300">{selectedRegistration.full_name}</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-purple-400" />
                      <span className="text-white font-medium">Email</span>
                    </div>
                    <p className="text-gray-300">{selectedRegistration.email}</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-white font-medium">Phone</span>
                    </div>
                    <p className="text-gray-300">{selectedRegistration.phone}</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-yellow-400" />
                      <span className="text-white font-medium">Gender</span>
                    </div>
                    <p className="text-gray-300">{selectedRegistration.gender}</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <School className="w-4 h-4 text-indigo-400" />
                      <span className="text-white font-medium">School</span>
                    </div>
                    <p className="text-gray-300">{selectedRegistration.school}</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <GraduationCap className="w-4 h-4 text-pink-400" />
                      <span className="text-white font-medium">Grade</span>
                    </div>
                    <p className="text-gray-300">{selectedRegistration.grade}</p>
                  </div>
                </div>

                {selectedRegistration.experience && selectedRegistration.experience.length > 0 && (
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Palette className="w-4 h-4 text-orange-400" />
                      <span className="text-white font-medium">Experience</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedRegistration.experience.map((exp, idx) => (
                        <span key={idx} className="bg-purple-600/30 text-purple-200 px-2 py-1 rounded text-sm">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedRegistration.other_experience && (
                  <div className="bg-white/10 rounded-lg p-4">
                    <span className="text-white font-medium block mb-2">Other Experience</span>
                    <p className="text-gray-300">{selectedRegistration.other_experience}</p>
                  </div>
                )}

                {selectedRegistration.experience_details && (
                  <div className="bg-white/10 rounded-lg p-4">
                    <span className="text-white font-medium block mb-2">Experience Details</span>
                    <p className="text-gray-300">{selectedRegistration.experience_details}</p>
                  </div>
                )}

                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="text-white font-medium">Registration Date</span>
                  </div>
                  <p className="text-gray-300">
                    {new Date(selectedRegistration.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
