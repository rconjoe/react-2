import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ backgroundColor: 'gray', height: '100vh' }}>
      <Header name={'joe'} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

