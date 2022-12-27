import React from 'react';
import { Link } from 'react-router-dom';
import { getEquipmentApiCall } from '../../apiCalls/equipmentApiCalls';
import EquipmentListTable from './EquipmentListTable';

class EquipmentList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      equipment: []
    };
  }

  componentDidMount() {
    this.fetchEquipmentList();
  }

  fetchEquipmentList = () => {
    getEquipmentApiCall()
      .then((res) => res.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            equipment: data
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  };

  render() {
    const { error, isLoaded, equipment } = this.state;

    let content;

    if (error) {
      content = <p>err: {error.message}</p>;
    } else if (!isLoaded) {
      content = <p>loading...</p>;
    } else if (equipment.length === 0) {
      content = <p>no equipment</p>;
    } else {
      content = <EquipmentListTable equipment={equipment} />;
    }

    return (
      <main>
        <h2>eq list</h2>
        {content}
        <p className="section-buttons">
          <Link to="/equipment/add" className="button-add">
            add new
          </Link>
        </p>
      </main>
    );
  }
}

export default EquipmentList;
