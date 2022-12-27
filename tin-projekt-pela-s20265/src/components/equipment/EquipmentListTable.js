import EquipmentListTableRow from './EquipmentListTableRow';

function EquipmentListTable(props) {
  const equipment = props.equipment;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>tp</th>
          <th>pr</th>
          <th>sz</th>
          <th>ac</th>
        </tr>
      </thead>
      <tbody>
        {equipment.map((equipment) => (
          <EquipmentListTableRow equipmentData={equipment} key={equipment._id} />
        ))}
      </tbody>
    </table>
  );
}

export default EquipmentListTable;
