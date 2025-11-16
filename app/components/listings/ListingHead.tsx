"use client";

import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";
import Heading from "../ui/Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  imageSrc: string;
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

function ListingHead({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser,
}: ListingHeadProps) {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  
  return (
    <>
      <Heading
        title={title}
        subTitle={`${location?.region}, ${location?.label}`}
      />
      <div className="
        w-full
        h-[40vh]
        md:h-[60vh]
        overflow-hidden 
        rounded-xl
        relative
      ">
        <Image
          src={imageSrc}
          fill
          className="object-cover w-full"
          alt="Image"
        />
        <div className="absolute top-3 right-3 md:top-5 md:right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}

export default ListingHead;
