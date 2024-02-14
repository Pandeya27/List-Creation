// src/FailureView.js
import React from 'react';

function FailureView({ error }) {
  return <div>Failed to load: {error}</div>;
}

export default FailureView;