import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavouriteListings from "../actions/getFavouriteListings";
import FavouritesClient from "./FavouritesClient";

async function FavouritesPage() {
  const favourites = await getFavouriteListings();
  const currentUser = await getCurrentUser();
  if (favourites.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favourites found"
          subtitle="Looks like you have no favourite listings"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
        <FavouritesClient
        favourites={favourites}
        currentUser={currentUser}
        />
    </ClientOnly>
  );
}

export default FavouritesPage;
