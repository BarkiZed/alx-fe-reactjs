import UserProfile from './UserProfile';

function MainContent() {
  return (
    <main style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <UserProfile 
        name="John Doe" 
        age={28} 
        bio="Travel enthusiast and photography lover."
      />
      <UserProfile 
        name="Jane Smith" 
        age={32} 
        bio="Food blogger who enjoys exploring new cultures."
      />
    </main>
  );
}
export default MainContent;