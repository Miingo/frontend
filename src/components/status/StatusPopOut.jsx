import { Carousel } from 'react-responsive-carousel'
import axios from '../../services/axios-config'
import config from '../../utils/envConfig'
import { useEffect } from 'react'
import { useState } from 'react'

const StatusPopOut = ({ onChange, onClickItem, onClickThumb, statusOwner }) => {
	const [statuses, setStatuses] = useState([])

	useEffect(() => {
		axios
			.get(`/user/${statusOwner?.user?._id}/status/view`)
			.then(res => {
				setStatuses(res.data)
			})
			.catch(err => console.log(err))
	}, [statusOwner])

	return (
		<div>
			<Carousel showArrows={true} autoPlay interval="2000" transitionTime="1000" showThumbs={false} swipeable useKeyboardArrows onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}>
				{statuses.map(status => (
					<img style={{ marginTop: 10 }} height="500px" width="400px" key={status._id} objectfit="contain" src={ status.file ?` ${config.API_URL}post/stream-video?streamFile=${status.file}` : `https://ui-avatars.com/api/?name=${status?.user?.name}`} alt="status" />
					// <video style={{ marginTop: 10 }} height="500px" width="400px" key={status._id} objectFit="contain" src={`${config.API_URL}post/stream-video?streamFile=${status.file}` || `https://ui-avatars.com/api/?name=${status?.user?.name}`} alt="status" />
				))}
			</Carousel>
		</div>
	)
}

export default StatusPopOut
