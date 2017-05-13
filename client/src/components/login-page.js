import React from 'react';

export default function LoginPage() {
  return (
    <div id="google">
      <h1>Aprenda Portugues</h1>
      <p>Aprenda is a web app for those who want to learn or improve their
      Portuguese by using the space repetition method</p>
      <button><a href={'/api/auth/google'}>Login with Google</a></button>
    </div>
  )
}
