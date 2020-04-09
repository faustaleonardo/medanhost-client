import React from 'react';
import { Grid, Card, Button, Icon } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';

import Pagination from 'components/partials/Pagination';

export default () => {
  return (
    <div>
      <div className="room-list-heading">
        <h1>Stays in Sydney</h1>
        <p>300+ stays · Apr 10 - May 5 · 2 guests</p>
      </div>

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Card className="center-block">
              <Carousel showIndicators={false} showArrows={false}>
                <Link to="rooms/1" className="d-block">
                  <img
                    src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large"
                    alt="house-1"
                  />
                </Link>
                <Link to="rooms/1" className="d-block">
                  <img
                    src="https://a0.muscache.com/im/pictures/cb43c75f-f3ed-4a80-afdf-51ed9d91f36d.jpg?aki_policy=large"
                    alt="house-2"
                  />
                </Link>
              </Carousel>
              <Card.Content>
                <Card.Header>
                  <div>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <span>CBD Ayola</span>
                        </Grid.Column>
                        <Grid.Column>
                          <div className="ratings-text">
                            <Icon name="star" className="red" />
                            <span>
                              4.7 <span className="gray">(30)</span>
                            </span>
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                </Card.Header>
                <Card.Meta>
                  <span>Shared Room</span>
                </Card.Meta>
                <Card.Description>
                  <div>4 guests · 3 beds · 1 bath</div>
                  <h4 className="mt-1r">Rp 500.000 / night</h4>
                  <Button positive className="text-center">
                    Book now
                  </Button>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card className="center-block">
              <Carousel showIndicators={false} showArrows={false}>
                <Link to="rooms/1" className="d-block">
                  <img
                    src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large"
                    alt="house-1"
                  />
                </Link>
                <Link to="rooms/1" className="d-block">
                  <img
                    src="https://a0.muscache.com/im/pictures/cb43c75f-f3ed-4a80-afdf-51ed9d91f36d.jpg?aki_policy=large"
                    alt="house-2"
                  />
                </Link>
              </Carousel>
              <Card.Content>
                <Card.Header>
                  <div>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <span>CBD Ayola</span>
                        </Grid.Column>
                        <Grid.Column>
                          <div className="ratings-text">
                            <Icon name="star" className="red" />
                            <span>
                              4.7 <span className="gray">(30)</span>
                            </span>
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                </Card.Header>
                <Card.Meta>
                  <span>Shared Room</span>
                </Card.Meta>
                <Card.Description>
                  <div>4 guests · 3 beds · 1 bath</div>
                  <h4 className="mt-1r">Rp 500.000 / night</h4>
                  <Button positive className="text-center">
                    Book now
                  </Button>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card className="center-block">
              <Carousel showIndicators={false} showArrows={false}>
                <Link to="rooms/1" className="d-block">
                  <img
                    src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large"
                    alt="house-1"
                  />
                </Link>
                <Link to="rooms/1" className="d-block">
                  <img
                    src="https://a0.muscache.com/im/pictures/cb43c75f-f3ed-4a80-afdf-51ed9d91f36d.jpg?aki_policy=large"
                    alt="house-2"
                  />
                </Link>
              </Carousel>
              <Card.Content>
                <Card.Header>
                  <div>
                    <Grid columns={2}>
                      <Grid.Row>
                        <Grid.Column>
                          <span>CBD Ayola</span>
                        </Grid.Column>
                        <Grid.Column>
                          <div className="ratings-text">
                            <Icon name="star" className="red" />
                            <span>
                              4.7 <span className="gray">(30)</span>
                            </span>
                          </div>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </div>
                </Card.Header>
                <Card.Meta>
                  <span>Shared Room</span>
                </Card.Meta>
                <Card.Description>
                  <div>4 guests · 3 beds · 1 bath</div>
                  <h4 className="mt-1r">Rp 500.000 / night</h4>
                  <Button positive className="text-center">
                    Book now
                  </Button>
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Pagination className="pagination" />
    </div>
  );
};
