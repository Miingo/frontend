import { Carousel } from 'react-responsive-carousel';
import config from '../../utils/envConfig';
import { state } from '../../state';
import { useSnapshot } from 'valtio';
import { useEffect } from 'react';
import axios from '../../services/axios-config';

const StatusPopOut = ({ onChange, onClickItem, onClickThumb, statusOwner }) => {
  const snap = useSnapshot(state);
  const statuses = snap.statuses.filter(
    (status) => status.user === statusOwner._id
  );
  useEffect(() => {
    axios
      .get(`/status/${statusOwner._id}`)
      .then((res) => {
        state.statuses = res.data;
      })
      .catch((err) => console.log(err));
  }, [statusOwner._id]);

  return (
    <div>
      <Carousel
        showArrows={true}
        autoPlay
        interval="2000"
        transitionTime="1000"
        showThumbs={false}
        swipeable
        useKeyboardArrows
        onChange={onChange}
        onClickItem={onClickItem}
        onClickThumb={onClickThumb}
      >
        {statuses.map((status) => (
          <div style={{ height: '70vh' }} key={status._id}>
            <img
              style={{ marginTop: 10 }}
              src={
                `${config.API_URL}${status.file}` ||
                `https://ui-avatars.com/api/?name=${statusOwner?.name}`
              }
              alt="status"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default StatusPopOut;
