const sanitizeUser = (user) => {
  if (!user) return null;
  const plain = typeof user.toJSON === 'function' ? user.toJSON() : user;

  return {
    id: plain.id || plain._id?.toString() || plain._id,
    email: plain.email,
    username: plain.username,
    fullName: plain.fullName,
    avatarUrl: plain.avatarUrl,
    role: plain.role || 'user',
    createdAt: plain.createdAt ? new Date(plain.createdAt).toISOString() : undefined,
    updatedAt: plain.updatedAt ? new Date(plain.updatedAt).toISOString() : undefined,
  };
};

export default sanitizeUser;
