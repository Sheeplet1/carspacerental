"use client";

import LoginSideBar from "@components/LoginSideBar";
import DisplayMyListings from "@components/DisplayMyListings";
import ListYourSpot from "@components/ListYourSpot";
import ParkingSpotDetails from "@components/ParkingSpotDetails";
import DescribeParkingSpot from "@components/DescribeParkingSpot";
import SetPrice from "@components/SetPrice";
import FeaturesAndDetails from "@components/FeaturesAndDetails";
import PreviewListingDetails from "@components/PreviewListingDetails";
import ConfirmListing from "@components/ConfirmListing";
import { useState } from "react";

const MyListings = () => {
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState({});
  const [selectedTypeOfSpot, setSelectedTypeOfSpot] = useState("");
  const [selectedMaxVehicleSize, setSelectedMaxVehicleSize] = useState("");
  const [selectedAccessType, setSelectedAccessType] = useState("");
  const [selectedElectricCharging, setSelectedElectricCharging] = useState("");
  const [describeParkingSpace, setDescribeParkingSpace] = useState("");
  const [driverInstructions, setDriverInstructions] = useState("");
  const [hourlyPrice, setHourlyPrice] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [isAvailble24Hours, setIsAvailble24Hours] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [availableDays, setAvailableDays] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: true,
    Thursday: true,
    Friday: true,
    Saturday: true,
    Sunday: true,
  });
  const [photos, setPhotos] = useState([]);
  const [safetyFeatures, setSafetyFeatures] = useState([]);
  const [amenities, setAmenities] = useState([]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <DisplayMyListings nextStep={() => setStep(1)} />;
      case 1:
        return (
          <ListYourSpot
            prevStep={() => setStep(0)}
            nextStep={() => setStep(2)}
            address={address}
            setAddress={setAddress}
          />
        );
      case 2:
        return (
          <ParkingSpotDetails
            prevStep={() => setStep(1)}
            nextStep={() => setStep(3)}
            selectedTypeOfSpot={selectedTypeOfSpot}
            setSelectedTypeOfSpot={setSelectedTypeOfSpot}
            selectedMaxVehicleSize={selectedMaxVehicleSize}
            setSelectedMaxVehicleSize={setSelectedMaxVehicleSize}
            selectedAccessType={selectedAccessType}
            setSelectedAccessType={setSelectedAccessType}
            selectedElectricCharging={selectedElectricCharging}
            setSelectedElectricCharging={setSelectedElectricCharging}
          />
        );
      case 3:
        return (
          <DescribeParkingSpot
            prevStep={() => setStep(2)}
            nextStep={() => setStep(4)}
            describeParkingSpace={describeParkingSpace}
            setDescribeParkingSpace={setDescribeParkingSpace}
            driverInstructions={driverInstructions}
            setDriverInstructions={setDriverInstructions}
          />
        );
      case 4:
        return (
          <SetPrice
            prevStep={() => setStep(3)}
            nextStep={() => setStep(5)}
            hourlyPrice={hourlyPrice}
            setHourlyPrice={setHourlyPrice}
            monthlyPrice={monthlyPrice}
            setMonthlyPrice={setMonthlyPrice}
            isAvailble24Hours={isAvailble24Hours}
            setIsAvailble24Hours={setIsAvailble24Hours}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            availableDays={availableDays}
            setAvailableDays={setAvailableDays}
          />
        );
      case 5:
        return (
          <FeaturesAndDetails
            prevStep={() => setStep(4)}
            nextStep={() => setStep(6)}
            photos={photos}
            setPhotos={setPhotos}
            safetyFeatures={safetyFeatures}
            setSafetyFeatures={setSafetyFeatures}
            amenities={amenities}
            setAmenities={setAmenities}
          />
        );
      case 6:
        return (
          <PreviewListingDetails
            prevStep={() => setStep(5)}
            nextStep={() => setStep(7)}
            address={address}
            selectedTypeOfSpot={selectedTypeOfSpot}
            selectedMaxVehicleSize={selectedMaxVehicleSize}
            selectedAccessType={selectedAccessType}
            selectedElectricCharging={selectedElectricCharging}
            describeParkingSpace={describeParkingSpace}
            driverInstructions={driverInstructions}
            hourlyPrice={hourlyPrice}
            monthlyPrice={monthlyPrice}
            isAvailble24Hours={isAvailble24Hours}
            startTime={startTime}
            endTime={endTime}
            availableDays={availableDays}
            photos={photos}
            safetyFeatures={safetyFeatures}
            amenities={amenities}
          />
        );
      case 7:
        return <ConfirmListing nextStep={() => setStep(0)} />;
      default:
        return <DisplayMyListings nextStep={() => setStep(1)} />;
    }
  };

  return (
    <div className="flex flex-row w-full mt-12">
      <div className="rounded-lg p-5">
        <LoginSideBar />
      </div>
      <div>{renderStep()}</div>
    </div>
  );
};

export default MyListings;
