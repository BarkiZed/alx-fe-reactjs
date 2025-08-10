function MainContent() {
  return (
    <main style={{
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
      minHeight: 'calc(100vh - 200px)'
    }}>
      <UserProfile 
        name="John Doe" 
        age={28} 
        bio="I love to visit New York, Paris, and Tokyo."
      />
      <UserProfile 
        name="Jane Smith" 
        age={32} 
        bio="Food blogger who enjoys exploring new cultures."
      />
    </main>
  );
}
