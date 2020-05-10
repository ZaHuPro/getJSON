import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAlert } from 'react-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock, faLockOpen, faEye, faEdit, faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { shouldHaveAuth } from '../../../utils/Authentication';
import Dash from '../../../Components/Layout/Dashboard';
import {
  List, ListItem, ListContent, FrontIcon, ListTitle, ListAction, Action, URL,
} from '../../../Components/Basic/List';
import { DimText, SubHeadingComp } from '../../../Components/Basic/Text';
import { getMethod, deleteMethod } from '../../../utils/Integration';

function Payload({ myPayload, token }) {
  const alert = useAlert();
  const router = useRouter();

  const syncLogout = (event) => {
    if (event.key === 'logout') {
      router.push('/login');
    }
  };
  useEffect(() => {
    window.addEventListener('storage', syncLogout);
    return () => {
      window.removeEventListener('storage', syncLogout);
    };
  }, []);

  const nullDelete = {
    click: 0,
    id: '',
    intervel: 0,
  };
  const [deleteData, setDeleteData] = useState(nullDelete);
  const [payload, setPayload] = useState(myPayload);

  const handleDetele = async (id) => {
    clearInterval(deleteData.interval);
    if (deleteData.click === 1 && deleteData.id === id) {
      const responseData = await deleteMethod(`payload/${id}`, token);
      if (responseData.success) {
        alert.success(responseData.message);
        const newPayload = await getMethod('payload', token);
        setPayload(newPayload.payload || []);
      } else {
        alert.error(responseData.message || '');
      }
      setDeleteData(nullDelete);
    } else {
      alert.info('Click one more time to confirm Delete');
      const intervel = setInterval(() => {
        setDeleteData(nullDelete);
      }, 4000);
      await setDeleteData({ click: 1, id, intervel });
    }
  };

  return (
    <Dash>
      <SubHeadingComp back="" title="My Payloads" />
      {payload.map((p) => (
        <List key={p.id}>
          <ListItem>
            <FrontIcon>
              {p.visibility === 'public'
                ? <FontAwesomeIcon icon={faLockOpen} />
                : <FontAwesomeIcon icon={faLock} />}
            </FrontIcon>
            <ListContent>
              <ListTitle>{p.title}</ListTitle>
              <DimText>{p.description}</DimText>
              <URL>
                {process.env.PAYLOAD_URL}
                {p.url}
              </URL>
            </ListContent>
            <ListAction>
              <Action>
                <FontAwesomeIcon icon={faEye} />
              </Action>
              <Action>
                <FontAwesomeIcon icon={faEdit} />
              </Action>
              <Action onClick={() => handleDetele(p.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </Action>
            </ListAction>
          </ListItem>
        </List>
      ))}
    </Dash>
  );
}


Payload.getInitialProps = async (ctx) => {
  const token = shouldHaveAuth(ctx);
  const myPayload = await getMethod('payload', token);
  return { myPayload: myPayload.payload, token };
};

export default Payload;
