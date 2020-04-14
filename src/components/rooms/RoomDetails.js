/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import {
  Grid,
  Icon,
  Button,
  Card,
  Form,
  Dimmer,
  Loader,
  Divider,
} from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import * as opencage from 'opencage-api-client';
import { useParams, useHistory } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';
import { SearchContext } from 'context/searches/searchState';
import { DatesRangeInput } from 'semantic-ui-calendar-react';

export default () => {
  const { id } = useParams();
  const history = useHistory();

  const { search, setSearch } = useContext(SearchContext);

  const [room, setRoom] = useState(null);
  const [position, setPosition] = useState('');
  const [guests, setGuests] = useState();
  const [datesRange, setDatesRange] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // fetch room data
      let response = await axiosInstance.get(`/api/v1/rooms/${id}`);
      const data = response.data;
      setRoom(data);

      // fetch lat, lng
      response = await opencage.geocode({
        key: process.env.REACT_APP_OPENCAGE_API_KEY,
        q: data.location,
      });
      const { geometry } = response.results[0];
      const lat = geometry.lat;
      const lng = geometry.lng;

      setPosition([lat, lng]);

      // set form fields
      setGuests(search.guests);
      setDatesRange(search.datesRange);
      setLoading(false);
    };
    if (search) fetchData();
    else history.push('/');
  }, []);

  const renderPictures = () => {
    return room.pictures.map((picture) => {
      return <img key={picture.id} src={picture.path} alt={picture.id} />;
    });
  };

  if (!room || !position) return null;

  return (
    <div>
      <Dimmer active={loading}>
        <Loader>Loading</Loader>
      </Dimmer>

      <Grid>
        <Grid.Row>
          <Grid.Column width={11}>
            <h1 className="mb-05r">{room.name}</h1>
            <h3 className="mt-05r">{room.location}</h3>

            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <div>
                    <Icon name="star" color="red" />
                    <span>
                      4.7 <span className="gray">(30)</span>
                    </span>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="text-right">
                    <Button basic id="button-bookmark">
                      <Icon name="heart" />
                      Save
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>

            <div className="mt-1r">
              <Carousel showIndicators={true}>{renderPictures()}</Carousel>

              <div className="border-bottom"></div>
              <p className="mt-2r">
                {room.guests} guests · {room.type.value} · {room.bedrooms}·{' '}
                {room.beds} beds · {room.baths} baths
              </p>
              <p className="mt-1r">{room.description}</p>

              <h1>Location</h1>
              <div className="map-container">
                <Map center={position} zoom={16}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={position}>
                    <Popup>This is the place!</Popup>
                  </Marker>
                </Map>
              </div>

              <div className="border-bottom mt-2r mb-2r"></div>
              <div className="reviews">
                <h3>
                  <Icon name="star" color="red" />
                  4.87 (15 reviews)
                </h3>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Card>
                        <Card.Content>
                          <Card.Header>Matthew Harris</Card.Header>
                          <Card.Meta>3 days ago</Card.Meta>
                          <Card.Description>
                            Matthew is a pianist living in Nashville.
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                    <Grid.Column>
                      <Card>
                        <Card.Content>
                          <Card.Header>Matthew Harris</Card.Header>
                          <Card.Meta>4 days ago</Card.Meta>
                          <Card.Description>
                            Matthew is a pianist living in Nashville.
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </div>
          </Grid.Column>

          <Grid.Column width={5}>
            <div className="border-form mt-8r">
              <Button fluid>Search again</Button>
              <Divider horizontal>Or</Divider>
              <h1>Book now</h1>

              <Form fluid>
                <Form.Field>
                  <label>Booking</label>
                  <DatesRangeInput
                    name="datesRange"
                    placeholder="From - To"
                    value={datesRange}
                    iconPosition="left"
                    popupPosition="bottom left"
                    animation="none"
                    minDate={new Date()}
                    disable={true}
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    label="Guests"
                    placeholder="Guests"
                    value={guests}
                    readOnly
                  />
                </Form.Field>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column>Rp 300.000 x 5 nights</Grid.Column>
                    <Grid.Column>
                      <div className="text-right bold">Rp 1.500.000</div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <div className="border-bottom mt-1r mb-1r"></div>
                <Form.Field control={Button} positive fluid>
                  Confirm
                </Form.Field>
              </Form>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
