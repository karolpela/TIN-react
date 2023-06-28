import RepairListTableRow from './RepairListTableRow';
import { useTranslation } from 'react-i18next';

function RepairListTable(props) {
  const { t } = useTranslation();
  const repairs = props.repairs;
  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t('repair.fields.service')}</th>
          <th>{t('repair.fields.employee')}</th>
          <th>{t('repair.fields.problem')}</th>
          <th>{t('repair.fields.status')}</th>
          <th>{t('list.actions.title')}</th>
        </tr>
      </thead>
      <tbody>
        {repairs
          .sort((a, b) => {
            let order = ['w trakcie', 'zgłoszona', 'zakończona'];
            return order.indexOf(a.status) - order.indexOf(b.status);
          })
          .map((repair) => (
            <RepairListTableRow repairData={repair} key={repair._id} />
          ))}
      </tbody>
    </table>
  );
}

export default RepairListTable;
