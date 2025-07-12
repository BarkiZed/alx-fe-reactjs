import WelcomeMessage from './components/WelcomeMessage';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
    return (
        <>
            <WelcomeMessage />
            {/* Other existing components can stay here */}
        </>
        <div className="app">
          <Header />
          <MainContent />
          <Footer />
        </div>
    );
}

export default App;
