import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { ROUTES } from '../../constants/routes';
import { signupAccount } from '../../services/authService';

const createMember = (type) => ({
  id: `${type}_${Date.now()}_${Math.floor(Math.random() * 100000)}`,
  name: '',
  relation: '',
  contact: '',
});

const MemberSection = ({ title, members, setMembers, type }) => {
  const updateMember = (id, key, value) => {
    setMembers((prev) => prev.map((member) => (member.id === id ? { ...member, [key]: value } : member)));
  };

  const removeMember = (id) => {
    setMembers((prev) => (prev.length > 1 ? prev.filter((member) => member.id !== id) : prev));
  };

  return (
    <div className="space-y-3 rounded-xl border border-[var(--border)] p-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[var(--text)]">{title}</p>
        <Button variant="secondary" className="text-xs px-3 py-1" onClick={() => setMembers((prev) => [...prev, createMember(type)])}>
          Add
        </Button>
      </div>

      {members.map((member, index) => (
        <div key={member.id} className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Input
            label={`${title} Name ${index + 1}`}
            placeholder="Full name"
            value={member.name}
            onChange={(e) => updateMember(member.id, 'name', e.target.value)}
          />
          <Input
            label="Relation"
            placeholder="Relation in family"
            value={member.relation}
            onChange={(e) => updateMember(member.id, 'relation', e.target.value)}
          />
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                label="Contact"
                placeholder="Phone or email"
                value={member.contact}
                onChange={(e) => updateMember(member.id, 'contact', e.target.value)}
              />
            </div>
            <div className="flex items-end pb-0.5">
              <Button
                variant="danger"
                className="text-xs px-3 py-2"
                disabled={members.length === 1}
                onClick={() => removeMember(member.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [elders, setElders] = useState([createMember('elder')]);
  const [familyMembers, setFamilyMembers] = useState([createMember('family')]);

  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    relation: '',
    contact: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const helperText = useMemo(
    () =>
      'Username creates one relation group. Reminders are shared for everyone in the same username group.',
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    try {
      signupAccount({
        username,
        password,
        elders,
        familyMembers,
        emergencyContact,
      });

      setSuccess('Signup complete. You can now login and choose your profile.');
      setTimeout(() => navigate(ROUTES.LOGIN), 900);
    } catch (err) {
      setError(err.message || 'Signup failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-8">
      <div className="mx-auto w-full max-w-4xl space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Create Account</h1>
          <p className="text-sm text-[var(--muted)] mt-1">{helperText}</p>
        </div>

        <Card className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Input
                label="Username"
                placeholder="Choose a unique username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <MemberSection title="Elder" members={elders} setMembers={setElders} type="elder" />
            <MemberSection
              title="Family Member"
              members={familyMembers}
              setMembers={setFamilyMembers}
              type="family"
            />

            <div className="space-y-3 rounded-xl border border-[var(--border)] p-4">
              <p className="font-semibold text-[var(--text)]">Emergency Contact</p>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <Input
                  label="Name"
                  placeholder="Emergency contact name"
                  value={emergencyContact.name}
                  onChange={(e) => setEmergencyContact((prev) => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  label="Relation"
                  placeholder="Relation"
                  value={emergencyContact.relation}
                  onChange={(e) => setEmergencyContact((prev) => ({ ...prev, relation: e.target.value }))}
                />
                <Input
                  label="Contact"
                  placeholder="Phone or email"
                  value={emergencyContact.contact}
                  onChange={(e) => setEmergencyContact((prev) => ({ ...prev, contact: e.target.value }))}
                />
              </div>
            </div>

            {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
            {success ? <p className="text-sm text-[var(--primary)]">{success}</p> : null}

            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit">Create Account</Button>
              <Link to={ROUTES.LOGIN} className="text-sm font-semibold text-[var(--primary)]">
                Already registered? Login
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;