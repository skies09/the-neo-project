import React from "react";
import { useAdoptionCalculator } from "./useAdoptionCalculator";
import { AdoptionCalculatorView } from "./AdoptionCalculatorView";

export default function Adoption() {
	const model = useAdoptionCalculator();
	return <AdoptionCalculatorView {...model} />;
}
