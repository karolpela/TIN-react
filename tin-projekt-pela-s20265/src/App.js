import Footer from './components/fragments/Footer';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerList from './components/customer/CustomerList';
import CustomerDetails from './components/customer/CustomerDetails';
import CustomerForm from './components/customer/CustomerForm';
import RentalList from './components/rental/RentalList';

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<MainContent />} />

          <Route exact path="/customers" element={<CustomerList />} />
          <Route exact path="/customers/add" element={<CustomerForm />} />
          <Route exact path="/customers/details/:custId" element={<CustomerDetails />} />
          <Route exact path="/customers/edit/:custId" element={<CustomerForm />} />

          <Route exact path="/rentals" element={<RentalList />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
