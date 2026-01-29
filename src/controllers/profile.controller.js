/**
 * Profile Controller
 * Handles user profile operations
 */

async function getProfile(pool, req, res) {
  if (!req.user?.id) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  try {
    const userResult = await pool.query(
      `SELECT id, email, phone, phone_number, created_at
       FROM users
       WHERE id = $1 AND deleted_at IS NULL`,
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ ok: false, error: 'User not found' });
    }

    const user = userResult.rows[0];

    // Try to get onboarding profile for additional info
    const onboardingResult = await pool.query(
      `SELECT age, gender, goal, body_type
       FROM user_onboarding_profiles
       WHERE user_id = $1`,
      [req.user.id]
    );

    const onboarding = onboardingResult.rows[0] || null;

    const profile = {
      id: String(user.id),
      name: user.email ? user.email.split('@')[0] : `User ${user.id}`,
      email: user.email || null,
      phone: user.phone || user.phone_number || null,
      relationship: 'Người chăm sóc',
      avatarUrl: null,
      ...(onboarding && {
        age: onboarding.age,
        gender: onboarding.gender,
        goal: onboarding.goal,
        bodyType: onboarding.body_type
      })
    };

    return res.status(200).json({ ok: true, profile });
  } catch (err) {
    console.error('get profile failed:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

async function updateProfile(pool, req, res) {
  if (!req.user?.id) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  const { name, phone } = req.body || {};

  try {
    // We store the name as part of email or phone for now
    // In future, add a name column to users table
    if (phone) {
      await pool.query(
        `UPDATE users SET phone_number = $2, updated_at = NOW() WHERE id = $1`,
        [req.user.id, phone]
      );
    }

    return res.status(200).json({ ok: true, message: 'Profile updated' });
  } catch (err) {
    console.error('update profile failed:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

async function deleteAccount(pool, req, res) {
  if (!req.user?.id) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  try {
    await pool.query(
      `UPDATE users SET deleted_at = NOW() WHERE id = $1`,
      [req.user.id]
    );

    return res.status(200).json({ ok: true, message: 'Account deleted' });
  } catch (err) {
    console.error('delete account failed:', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount
};
