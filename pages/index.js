import { gql } from "@apollo/client";
import client from "../data/apollo";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getRandomDarkColor } from "../data/utils";
import Dimension from "../components/Dimension";

export default function Home({ dimensions }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rick And Morty</title>
        <meta name="description" content="Memmo recruitment test" />
        <link rel="icon" href="/favicon.ico" />
        <script src="https://unpkg.com/rive-js@0.7.11/dist/rive.min.js"></script>
      </Head>

      <main className={styles.main}>
        {Object.keys(dimensions).map(
          (name) => <Dimension dimension={dimensions[name]} />
        )}
      </main>
    </div>
  )
}


export async function getStaticProps() {
  const dimensions = {};

  const { data } = await client.query({
    query: gql`
    query Locations {
      locations {
        results {
          name
          type
          dimension
          residents {
            name
            status
            species
            gender
            image
            origin {
              name
            }
          }
        }
      }
    }
    `,
  });

  const locations = data.locations.results;

  for (const location of locations) {
    if (!(location.dimension in dimensions)) {
      dimensions[location.dimension] = {
        color: getRandomDarkColor(),
        name: location.dimension,
        locations: []
      };
    }

    // Make location an extensible object
    const extensibleLocations = JSON.parse(JSON.stringify(location));
    dimensions[location.dimension].locations.push(extensibleLocations);
  }

  statistics(dimensions)

  return {
    props: {
      dimensions,
    },
  };
}


function statistics(dimensions) {
  for (let dimension of Object.values(dimensions)) {
    for (let location of dimension.locations) {
      for (let resident of location.residents) {
        if (!(resident.status in location)) location[resident.status] = 0;
        location[resident.status]++;

        if (!(resident.species in location)) location[resident.species] = 0;
        location[resident.species]++;

        if (resident.origin.location != location.name) {
          if (!('guests' in location)) location.guests = 0;
          location.guests++;
        }
      }
    }
  }
}