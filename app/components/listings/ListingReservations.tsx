"use client";

import React from "react";
import { Range } from "react-date-range";
import Calendar from "../input/Calendar";
import Button from "../ui/Button";

interface ListingReservationsProps {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservations: React.FC<ListingReservationsProps> = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="
      bg-white 
      rounded-xl 
      border-[1px]
      border-neutral-200 
      overflow-hidden
      w-full
    ">
      <div className="flex flex-row items-center gap-1 p-3 sm:p-4">
        <div className="text-xl sm:text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600 text-sm sm:text-base">night</div>
      </div>
      <hr />
      <div className="overflow-x-auto">
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value.selection)}
        />
      </div>
      <hr />
      <div className="p-3 sm:p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div className="
        p-3
        sm:p-4 
        flex 
        flex-row 
        items-center 
        justify-between
        font-semibold
        text-base
        sm:text-lg
      ">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservations;
