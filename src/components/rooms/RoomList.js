/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Card,
  Button,
  Icon,
  Image,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';
import moment from 'moment';
import formatCurrency from 'utils/formatCurrency';
import * as opencage from 'opencage-api-client';

import { SearchContext } from 'context/searches/searchState';
import { RoomContext } from 'context/rooms/roomState';
import TypeOfPlaceModal from './modals/TypeOfPlaceModal';
import PriceModal from './modals/PriceModal';
import SearchDetailsModal from './modals/SearchDetailsModal';
import MapModal from 'components/modals/MapModal';
import { AuthContext } from 'context/auth/authState';

export default () => {
  const { search } = useContext(SearchContext);
  const { rooms, setRooms } = useContext(RoomContext);
  const { auth } = useContext(AuthContext);

  const [position, setPosition] = useState([]);
  const [type, setType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const [openMapModal, setOpenMapModal] = useState(false);

  const [openTypeOfPlace, setOpenTypeOfPlace] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openSearchDetails, setOpenSearchDetails] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      if (
        (minPrice === '' && maxPrice === '') ||
        (maxPrice.length && minPrice.length)
      ) {
        try {
          setLoading(true);
          const queryString = `location=${search.location}&guests=${search.guests}&checkInDate=${search.checkInDate}&minPrice=${minPrice}&maxPrice=${maxPrice}&type=${type}`;
          const response = await axiosInstance.get(
            `/api/v1/rooms/search?${queryString}`
          );
          const data = response.data;

          // show only rooms available
          const result = data.filter((el) => el.bookings.length === 0);
          setRooms(result);
        } catch (err) {
          console.log(err);
        }
        setLoading(false);
      }
    };

    if (search) fetchRooms();
  }, [search, type, minPrice, maxPrice]);

  const handleShowLocation = async (location) => {
    const response = await opencage.geocode({
      key: process.env.REACT_APP_OPENCAGE_API_KEY,
      q: location,
    });
    const { geometry } = response.results[0];
    const lat = geometry.lat;
    const lng = geometry.lng;

    setPosition([lat, lng]);
    setOpenMapModal(true);
  };

  const handleSubmitType = (typesArr) => {
    if (typesArr.length) setType(typesArr.toString());
    setOpenTypeOfPlace(false);
  };

  const handleSubmitPrice = (minPrice, maxPrice) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    setOpenPrice(false);
  };

  const renderContent = () => {
    return rooms.map((room) => {
      return (
        <Grid.Column key={room.id}>
          <Card>
            <Link to={'/rooms/' + room.id}>
              <Image src={room.pictures[0].path} />
            </Link>
            <Card.Content>
              <Card.Header>
                <div>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>
                        <span>{room.name}</span>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </div>
              </Card.Header>
              <Card.Meta>
                <span>{room.type.value}</span>
              </Card.Meta>
              <Card.Description>
                <div>Max. {room.guests} guests</div>
                <h4 className="mt-05r">{formatCurrency(room.price)} / night</h4>
                <div className="mb-05r">{room.location}</div>
                <Button
                  icon
                  labelPosition="left"
                  onClick={() => handleShowLocation(room.location)}
                >
                  <Icon name="map marker alternate" />
                  Show Location
                </Button>
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      );
    });
  };

  if (!auth || !search) return <Redirect to="/" />;

  return (
    <div>
      <TypeOfPlaceModal
        open={openTypeOfPlace}
        setOpen={setOpenTypeOfPlace}
        action={handleSubmitType}
      />
      <PriceModal
        open={openPrice}
        setOpen={setOpenPrice}
        action={handleSubmitPrice}
      />
      <SearchDetailsModal
        open={openSearchDetails}
        setOpen={setOpenSearchDetails}
      />
      <MapModal
        open={openMapModal}
        setOpen={setOpenMapModal}
        position={position}
      />
      <div>
        <h1>Stays in {search.location}</h1>
        <p>
          {rooms.length} stays · {moment(search.checkInDate).format('MMMM Do')}{' '}
          - {moment(search.endDate).format('MMMM Do')} · {search.guests} guests
        </p>
      </div>

      <div className="mt-1r mb-3r">
        <Button className="mr-05r" onClick={() => setOpenTypeOfPlace(true)}>
          Type of Place
        </Button>
        <Button className="mr-05r" onClick={() => setOpenPrice(true)}>
          Price
        </Button>
        <Button className="mr-05r" onClick={() => setOpenSearchDetails(true)}>
          Search Details
        </Button>
      </div>

      <Dimmer active={loading}>
        <Loader>Loading</Loader>
      </Dimmer>

      <Grid columns={3}>
        <Grid.Row>{renderContent()}</Grid.Row>
      </Grid>
    </div>
  );
};
