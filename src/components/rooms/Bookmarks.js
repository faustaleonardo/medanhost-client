import React, { useState } from 'react';
import { Grid, Card, Icon, Button, Image } from 'semantic-ui-react';
import { Link, useHistory } from 'react-router-dom';
import MapContainerModal from './modals/MapContainerModal';
import WarningModal from 'components/partials/WarningModal';
import Pagination from 'components/partials/Pagination';

export default () => {
  const [openMapContainer, setOpenMapContainer] = useState(false);
  const [openWarningModal, setOpenWarningModal] = useState(false);
  const history = useHistory();

  return (
    <div>
      <MapContainerModal
        open={openMapContainer}
        setOpen={setOpenMapContainer}
      />

      <WarningModal
        open={openWarningModal}
        setOpen={setOpenWarningModal}
        title={'Remove From Bookmarks'}
      />

      <h1>Your Bookmarks</h1>

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Link to="/rooms/1">
                <Image src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large" />
              </Link>
              <div className="border-bottom"></div>
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
                            <Icon name="star" color="red" />
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
                  <div className="mb-05r">4 guests</div>
                  <div className="mb-05r">
                    Jalan Ustad Abdul Hamid No.32, Tanjungbalai
                  </div>
                  <Button
                    icon
                    labelPosition="left"
                    onClick={() => setOpenMapContainer(true)}
                  >
                    <Icon name="map marker alternate" />
                    Show Location
                  </Button>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => history.push('/rooms/1')}
                  >
                    Visit
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => setOpenWarningModal(true)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Link to="/rooms/1">
                <Image src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large" />
              </Link>
              <div className="border-bottom"></div>
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
                            <Icon name="star" color="red" />
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
                  <div className="mb-05r">4 guests</div>
                  <div className="mb-05r">
                    Jalan Ustad Abdul Hamid No.32, Tanjungbalai
                  </div>
                  <Button
                    icon
                    labelPosition="left"
                    onClick={() => setOpenMapContainer(true)}
                  >
                    <Icon name="map marker alternate" />
                    Show Location
                  </Button>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => history.push('/rooms/1')}
                  >
                    Visit
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => setOpenWarningModal(true)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Link to="/rooms/1">
                <Image src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large" />
              </Link>
              <div className="border-bottom"></div>
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
                            <Icon name="star" color="red" />
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
                  <div className="mb-05r">4 guests</div>
                  <div className="mb-05r">
                    Jalan Ustad Abdul Hamid No.32, Tanjungbalai
                  </div>
                  <Button
                    icon
                    labelPosition="left"
                    onClick={() => setOpenMapContainer(true)}
                  >
                    <Icon name="map marker alternate" />
                    Show Location
                  </Button>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    onClick={() => history.push('/rooms/1')}
                  >
                    Visit
                  </Button>
                  <Button
                    basic
                    color="red"
                    onClick={() => setOpenWarningModal(true)}
                  >
                    Remove
                  </Button>
                </div>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Pagination />
    </div>
  );
};
