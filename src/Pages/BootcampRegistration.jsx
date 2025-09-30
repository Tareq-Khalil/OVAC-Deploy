import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: '',
    school: '',
    grade: '',
    otherGrade: '',
    experience: [],
    otherExperience: '',
    experienceDetails: '',
    commitment: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const experienceOptions = [
    'Graphic Design',
    'Photo Manipulation',
    '3D Design',
    'Video Editing',
    'Animation'
  ];

  const gradeOptions = [
    'G9 / 3rd Prep / Senior 29',
    'G10 / 1st Sec / Senior 28',
    'G11/ 2nd Sec / Senior 27',
    'G12 / 3rd Sec / Senior 26'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleExperienceChange = (experience) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.includes(experience)
        ? prev.experience.filter(exp => exp !== experience)
        : [...prev.experience, experience]
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.school.trim()) newErrors.school = 'School is required';
    if (!formData.grade && !formData.otherGrade) newErrors.grade = 'Grade is required';
    if (!formData.commitment) newErrors.commitment = 'You must confirm your commitment';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitToSupabase = async (data) => {
    // Temporary: Add your actual values here for testing
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://xswlenbxkybjpaafvion.supabase.co";
    const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhzd2xlbmJ4a3lianBhYWZ2aW9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNTE4NDEsImV4cCI6MjA3MzcyNzg0MX0.fP3vtVcZpNNCYKK-rhZQFh0SbHYYPV0bCtsF0v7wGPc";
    
    console.log('Testing connection...');
    console.log('URL exists:', !!supabaseUrl);
    console.log('Key exists:', !!supabaseKey);
    console.log('URL value:', supabaseUrl);
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Supabase configuration missing');
    }

    // First test the connection
    const testResponse = await fetch(`${supabaseUrl}/rest/v1/bootcamp_registrations?select=count`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
      }
    });

    if (!testResponse.ok) {
      const errorText = await testResponse.text();
      console.error('Connection test failed:', errorText);
      throw new Error(`Connection failed: ${testResponse.status} ${testResponse.statusText}`);
    }

    console.log('Connection test successful!');

    const response = await fetch(`${supabaseUrl}/rest/v1/bootcamp_registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseKey}`,
        'apikey': supabaseKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Insert failed:', errorText);
      throw new Error(`Insert failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const submissionData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender,
        school: formData.school,
        grade: formData.grade || formData.otherGrade,
        experience: formData.experience.length > 0 ? formData.experience : null,
        other_experience: formData.otherExperience || null,
        experience_details: formData.experienceDetails || null,
        created_at: new Date().toISOString()
      };

      await submitToSupabase(submissionData);
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        gender: '',
        school: '',
        grade: '',
        otherGrade: '',
        experience: [],
        otherExperience: '',
        experienceDetails: '',
        commitment: false
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      // Show detailed error in console for debugging
      console.log('Supabase URL:', process.env.REACT_APP_SUPABASE_URL);
      console.log('Supabase Key exists:', !!process.env.REACT_APP_SUPABASE_ANON_KEY);
      alert(`Debug info: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-md w-full text-center border border-white/20">
          <div className="w-16 h-16 bg-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-2xl font-bold">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Registration Successful!</h2>
          <p className="text-gray-300 mb-6">
            Thank you for registering for the October Visual Arts Club Bootcamp. 
            We'll contact you soon with more details!
          </p>
          <button 
            onClick={() => setSubmitStatus(null)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
          >
            Register Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-purple-400 rounded-full flex items-center justify-center text-white font-bold">🎨</span>
            <span className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">📅</span>
            <span className="w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center text-white font-bold">👥</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            October Visual Arts Club
          </h1>
          <h2 className="text-2xl font-semibold text-purple-300 mb-4">
            Bootcamp Registration
          </h2>
          <p className="text-gray-300 max-w-md mx-auto">
            Join us for an exciting journey into the world of visual arts. 
            Register now to secure your spot!
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          {submitStatus === 'error' && (
            <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 mb-6 flex items-center gap-3">
              <span className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center text-white text-xs font-bold">!</span>
              <p className="text-red-300">
                Registration failed. Please try again or contact support.
              </p>
            </div>
          )}

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-2">
                <span className="w-4 h-4 bg-blue-400 rounded-full flex items-center justify-center text-white text-xs">👤</span>
                Full Legal Name (in English) *
              </label>
              <p className="text-sm text-gray-400 mb-2">
                This is the name that'll be displayed on your certificate.
              </p>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Enter your full legal name"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-2">
                <span className="w-4 h-4 bg-purple-400 rounded-full flex items-center justify-center text-white text-xs">📧</span>
                Personal Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-2">
                <span className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-white text-xs">📱</span>
                Phone Number (with WhatsApp) *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="+20 1XX XXX XXXX"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="text-white font-medium mb-2 block">Gender *</label>
              <div className="flex gap-4">
                {['Male', 'Female'].map((gender) => (
                  <label key={gender} className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleInputChange}
                      className="text-purple-500 focus:ring-purple-400"
                    />
                    {gender}
                  </label>
                ))}
              </div>
              {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* School */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-2">
                <span className="w-4 h-4 bg-indigo-400 rounded-full flex items-center justify-center text-white text-xs">🏫</span>
                School *
              </label>
              <input
                type="text"
                name="school"
                value={formData.school}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                placeholder="Enter your school name"
              />
              {errors.school && <p className="text-red-400 text-sm mt-1">{errors.school}</p>}
            </div>

            {/* Grade */}
            <div>
              <label className="flex items-center gap-2 text-white font-medium mb-2">
                <span className="w-4 h-4 bg-pink-400 rounded-full flex items-center justify-center text-white text-xs">🎓</span>
                Grade *
              </label>
              <div className="space-y-2">
                {gradeOptions.map((grade) => (
                  <label key={grade} className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="grade"
                      value={grade}
                      checked={formData.grade === grade}
                      onChange={handleInputChange}
                      className="text-purple-500 focus:ring-purple-400"
                    />
                    {grade}
                  </label>
                ))}
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="grade"
                    value="other"
                    checked={formData.grade === 'other' || formData.otherGrade}
                    onChange={() => setFormData(prev => ({ ...prev, grade: 'other' }))}
                    className="text-purple-500 focus:ring-purple-400"
                  />
                  <span className="text-white mr-2">Other:</span>
                  <input
                    type="text"
                    name="otherGrade"
                    value={formData.otherGrade}
                    onChange={handleInputChange}
                    className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    placeholder="Specify your grade"
                  />
                </div>
              </div>
              {errors.grade && <p className="text-red-400 text-sm mt-1">{errors.grade}</p>}
            </div>

            {/* Experience */}
            <div>
              <label className="text-white font-medium mb-2 block">
                Which of the following do you have experience at? (multiple selection allowed)
              </label>
              <p className="text-sm text-gray-400 mb-3">
                This doesn't affect your participation in the Bootcamp. <strong>No experience is required</strong>.
              </p>
              <div className="space-y-2">
                {experienceOptions.map((exp) => (
                  <label key={exp} className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.experience.includes(exp)}
                      onChange={() => handleExperienceChange(exp)}
                      className="text-purple-500 focus:ring-purple-400 rounded"
                    />
                    {exp}
                  </label>
                ))}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.experience.includes('Other')}
                    onChange={() => handleExperienceChange('Other')}
                    className="text-purple-500 focus:ring-purple-400 rounded"
                  />
                  <span className="text-white mr-2">Other:</span>
                  <input
                    type="text"
                    name="otherExperience"
                    value={formData.otherExperience}
                    onChange={handleInputChange}
                    className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-1 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    placeholder="Specify other experience"
                  />
                </div>
              </div>
            </div>

            {/* Experience Details */}
            <div>
              <label className="text-white font-medium mb-2 block">
                If you have experience in any of the previous fields, please explain.
              </label>
              <textarea
                name="experienceDetails"
                value={formData.experienceDetails}
                onChange={handleInputChange}
                rows={4}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none"
                placeholder="Describe your experience and any relevant projects or skills..."
              />
            </div>

            {/* Commitment Checkbox */}
            <div>
              <label className="flex items-start gap-3 text-white cursor-pointer">
                <input
                  type="checkbox"
                  name="commitment"
                  checked={formData.commitment}
                  onChange={handleInputChange}
                  className="text-purple-500 focus:ring-purple-400 rounded mt-1"
                />
                <span>I confirm my commitment to the Bootcamp's sessions and tasks. *</span>
              </label>
              {errors.commitment && <p className="text-red-400 text-sm mt-1">{errors.commitment}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting Registration...
                </span>
              ) : (
                'Complete Registration'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegistrationForm;


