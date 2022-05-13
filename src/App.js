import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className='bg-slate-200 h-screen'>
      <Header name={'joe'} />
      <Main />
      <Footer />
    </div>
  );
}

export default App;

