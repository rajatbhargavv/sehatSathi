import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import { ROUTES } from '../../constants/routes';
import {
  createSessionForProfile,
  getProfilesForAccount,
  validateCredentials,
} from '../../services/authService';
import { useApp } from '../../app/providers/useApp';

const LoginPage = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [matchedAccount, setMatchedAccount] = useState(null);
  const [selectedProfileId, setSelectedProfileId] = useState('');

  const profiles = useMemo(() => getProfilesForAccount(matchedAccount), [matchedAccount]);

  const handleCredentialsSubmit = (e) => {
    e.preventDefault();
    setError('');

    const account = validateCredentials({ username, password });
    if (!account) {
      setMatchedAccount(null);
      setSelectedProfileId('');
      setError('Invalid username or password.');
      return;
    }

    setMatchedAccount(account);
    setSelectedProfileId('');
  };

  const handleProfileContinue = () => {
    if (!matchedAccount) return;
    if (!selectedProfileId) {
      setError('Select who is logging in.');
      return;
    }

    try {
      createSessionForProfile(matchedAccount, selectedProfileId);
      refreshAuth();
      navigate(ROUTES.HOME, { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to complete login.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] px-4 py-8">
      <div className="mx-auto w-full max-w-xl space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text)]">Login</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Use your username and password, then select your elder/family profile.
          </p>
        </div>

        <Card className="space-y-4">
          <form onSubmit={handleCredentialsSubmit} className="space-y-3">
            <Input
              label="Username"
              placeholder="Enter username"
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
            <div className="flex items-center gap-3">
              <Button type="submit">Verify Credentials</Button>
              <Link to={ROUTES.SIGNUP} className="text-sm font-semibold text-[var(--primary)]">
                Create account
              </Link>
            </div>
          </form>

          {matchedAccount ? (
            <div className="space-y-3 rounded-xl border border-[var(--border)] p-4">
              <p className="font-semibold text-[var(--text)]">Who are you?</p>
              <p className="text-sm text-[var(--muted)]">
                Account: {matchedAccount.username}. Select your profile to continue.
              </p>

              <div className="flex flex-wrap gap-2">
                {profiles.map((profile) => {
                  const label = `${profile.name} (${profile.role})${profile.relation ? ` - ${profile.relation}` : ''}`;
                  return (
                    <Chip
                      key={profile.id}
                      label={label}
                      selected={selectedProfileId === profile.id}
                      onClick={() => setSelectedProfileId(profile.id)}
                    />
                  );
                })}
              </div>

              <Button onClick={handleProfileContinue}>Continue to App</Button>
            </div>
          ) : null}

          {error ? <p className="text-sm text-[var(--danger)]">{error}</p> : null}
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;