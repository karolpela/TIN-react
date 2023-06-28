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
import EmployeeOnlyRoute from './components/other/EmployeeOnlyRoute';
import ProtectedRoute from './components/other/ProtectedRoute';
import ServiceList from './components/service/ServiceList';
import ServiceDetails from './components/service/ServiceDetails';
import ServiceForm from './components/service/ServiceForm';
import DeleteResource from './components/other/DeleteResource';
import { deleteCustomerApiCall } from './apiCalls/customerApiCalls';
import RepairForm from './components/repair/RepairForm';
import RepairDetails from './components/repair/RepairDetails';
import RepairList from './components/repair/RepairList';
import AdminOnlyRoute from './components/other/AdminOnlyRoute';
import { deleteEquipmentApiCall } from './apiCalls/equipmentApiCalls';
import { deleteRepairApiCall } from './apiCalls/repairApiCalls';
import { deleteServiceApiCall } from './apiCalls/serviceApiCalls';
import { deleteRentalApiCall } from './apiCalls/rentalApiCalls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    };
  }

  handleLogin = (user) => {
    localStorage.setItem('user', user);
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
            <Route exact path="/login" element={<LoginForm handleLogin={this.handleLogin} />} />
            <Route
              exact
              path="/customers"
              element={
                <ProtectedRoute component={<EmployeeOnlyRoute component={<CustomerList />} />} />
              }
            />
            <Route
              exact
              path="/customers/add"
              element={<EmployeeOnlyRoute component={<CustomerForm />} />}
            />
            <Route
              exact
              path="/customers/details/:customerId"
              element={<EmployeeOnlyRoute component={<CustomerDetails />} />}
            />
            <Route
              exact
              path="/customers/edit/:customerId"
              element={<EmployeeOnlyRoute component={<CustomerForm />} />}
            />

            <Route
              exact
              path="/customers/delete/:id"
              element={
                <EmployeeOnlyRoute
                  component={<DeleteResource apiCall={deleteCustomerApiCall} path="/customers" />}
                />
              }
            />

            <Route exact path="/rentals" element={<ProtectedRoute component={<RentalList />} />} />
            <Route
              exact
              path="/rentals/add"
              element={<EmployeeOnlyRoute component={<RentalForm />} />}
            />
            <Route
              exact
              path="/rentals/details/:rentalId"
              element={<ProtectedRoute component={<RentalDetails />} />}
            />
            <Route
              exact
              path="/rentals/edit/:rentalId"
              element={<EmployeeOnlyRoute component={<RentalForm />} />}
            />
            <Route
              exact
              path="/rentals/delete/:id"
              element={
                <EmployeeOnlyRoute
                  component={<DeleteResource apiCall={deleteRentalApiCall} path="/rentals" />}
                />
              }
            />

            <Route
              exact
              path="/services"
              element={<AdminOnlyRoute component={<ServiceList />} />}
            />
            <Route
              exact
              path="/services/add"
              element={<AdminOnlyRoute component={<ServiceForm />} />}
            />
            <Route
              exact
              path="/services/details/:serviceId"
              element={<AdminOnlyRoute component={<ServiceDetails />} />}
            />
            <Route
              exact
              path="/services/edit/:serviceId"
              element={<AdminOnlyRoute component={<ServiceForm />} />}
            />

            <Route
              exact
              path="/services/delete/:id"
              element={
                <AdminOnlyRoute
                  component={<DeleteResource apiCall={deleteServiceApiCall} path="/services" />}
                />
              }
            />

            <Route
              exact
              path="/repairs"
              element={<EmployeeOnlyRoute component={<RepairList />} />}
            />
            <Route
              exact
              path="/repairs/add"
              element={<EmployeeOnlyRoute component={<RepairForm />} />}
            />
            <Route
              exact
              path="/repairs/details/:repairId"
              element={<EmployeeOnlyRoute component={<RepairDetails />} />}
            />
            <Route
              exact
              path="/repairs/edit/:repairId"
              element={<EmployeeOnlyRoute component={<RepairForm />} />}
            />

            <Route
              exact
              path="/repairs/delete/:id"
              element={
                <EmployeeOnlyRoute
                  component={<DeleteResource apiCall={deleteRepairApiCall} path="/repairs" />}
                />
              }
            />

            <Route exact path="/equipment" element={<EquipmentList />} />
            <Route exact path="/equipment/add" element={<EquipmentForm />} />
            <Route exact path="/equipment/details/:equipmentId" element={<EquipmentDetails />} />
            <Route exact path="/equipment/edit/:equipmentId" element={<EquipmentForm />} />
            <Route
              exact
              path="/equipment/delete/:id"
              element={
                <EmployeeOnlyRoute
                  component={<DeleteResource apiCall={deleteEquipmentApiCall} path="/equipment" />}
                />
              }
            />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
