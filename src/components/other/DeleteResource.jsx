/* eslint-disable unused-imports/no-unused-vars */
// import { useEffect } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

function DeleteResource(props) {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const promise = props.apiCall(id);
  const path = props.path;

  let response;

  useEffect(() => {
    if (promise) {
      promise.then(
        (data) => {
          response = data;
          if (response.status === 200) {
            navigate(path, {
              state: { notice: { message: t('delete.success'), type: 'success' } },
              replace: true
            });
          } else {
            navigate(path, {
              state: { notice: { message: t('delete.fail'), type: 'fail' } },
              replace: true
            });
          }
        },
        (error) => {
          navigate(path, {
            state: { notice: { message: t('delete.fail'), type: 'fail' } },
            replace: true
          });
        }
      );
    }
  });
}

export default DeleteResource;
