import React from "react";
import { Grid } from "semantic-ui-react";
import { PLASINIA_ADDRESS, PLASINIA_INFORMATION } from "../constants";

const PrintPage = () => {
  return (
    <>
      <div className='page'>
        <div className='subpage'>
          <Grid>
            <Grid.Row>
              <Grid.Column width={16}>{PLASINIA_INFORMATION}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column floated='left' width={5}>
                {PLASINIA_ADDRESS}
              </Grid.Column>
              <Grid.Column floated='right' width={5}>
                PLASINIA
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </>
  );
};

// PLASINIA d.o.o.
// Vratnička 6
// Zagreb, 10 040, Hrvatska
// OIB: 95470441689

export default PrintPage;
