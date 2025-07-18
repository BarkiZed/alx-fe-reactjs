function UserProfile(props) {
  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px',
      backgroundColor: '#f9f9f9'
    }}>
      <h2 style={{ color: '#2c3e50', marginTop: '0' }}>{props.name}</h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}>{props.age}</span></p>
      <p>Bio: {props.bio}</p>
    </div>
  );
}
export default UserProfile;