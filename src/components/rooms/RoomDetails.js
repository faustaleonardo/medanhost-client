import React from 'react';
import { Grid, Icon, Button, Card, Form } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import Pagination from 'components/partials/Pagination';
import MapContainer from 'components/partials/MapContainer';

export default () => {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column width={11}>
            <h1 className="mb-05r">CBD Ayola</h1>
            <h3 className="mt-05r">
              Jalan Ustad Abdul Hamid No.32, Tanjungbalai
            </h3>

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
              <Carousel showIndicators={true}>
                <img
                  src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large"
                  alt="house-1"
                />
                <img
                  src="https://a0.muscache.com/im/pictures/cb43c75f-f3ed-4a80-afdf-51ed9d91f36d.jpg?aki_policy=large"
                  alt="house-2"
                />
              </Carousel>

              <div className="border-bottom"></div>
              <p className="mt-2r">4 guests · Studio · 3 beds · 1 bath</p>
              <p className="mt-1r">
                This 55m2 open plan studio apartment is located on the 4th floor
                of a heritage listed building in historic Woolloomooloo. Sleep
                up to 4 persons with 2 x queen beds and 1 sofa bed. This
                apartment does not contain internal laundry facilities. A coin
                operated laundry is located on level 1 of the building. Your
                apartment includes all linen and amenities. A full linen change
                and apartment clean is provided once per week for a stay of 10
                days or more. Car parking is available at no charge which must
                be booked in advance. Cots can be provided free of charge -
                please advise in advance if required.
              </p>

              <h1>Location</h1>
              <div className="map-container">
                <MapContainer />
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
                <Pagination />
              </div>
            </div>
          </Grid.Column>

          <Grid.Column width={5}>
            <div className="border-form mt-8r">
              <h1>Book your room now</h1>
              <Form fluid>
                <Form.Group widths="equal">
                  <Form.Input fluid label="Check in" placeholder="Check in" />
                  <Form.Input fluid label="Check out" placeholder="Check out" />
                </Form.Group>
                <Form.Field>
                  <Form.Input label="Guests" placeholder="Guests" />
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
                  Book
                </Form.Field>
              </Form>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};
