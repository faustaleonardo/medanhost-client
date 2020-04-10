import React, { useState } from 'react';
import { Grid, Card, Button, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Pagination from 'components/partials/Pagination';
import TypeOfPlaceModal from './modals/TypeOfPlaceModal';
import PriceModal from './modals/PriceModal';
import SearchDetailsModal from './modals/SearchDetailsModal';
import MapContainerModal from './modals/MapContainerModal';

export default () => {
  const [openTypeOfPlace, setOpenTypeOfPlace] = useState(false);
  const [openPrice, setOpenPrice] = useState(false);
  const [openSearchDetails, setOpenSearchDetails] = useState(false);
  const [openMapContainer, setOpenMapContainer] = useState(false);

  return (
    <div>
      <TypeOfPlaceModal open={openTypeOfPlace} setOpen={setOpenTypeOfPlace} />
      <PriceModal open={openPrice} setOpen={setOpenPrice} />
      <SearchDetailsModal
        open={openSearchDetails}
        setOpen={setOpenSearchDetails}
      />
      <MapContainerModal
        open={openMapContainer}
        setOpen={setOpenMapContainer}
      />

      <div>
        <h1>Stays in Sydney</h1>
        <p>300+ stays · Apr 10 - May 5 · 2 guests</p>
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

      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column>
            <Card>
              <Link to="/rooms/1">
                <Image src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large" />
              </Link>
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
                  <div>4 guests</div>
                  <h4 className="mt-05r">Rp 500.000 / night</h4>
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
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Link to="/rooms/1">
                <Image src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large" />
              </Link>
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
                  <div>4 guests</div>
                  <h4 className="mt-05r">Rp 500.000 / night</h4>
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
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card>
              <Link to="/rooms/1">
                <Image src="https://a0.muscache.com/im/pictures/a08c1952-7933-47c4-a5f4-82315824b471.jpg?aki_policy=large" />
              </Link>
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
                  <div>4 guests</div>
                  <h4 className="mt-05r">Rp 500.000 / night</h4>
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
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Pagination className="pagination" />
    </div>
  );
};
