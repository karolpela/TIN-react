import EquipmentListTableRow from './EquipmentListTableRow';
import { useTranslation } from 'react-i18next';

function EquipmentListTable(props) {
  const { t } = useTranslation();
  const equipment = props.equipment;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t('equipment.fields.type')}</th>
          <th>{t('equipment.fields.purpose')}</th>
          <th>{t('equipment.fields.size')}</th>
          <th>{t('list.actions.title')}</th>
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
