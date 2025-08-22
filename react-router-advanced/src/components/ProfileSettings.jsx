const ProfileSettings = () => {
  return (
    <div className="profile-settings">
      <h2>Profile Settings</h2>
      <form className="settings-form">
        <div className="form-group">
          <label htmlFor="notifications">Email Notifications:</label>
          <select id="notifications">
            <option value="all">All</option>
            <option value="important">Important only</option>
            <option value="none">None</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="theme">Theme:</label>
          <select id="theme">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System default</option>
          </select>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default ProfileSettings;