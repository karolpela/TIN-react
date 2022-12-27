import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getEquipmentByIdApiCall } from '../../apiCalls/equipmentApiCalls';
import EquipmentDetailsData from './EquipmentDetailsData';

class EquipmentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      equipment: null,
      error: null,
      isLoaded: false,
      message: null
    };
  }

  componentDidMount() {
    this.fetchEquipmentDetails();
  }

  fetchEquipmentDetails = () => {
    let equipmentId = parseInt(this.props.match.params.equipmentId);
    getEquipmentByIdApiCall(equipmentId)
      .then((res) => res.json())
      .then(
        (data) => {
          if (data.message) {
            this.setState({
              equipment: null,
              message: data.message
            });
          } else {
            this.setState({
              equipment: data,
              message: null
            });
          }
          this.setState({
            isLoaded: true
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
    const { equipment, error, isLoaded, message } = this.state;
    let content;

    if (error) {
      content = <p>err: {error.message}</p>;
    } else if (!isLoaded) {
      content = <p>loading...</p>;
    } else if (message) {
      content = <p>{message}</p>;
    } else {
      content = <EquipmentDetailsData equipmentData={equipment} />;
    }

    return (
      <main>
        <h2>eq det</h2>
        {content}
        <div className="sectionButtons">
          <Link to="/equipment" className="form-button-back">
            ret
          </Link>
        </div>
      </main>
    );
  }
}

export function withRouter(Children) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

export default withRouter(EquipmentDetails);
