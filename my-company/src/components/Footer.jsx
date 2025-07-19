function Footer() {
  return (
    <footer style={{ textAlign: 'center', marginTop: '20px', padding: '10px', background: '#eee' }}>
      &copy; {new Date().getFullYear()} My Company. All rights reserved.
    </footer>
  );
}

export default Footer;
