"use client";

import { SafeListing, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/ui/Heading";
import ListingCard from "../components/listings/ListingCard";

interface FavouritesClientProps {
  favourites: SafeListing[];
  currentUser?: SafeUser | null;
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({
  favourites,
  currentUser,
}) => {
  return (
    <Container>
      <Heading
        title="Favourites"
        subTitle="List of places you have favourited"
      />
      {/* FIX: Added responsive grid */}
      <div className="
        mt-10
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        {favourites.map((favourite) => (
          <ListingCard
            key={favourite.id}
            data={favourite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavouritesClient;
