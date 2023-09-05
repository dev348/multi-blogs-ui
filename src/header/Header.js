import React from 'react';

function Header() {
  return (
    <header>
      <h1>Multi-Language Blog</h1>
      <select id="languageSelect">
        <option value="en">English</option>
        <option value="fr">French</option>
        {/* Add more language options as needed */}
      </select>
    </header>
  );
}

export default Header;
