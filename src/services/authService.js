import { STORAGE_KEYS } from '../constants/storageKeys';
import { getStoredJSON, setStoredJSON } from '../utils/storage';

const AUTH_ACCOUNTS = STORAGE_KEYS.AUTH_ACCOUNTS;
const AUTH_SESSION = STORAGE_KEYS.AUTH_SESSION;

const normalizeUsername = (username) => String(username ?? '').trim().toLowerCase();

const createMemberId = (prefix) => `${prefix}_${Date.now()}_${Math.floor(Math.random() * 100000)}`;

export const getAccounts = () => {
  const accounts = getStoredJSON(AUTH_ACCOUNTS, []);
  return Array.isArray(accounts) ? accounts : [];
};

export const setAccounts = (accounts) => setStoredJSON(AUTH_ACCOUNTS, accounts);

export const getSession = () => {
  const session = getStoredJSON(AUTH_SESSION, null);
  return session && typeof session === 'object' ? session : null;
};

export const setSession = (session) => setStoredJSON(AUTH_SESSION, session);

export const clearSession = () => {
  localStorage.removeItem(AUTH_SESSION);
};

export const getAccountByUsername = (username) => {
  const normalized = normalizeUsername(username);
  return getAccounts().find((item) => normalizeUsername(item.username) === normalized) ?? null;
};

export const getProfilesForAccount = (account) => {
  if (!account) return [];

  const elderProfiles = (account.elders ?? []).map((member) => ({
    id: member.id,
    role: 'elder',
    name: member.name,
    relation: member.relation,
    contact: member.contact,
  }));

  const familyProfiles = (account.familyMembers ?? []).map((member) => ({
    id: member.id,
    role: 'family',
    name: member.name,
    relation: member.relation,
    contact: member.contact,
  }));

  return [...elderProfiles, ...familyProfiles];
};

export const signupAccount = ({
  username,
  password,
  elders,
  familyMembers,
  emergencyContact,
}) => {
  const normalized = normalizeUsername(username);

  if (!normalized) throw new Error('Username is required.');
  if (!password || String(password).trim().length < 4) {
    throw new Error('Password must be at least 4 characters.');
  }
  if (!Array.isArray(elders) || elders.length === 0) {
    throw new Error('At least one elder is required.');
  }
  if (!Array.isArray(familyMembers) || familyMembers.length === 0) {
    throw new Error('At least one family member is required.');
  }

  const existing = getAccountByUsername(normalized);
  if (existing) {
    throw new Error('This username already exists. Please log in.');
  }

  const sanitizedElders = elders.map((member) => ({
    id: member.id || createMemberId('elder'),
    name: String(member.name ?? '').trim(),
    relation: String(member.relation ?? '').trim(),
    contact: String(member.contact ?? '').trim(),
  }));

  const sanitizedFamilyMembers = familyMembers.map((member) => ({
    id: member.id || createMemberId('family'),
    name: String(member.name ?? '').trim(),
    relation: String(member.relation ?? '').trim(),
    contact: String(member.contact ?? '').trim(),
  }));

  const hasInvalidElder = sanitizedElders.some(
    (member) => !member.name || !member.relation || !member.contact
  );
  const hasInvalidFamily = sanitizedFamilyMembers.some(
    (member) => !member.name || !member.relation || !member.contact
  );

  if (hasInvalidElder || hasInvalidFamily) {
    throw new Error('All elder and family member fields are required.');
  }

  const account = {
    username: normalized,
    password: String(password),
    relationId: normalized,
    elders: sanitizedElders,
    familyMembers: sanitizedFamilyMembers,
    emergencyContact: {
      name: String(emergencyContact?.name ?? '').trim(),
      relation: String(emergencyContact?.relation ?? '').trim(),
      contact: String(emergencyContact?.contact ?? '').trim(),
    },
    createdAt: new Date().toISOString(),
  };

  if (!account.emergencyContact.name || !account.emergencyContact.relation || !account.emergencyContact.contact) {
    throw new Error('Emergency contact details are required.');
  }

  const accounts = getAccounts();
  accounts.push(account);
  setAccounts(accounts);

  return account;
};

export const validateCredentials = ({ username, password }) => {
  const account = getAccountByUsername(username);
  if (!account) return null;
  if (String(account.password) !== String(password ?? '')) return null;
  return account;
};

export const createSessionForProfile = (account, profileId) => {
  const profiles = getProfilesForAccount(account);
  const activeProfile = profiles.find((profile) => profile.id === profileId);

  if (!activeProfile) {
    throw new Error('Selected profile was not found.');
  }

  const session = {
    isAuthenticated: true,
    username: account.username,
    relationId: account.relationId,
    activeProfile,
    loggedInAt: new Date().toISOString(),
  };

  setSession(session);
  return session;
};