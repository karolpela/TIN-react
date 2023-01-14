import React from 'react';
import Footer from './components/fragments/Footer';
import Header from './components/fragments/Header';
import Navigation from './components/fragments/Navigation';
import MainContent from './components/other/MainContent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerList from './components/customer/CustomerList';
import CustomerDetails from './components/customer/CustomerDetails';
import CustomerForm from './components/customer/CustomerForm';
import RentalList from './components/rental/RentalList';
import RentalDetails from './components/rental/RentalDetails';
import RentalForm from './components/rental/RentalForm';
import EquipmentList from './components/equipment/EquipmentList';
import EquipmentDetails from './components/equipment/EquipmentDetails';
import EquipmentForm from './components/equipment/EquipmentForm';
import LoginForm from './components/other/LoginForm';
import { getCurrentUser } from './helpers/authHelper';
import ProtectedRoute from './components/other/ProtectedRoute';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  handleLogin = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ user: user });
  };

  handleLogout = () => {
    localStorage.removeItem('user');
    this.setState({ user: undefined });
  };

  componentDidMount() {
    const currentUser = getCurrentUser();
    this.setState({ user: currentUser });
  }

  render() {
    return (
      <div className="content">
        <Header />
        <BrowserRouter>
          <Navigation handleLogout={this.handleLogout} />
          <Routes>
            <Route exact path="/" element={<MainContent />} />
            <Route
              exact
              path="/login"
              element={<LoginForm handleLogin={() => this.handleLogin(this.props)} />}
            />

            <Route exact path="/customers" element={<CustomerList />} />
            <Route exact path="/customers/add" element={<CustomerForm />} />
            <Route exact path="/customers/details/:customerId" element={<CustomerDetails />} />
            <Route exact path="/customers/edit/:customerId" element={<CustomerForm />} />

            <Route exact path="/rentals" element={<ProtectedRoute component={<RentalList />} />} />
            <Route exact path="/rentals/add" element={<RentalForm />} />
            <Route exact path="/rentals/details/:rentalId" element={<RentalDetails />} />
            <Route exact path="/rentals/edit/:rentalId" element={<RentalForm />} />

            <Route exact path="/equipment" element={<EquipmentList />} />
            <Route exact path="/equipment/add" element={<EquipmentForm />} />
            <Route exact path="/equipment/details/:equipmentId" element={<EquipmentDetails />} />
            <Route exact path="/equipment/edit/:equipmentId" element={<EquipmentForm />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
