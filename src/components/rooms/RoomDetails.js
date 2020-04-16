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
import { BookmarkContext } from 'context/bookmarks/bookmarkState';

import { DatesRangeInput } from 'semantic-ui-calendar-react';
import formatCurrency from 'utils/formatCurrency';
import getDiffDays from 'utils/getDiffDays';
import addDaysAndFormat from 'utils/addDaysAndFormat';
import moment from 'moment';

export default () => {
  const { id } = useParams();
  const history = useHistory();

  const { search } = useContext(SearchContext);
  const { bookmarks, addBookmark, deleteBookmark } = useContext(
    BookmarkContext
  );

  const [room, setRoom] = useState(null);
  const [totalReviews, setTotalReviews] = useState(null);
  const [avgRatings, setAvgRatings] = useState(null);
  const [position, setPosition] = useState('');
  const [guests, setGuests] = useState();
  const [datesRange, setDatesRange] = useState();
  const [diffDays, setDiffDays] = useState(0);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);

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
      const diff = getDiffDays(search.checkInDate, search.endDate);
      setDiffDays(diff);
      setPrice(diff * data.price);
      setLoading(false);

      // set total reviews and average ratings
      setTotalReviews(data.reviews.length);
      let count = 0;
      for (const review of data.reviews) {
        count += review.ratings;
      }
      setAvgRatings((count / data.reviews.length).toFixed(1));
    };
    if (search) fetchData();
    else history.push('/');
  }, []);

  const renderPictures = () => {
    return room.pictures.map((picture) => {
      return <img key={picture.id} src={picture.path} alt={picture.id} />;
    });
  };

  const handleConfirm = async () => {
    const data = {
      roomId: id * 1,
      checkInDate: addDaysAndFormat(search.checkInDate, 0),
      checkOutDate: addDaysAndFormat(search.endDate, 1),
      guests: search.guests * 1,
      price,
    };

    try {
      setLoadingConfirm(true);
      await axiosInstance.post('/api/v1/bookings', data);
      setLoadingConfirm(false);
      history.push('/bookings');
    } catch (err) {
      console.log(err);
      setLoadingConfirm(false);
    }
  };

  const renderReviews = () => {
    if (room.reviews) {
      return room.reviews.map((review) => {
        return (
          <Grid.Column key={review.id}>
            <Card>
              <Card.Content>
                <Card.Header>{review.username}</Card.Header>
                <Card.Meta>
                  {moment(review.updatedAt, 'YYYYMMDD').fromNow()}
                </Card.Meta>
                <Card.Description>{review.comments}</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        );
      });
    } else return null;
  };

  const handleAddBookmark = async (room) => {
    await axiosInstance.post('api/v1/users/bookmarks', {
      roomId: room.id * 1,
    });
    addBookmark(room);
  };

  const handleDeleteBookmark = async (roomId) => {
    await axiosInstance.delete(`api/v1/users/bookmarks/rooms/${roomId}`);
    deleteBookmark(id * 1);
  };

  const renderBookmarkButton = () => {
    const bookmark = bookmarks.find((room) => room.id === parseInt(id));
    if (bookmark) {
      // render delete
      return (
        <Button
          basic
          color="red"
          id="button-bookmark"
          onClick={() => {
            handleDeleteBookmark(id);
          }}
        >
          <Icon name="heart" />
          Bookmarked
        </Button>
      );
    } else {
      // render add
      return (
        <Button
          basic
          id="button-bookmark"
          onClick={() => {
            handleAddBookmark(room);
          }}
        >
          <Icon name="heart" />
          Bookmark
        </Button>
      );
    }
  };

  if (!room || !position || !search || !datesRange) return null;

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
                    <span>
                      {totalReviews ? (
                        <span>
                          <Icon name="star" color="red" />
                          <span>{avgRatings}</span>
                          <span className="gray"> ({totalReviews})</span>
                        </span>
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <div className="text-right">{renderBookmarkButton()}</div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <div className="mt-1r">
              <Carousel showIndicators={true}>{renderPictures()}</Carousel>

              <div className="border-bottom"></div>
              <p className="mt-2r">
                {room.guests} guests · {room.type.value} · {room.bedrooms}{' '}
                bedrooms · {room.beds} beds · {room.baths} baths
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
                  {totalReviews ? (
                    <span>
                      <Icon name="star" color="red" />
                      <span>
                        {avgRatings} ({totalReviews} reviews)
                      </span>
                    </span>
                  ) : (
                    ''
                  )}
                </h3>
                <Grid columns={2}>
                  <Grid.Row>{renderReviews()}</Grid.Row>
                </Grid>
              </div>
            </div>
          </Grid.Column>

          <Grid.Column width={5}>
            <div className="border-form mt-8r">
              <h3>Hmm... Not quite what I expected</h3>
              <Button fluid={true} onClick={() => history.push('/rooms')}>
                Search again
              </Button>

              <Divider horizontal>Or</Divider>

              <h1>Book now</h1>
              <Form>
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
                    onChange={() => {}}
                    disable="true"
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
                    <Grid.Column>
                      {formatCurrency(room.price)} x {diffDays} nights
                    </Grid.Column>
                    <Grid.Column>
                      <div className="text-right bold">
                        {formatCurrency(price)}
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <div className="border-bottom mt-1r mb-1r"></div>
                <Form.Field
                  control={Button}
                  positive
                  fluid={true}
                  onClick={handleConfirm}
                  loading={loadingConfirm}
                >
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
